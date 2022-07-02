import { Modal, Card, Button } from 'react-bootstrap'
import { useState } from 'react'


const Recipe = (props) => {
    const data = props.data
    const [show, setShow] = useState(false)

    return (
        <div className='col-md-4'>
            <Card
                bg='Light'
                key={data.id}
                text='dark' 
                style={{ width: '24rem' }}
                className="mb-2"
                >
                <Card.Header>{data.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Button variant='primary' onClick={() => setShow(true)}>Ingredients</Button>
                        
                    <Modal
                            show={show}
                            size="lg"
                            onHide={() => setShow(false)}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>
                                Ingredients FOR { data.title}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                
                                <ul>
                                    {data.description.split(',').map(item => <li>{item}</li>)}
                                </ul>
                            </Modal.Body>
                        </Modal>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Recipe;