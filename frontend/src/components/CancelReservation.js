import { Button, Modal } from "react-bootstrap"




const CancelReservationModal = (props) => {


    const handleDelete = () =>{
        
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
        }

        fetch('http://backend:5000/restaurant/reservations/'+props.id, requestOptions)
            .then(res => res.json())
            .then(data => {
                
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
                    Cancel Reservation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure?</h4>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleDelete()}>Yes</Button>
                    <Button onClick={props.onClose}>No</Button>
            </Modal.Footer>
        </Modal>
    )


}


export default CancelReservationModal;