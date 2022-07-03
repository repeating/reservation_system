import { useAuth } from "../Auth";
import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import CreateReservationModal from "./CreateReservation";
import CancelReservationModal from "./CancelReservation";



const Reservations  = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [cancelShow, setCancelShow] = useState(false);
    const [data, setData] = useState([]);
    const [logged] = useAuth();

    const closeCreateModal = () => setShowCreate(false) 

    
            
    const useLoadData =  useEffect(()=>{
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

        const options = {
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`,
            }
        }
        
        fetch('http://localhost:5000/restaurant/reservations', options)
        .then(response => response.json())
        .then(response => {setData(response); console.log(response)})
        .catch(err => console.error(err));

    }, [])

    
    if(logged)
        return (
            <div className="container">
            <Button variant="primary" style={{ "marginBottom":"20px" }}
            onClick={()=> setShowCreate(true)}
            >Create New Reservation</Button>
            <CreateReservationModal show={showCreate} onClose={closeCreateModal} onUpdate={useLoadData}></CreateReservationModal>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Table No.</th>
                        <th>Number of People</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                        {
                        data &&
                            data.map(item =>     
                                <tr key={item.time}>
                                <td>{item.id}</td>
                                <td>{item.table_num}</td>
                                <td>{item.num_of_people}</td>
                                <td>{item.time}</td>
                                <td>                
                                    <Button variant="danger" onClick={() => setCancelShow(true)}>Cancel Reservation</Button>
                                    <CancelReservationModal show={cancelShow} id={item.id} onClose={() => setCancelShow(false)}></CancelReservationModal>
                                </td>
                            </tr>
                            )           
                        }
                    </tbody>
                </Table>    
                    
            </div>
        )
    
    return (
        <>
        
        </>
    )
    
    
}


export default Reservations;