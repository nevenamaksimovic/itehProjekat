import React, { useEffect, useState } from 'react'
import { Button, Form, InputPicker, Modal, Schema } from 'rsuite'
import { Doctor, Ordination } from '../types'


const model = Schema.Model({
  firstName: Schema.Types.StringType().isRequired().containsLetterOnly(),
  lastName: Schema.Types.StringType().isRequired().containsLetterOnly(),
  phone: Schema.Types.StringType().isRequired(),
  ordinationId: Schema.Types.NumberType().isRequired(),
})

const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  ordinationId: null as number | null,
}

interface Props {
  open: boolean,
  onClose: () => void,
  onSubmit: (data: any) => Promise<void>,
  ordinations: Ordination[],
  doctor?: Doctor
}
export default function DoctorForm(props: Props) {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (!props.open) {
      return;
    }
    if (props.doctor) {
      setFormState({
        firstName: props.doctor.firstName,
        lastName: props.doctor.lastName,
        phone: props.doctor.phone,
        ordinationId: props.doctor.ordination.id
      })
    } else {
      setFormState(initialState);
    }
  }, [props.doctor, props.open])

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title className='header'>{props.doctor ? 'Update' : 'Create'} doctor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          fluid
          formValue={formState}
          onChange={(val: any) => {
            setFormState(val);
          }}
          onSubmit={async (valid) => {
            if (!valid) {
              return;
            }
            await props.onSubmit(formState);
            setFormState(initialState);
            props.onClose();
          }}
          model={model}
        >
          <Form.Group>
            <Form.ControlLabel>First name</Form.ControlLabel>
            <Form.Control name='firstName' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Last name</Form.ControlLabel>
            <Form.Control name='lastName' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Phone</Form.ControlLabel>
            <Form.Control name='phone' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Ordination</Form.ControlLabel>
            <Form.Control
              name='ordinationId'
              accepter={InputPicker}
              data={props.ordinations.map(element => {
                return {
                  value: element.id,
                  label: element.address
                }
              })}
            />
          </Form.Group>
          <Button appearance='primary' type='submit'>{props.doctor ? 'Update' : 'Create'} doctor</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
