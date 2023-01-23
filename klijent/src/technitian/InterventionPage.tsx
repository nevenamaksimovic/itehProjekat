import React, { useEffect, useState } from 'react'
import { getTechnitianInterventions } from '../service/interventionService';
import { Doctor, InterventionResult } from '../types'
import { DatePicker, FlexboxGrid, InputPicker, Pagination } from 'rsuite'
import InterventionTable from './InterventionTable';
import * as dateFns from 'date-fns'
import { getDoctors } from '../service/doctorService';
export default function InterventionPage() {
  const [interventionResult, setInterventionResult] = useState<InterventionResult>({ interventions: [], totalElements: 0 });
  const [size, setSize] = useState(20);
  const [page, setPage] = useState(0);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctorId, setSelectedDoctorId] = useState(0);
  useEffect(() => {
    getTechnitianInterventions({
      page,
      size,
      doctorId: selectedDoctorId || undefined,
      from: from ? dateFns.startOfDay(from).getTime() : undefined,
      to: to ? dateFns.endOfDay(to).getTime() : undefined
    }).then(setInterventionResult)
  }, [page, size, from, to, selectedDoctorId])


  useEffect(() => {
    getDoctors().then(setDoctors)
  }, [])

  return (
    <div className='container'>
      <div className='header'>
        Interventions
      </div>
      <div className='padding'>
        <FlexboxGrid >
          <FlexboxGrid.Item colspan={5}>
            <div >
              From
            </div>
            <DatePicker
              oneTap
              value={from}
              onChange={setFrom}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <div >
              To
            </div>
            <DatePicker
              oneTap
              value={to}
              onChange={setTo}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <div >
              Doctor
            </div>
            <InputPicker
              value={selectedDoctorId}
              placeholder='All'
              onChange={setSelectedDoctorId}
              data={doctors.map(element => {
                return {
                  value: element.id,
                  label: element.firstName + ' ' + element.lastName
                }
              })}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
      <div className='padding'>
        <InterventionTable interventions={interventionResult.interventions} />
        <Pagination
          className='padding'
          total={interventionResult.totalElements}
          layout={['total', '-', 'limit', '|', 'pager']}
          prev
          last
          first
          next
          limitOptions={[10, 20, 50]}
          limit={size}
          onChangeLimit={(val) => {
            setSize(val)
          }}
          activePage={page + 1}
          onChangePage={val => {
            setPage(val - 1)
          }}
        />
      </div>

    </div>
  )
}
