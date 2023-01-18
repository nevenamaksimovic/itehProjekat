import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/Doctor";
import { Ordination } from "../entity/Ordination";
import { typeMiddleware } from "./middleware";


const router = Router();

router.get('/', async (req, res) => {
  res.json(await AppDataSource.getRepository(Doctor).find({
    relations: {
      ordination: true
    }
  }));
})

router.post('/', typeMiddleware('technitian'), async (req, res) => {
  const ordinationId = req.body.ordinationId;
  const ordination = await AppDataSource.getRepository(Ordination).findOne({
    where: { id: ordinationId }
  });
  if (!ordination) {
    res.status(400).json({ error: 'Bad request' });
    return;
  }
  const doctor = await AppDataSource.getRepository(Doctor).save({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    ordination: ordination
  })
  res.json(doctor);
})

router.patch('/:id', typeMiddleware('technitian'), async (req, res) => {
  const id = Number(req.params.id);
  let doctor = await AppDataSource.getRepository(Doctor).findOne({
    where: {
      id
    }
  })
  if (!doctor) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  if (req.body.ordinationId) {
    const ordination = await AppDataSource.getRepository(Ordination).findOne({
      where: { id: req.body.ordinationId }
    });
    if (!ordination) {
      res.status(400).json({ error: 'Bad request' });
      return;
    }
    doctor.ordination = ordination;
  }
  if (req.body.firstName) {
    doctor.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    doctor.lastName = req.body.lastName;
  }
  if (req.body.phone) {
    doctor.phone = req.body.phone;
  }
  doctor = await AppDataSource.getRepository(Doctor).save(doctor);
  res.json(doctor);
})

router.delete('/:id', typeMiddleware('technitian'), async (req, res) => {
  const id = Number(req.params.id);
  let doctor = await AppDataSource.getRepository(Doctor).findOne({
    where: {
      id
    }
  })
  if (!doctor) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  await AppDataSource.getRepository(Doctor).delete({
    id: id
  });

  res.sendStatus(204);
})

export default router;