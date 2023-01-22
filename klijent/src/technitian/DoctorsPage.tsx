import { useEffect, useState } from 'react';
import { Button } from 'rsuite';
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from '../service/doctorService';
import { getAllOrdinations } from '../service/ordinationService';
import { Doctor, Ordination } from '../types';
import DoctorForm from './DoctorForm';
import DoctorsTable from './DoctorsTable';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [ordinations, setOrdinations] = useState<Ordination[]>([])
  const [openForm, setOpenForm] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(0);
  useEffect(() => {
    getDoctors().then(setDoctors)
    getAllOrdinations().then(setOrdinations)
  }, [])

  return (
    <div className='container'>
      <DoctorForm
        doctor={doctors.find(d => d.id === selectedDoctorId)}
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedDoctorId(0);
        }}
        onSubmit={async (data) => {
          if (selectedDoctorId) {
            const doctor = await updateDoctor(selectedDoctorId, data);
            setDoctors(prev => {
              return prev.map(element => {
                if (element.id === selectedDoctorId) {
                  return doctor;
                }
                return element;
              })
            })
            return;
          }
          const doctor = await createDoctor(data);
          setDoctors(prev => {
            return [
              ...prev,
              doctor
            ]
          })
        }}
        ordinations={ordinations}
      />
      <div className='header'>
        Doctors page
      </div>
      <div>
        <Button
          appearance='primary'
          onClick={() => { setOpenForm(true) }}
        >Create doctor</Button>
      </div>
      <DoctorsTable
        doctors={doctors}
        onChange={doctor => {
          setSelectedDoctorId(doctor.id);
          setOpenForm(true);
        }}
        onDelete={async doctor => {
          await deleteDoctor(doctor.id);
          setDoctors(prev => {
            return prev.filter(d => d !== doctor);
          })
        }}
      />
    </div>
  )
}
