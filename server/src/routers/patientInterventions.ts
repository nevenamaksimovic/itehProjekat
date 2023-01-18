import { Router } from "express";
import { LessThan, MoreThan, Raw } from "typeorm";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/Doctor";
import { Intervention } from "../entity/Intervention";
import { InterventionItem } from "../entity/InterventionItem";
import { Service } from "../entity/Service";
import { User } from "../entity/User";
import { fromIntervention } from "../interventionsUtil";
import { typeMiddleware } from "./middleware";


const router = Router();

router.use(typeMiddleware('patient'))

interface CreateInterventionDto {
  start: number,
  doctorId?: number,
  serviceIds: number[]
}

router.get('/', async (req, res) => {
  const id = (req as any).user.id;
  const interventions = await AppDataSource.getRepository(Intervention).find({
    where: {
      user: {
        id: id
      }
    },
    relations: {
      doctor: true,
      items: {
        service: true
      }
    }
  })
  res.json(interventions.map(fromIntervention));
})

router.post('/', async (req, res) => {
  const data = req.body as CreateInterventionDto
  const user = (req as any).user as User;
  try {
    const intervenion = await AppDataSource.transaction(async manager => {
      let doctor: Doctor | undefined = undefined;
      const date = new Date(data.start).toISOString().slice(0, -8);
      if (data.doctorId) {
        doctor = await manager.findOne(Doctor, { where: { id: data.doctorId } });
        let intervenions = await manager.find(Intervention, {
          where: {
            doctor: {
              id: doctor.id
            },
            start: LessThan(new Date(data.start)),
            end: Raw(alias => `${alias} IS NOT NULL AND ${alias} > :date`, { date }),
          }
        });
        if (intervenions.length > 0) {
          throw new Error('doctor is not available');
        }
      }
      const createdIntervention = await manager.save(Intervention, {
        start: new Date(data.start),
        status: 'pending',
        items: [],
        user,
        doctor,
        end: undefined,
        createdAt: undefined,
      });
      for (let serviceId of data.serviceIds) {
        let service = await manager.findOne(Service, { where: { id: serviceId } });
        if (service) {
          let item = await manager.save(InterventionItem, {
            service,
            intervention: createdIntervention,
            interventionId: createdIntervention.id,
            unitPrice: service.price,
            quantity: 1
          });
          createdIntervention.items.push(item);
        }
      }
      return createdIntervention;
    })

    res.json(fromIntervention(intervenion));
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

export default router;