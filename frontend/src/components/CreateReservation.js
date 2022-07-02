import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'



const CreateReservationModal = (props) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const createReservation = (data) =>{
        console.log(data)
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        

        const t = data.time.split('T')
        data.time = t[0] + ' ' + t[1];

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)

        }

        fetch('http://backend:5000/restaurant/reservations', requestOptions)
            .then(res => res.json())
            .then(data => {
                reset()
                window.location.reload();
            })
            .catch(err => console.log(err))

    }

    return (
        <Modal
            show={props.show}
            onHide={props.onClose}
        >

            <Modal.Header closeButton>
                <Modal.Title>
                    Create Reservation Form
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <Form.Group>
                        <Form.Label>Number of People</Form.Label>
                        <Form.Control type="number" 
                            {...register('num_of_people', { required: true, min: 1 })}
                        />
                    </Form.Group>
                    {errors.num_of_people && <p style={{ color: 'red' }}><small>Field is required</small></p>}
                    {errors.num_of_people?.type === "min" && <p style={{ color: 'red' }}>
                        <small>This should at least one</small>
                    </p>}
                    <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="datetime-local" rows={5} 
                            {...register('time', { required: true, min: new Date().toISOString().split('T')[0] })}
                        />
                    </Form.Group>
                    {errors.time && <p style={{ color: 'red' }}><small>Time is required</small></p>}
                    {errors.time?.type === "min" && <p style={{ color: 'red' }}>
                        <small>Time has to be in the future</small>
                    </p>}
                    <br></br>
                    <Form.Group>
                        <Button variant="primary" onClick={handleSubmit(createReservation)}>
                            Save
                        </Button>
                    </Form.Group>
                </form>
            </Modal.Body>
        </Modal >
    )
}

export default CreateReservationModal;
