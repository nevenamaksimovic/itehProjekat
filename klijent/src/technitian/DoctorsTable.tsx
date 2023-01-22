import React from 'react'
import { Button, ButtonGroup, Table } from 'rsuite'
import { Doctor } from '../types'

interface Props {
  doctors: Doctor[],
  onChange: (doctor: Doctor) => void,
  onDelete: (doctor: Doctor) => void,
}

export default function DoctorsTable(props: Props) {
  return (
    <Table
      autoHeight
      data={props.doctors}
      rowHeight={60}
    >
      <Table.Column flexGrow={1} >
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey='id' />
      </Table.Column>
      <Table.Column flexGrow={3} >
        <Table.HeaderCell>First name</Table.HeaderCell>
        <Table.Cell dataKey='firstName' />
      </Table.Column>
      <Table.Column flexGrow={3} >
        <Table.HeaderCell>Last name</Table.HeaderCell>
        <Table.Cell dataKey='lastName' />
      </Table.Column>
      <Table.Column flexGrow={2} >
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.Cell dataKey='phone' />
      </Table.Column>
      <Table.Column flexGrow={4} >
        <Table.HeaderCell>Ordination</Table.HeaderCell>
        <Table.Cell dataKey='ordination.address' />
      </Table.Column>
      <Table.Column flexGrow={3} >
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.Cell>
          {
            (doctor: any) => {
              return (
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      props.onChange(doctor);
                    }}
                    appearance='primary' color='cyan'>Change</Button>
                  <Button
                    onClick={() => {
                      props.onDelete(doctor);
                    }}
                    appearance='primary' color='red'>Delete</Button>
                </ButtonGroup>
              )
            }
          }
        </Table.Cell>
      </Table.Column>
    </Table>
  )
}
