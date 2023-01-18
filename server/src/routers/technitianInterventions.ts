import { Router } from "express";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/Doctor";
import { Intervention } from "../entity/Intervention";
import { InterventionItem } from "../entity/InterventionItem";
import { Service } from "../entity/Service";
import { fromIntervention } from "../interventionsUtil";
import { typeMiddleware } from "./middleware";


const router = Router();
router.use(typeMiddleware('technitian'))


router.get('/', async (req, res) => {
  let page = Number(req.query.page);
  if (!page) {
    page = 0;
  }
  let size = Number(req.query.size);
  if (!size) {
    size = 20;
  }
  let doctorId: number | undefined = Number(req.query.doctorId);
  if (!doctorId) {
    doctorId = undefined;
  }
  let from = req.query.from ? new Date(Number(req.query.from)) : null;
  let to = req.query.to ? new Date(Number(req.query.to)) : null;
  let where: any = {};
  if (doctorId) {
    where.doctor = {
      id: doctorId
    }
  }
  if (from) {
    where.start = MoreThanOrEqual(from);
  }
  if (to) {
    where.start = LessThanOrEqual(to);
  }
  let [interventions, totalElements] = await AppDataSource.getRepository(Intervention).findAndCount({
    relations: {
      doctor: true,
      user: true,
    },
    where: where,
    take: size,
    skip: page * size
  });
  res.json({
    totalElements,
    interventions: interventions.map(fromIntervention)
  });
})


router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const intervention = await AppDataSource.getRepository(Intervention).findOne({
    where: {
      id
    },
    relations: {
      doctor: true,
      user: true,
      items: {
        service: true
      }
    }
  })
  if (!intervention) {
    res.sendStatus(404);
    return;
  }
  res.json(intervention);
})


export interface ChangeInterventinDto {
  start: number,
  end: number,
  doctorId: number,
  status: 'pending' | 'accepted' | 'rejected' | 'finished',
  items: ChangeItemDto[]
}

interface ChangeItemDto {
  type: 'UPDATE' | 'CREATE' | 'DELETE',
  id?: number,
  quantity?: number,
  serviceId?: number
}
router.patch('/:id', async (req, res) => {
  const body = req.body as Partial<ChangeInterventinDto>;
  const id = Number(req.params.id);
  let intervention = await AppDataSource.getRepository(Intervention).findOne({
    relations: {
      doctor: true,
      user: true
    },
    where: {
      id
    }
  })
  if (!intervention) {
    res.sendStatus(404);
    return;
  }
  if (body.doctorId && body.doctorId !== intervention.doctor.id) {
    const doctor = await AppDataSource.getRepository(Doctor).findOne({ where: { id: body.doctorId } });
    if (!doctor) {
      res.status(400).json({ error: 'doctor doesnt exist' });
      return;
    }
    intervention.doctor = doctor;
  }
  if (body.start) {
    intervention.start = new Date(body.start)
  }
  if (body.end) {
    intervention.end = new Date(body.end)
  }
  if (body.status) {
    if (!canChangeStatus(intervention.status, body.status)) {
      res.status(400).json({ error: 'Invalid status chagne' });
      return;
    }
    intervention.status = body.status;
  }
  intervention = await AppDataSource.getRepository(Intervention).save(intervention);
  if (body.items) {
    for (let itemDto of body.items) {
      if (itemDto.type === 'DELETE') {
        await AppDataSource.getRepository(InterventionItem).delete({
          id: itemDto.id,
          interventionId: intervention.id
        });
        continue;
      }
      if (itemDto.type === 'CREATE') {
        const service = await AppDataSource.getRepository(Service).findOneOrFail({ where: { id: itemDto.serviceId } })
        await AppDataSource.getRepository(InterventionItem).insert({
          intervention,
          unitPrice: service.price,
          interventionId: intervention.id,
          quantity: itemDto.quantity,
          service: service
        })
      }
      if (itemDto.type === 'UPDATE') {
        await AppDataSource.getRepository(InterventionItem).update({
          id: itemDto.id,
          interventionId: intervention.id
        }, {
          quantity: itemDto.quantity
        })
      }
    }
  }
  const items = await AppDataSource.getRepository(InterventionItem).find({
    relations: {
      service: true
    },
    where: {
      interventionId: intervention.id
    }
  });
  intervention.items = items;
  res.json(fromIntervention(intervention));
})

function canChangeStatus(current: 'pending' | 'accepted' | 'rejected' | 'finished', newStatus: 'pending' | 'accepted' | 'rejected' | 'finished') {
  if (current === 'pending') {
    return true;
  }
  if (current === 'finished' || current === 'rejected') {
    return false;
  }
  return newStatus === 'finished'
}

export default router;