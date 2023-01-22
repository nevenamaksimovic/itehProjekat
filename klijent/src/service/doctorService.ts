import axios from "axios";
import { Doctor } from "../types";


export async function getDoctors() {
  const res = await axios.get('/doctor');
  return res.data as Doctor[];
}

export async function createDoctor(data: any) {
  const res = await axios.post('/doctor', data);
  return res.data as Doctor;
}

export async function updateDoctor(id: number, data: any) {
  const res = await axios.patch('/doctor/' + id, data);
  return res.data as Doctor;
}

export async function deleteDoctor(id: number) {
  await axios.delete('/doctor/' + id);
}