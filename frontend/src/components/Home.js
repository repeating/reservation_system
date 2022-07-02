import {useAuth} from '../Auth'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import Recipe from './Recipe'



const UserHome = () => {
    
    const [data, setData] = useState([])

    useEffect(()=>{
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

        const options = {
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`,
            }
        }
        
        fetch('http://backend:5000/restaurant/recipes', options)
        .then(response => response.json())
        .then(response => {setData(response); console.log(response)})
        .catch(err => console.error(err));

    },[]);



    return (
        <div className="home container">
            <Container >
                
                    {
                        data &&
                        <Row>
                            {data.map(item => <Recipe data={item} key={"m" +item.id}></Recipe>)}
                        </Row>
                    }
                
        </Container>
        </div>
    )
}


const GuestHome = () => {
    
    return (
        <>
            <div className="home container">
                <h1 className="heading">Welcome to Besto Restaurant</h1>
                <Link to='/signup' className="btn btn-primary btn-lg">Get Started</Link>
            </div>
    
        </>
    )
}


const HomePage = () => {

    const [logged] = useAuth();

    return (
        <>
        {(logged) ?
            <UserHome />:<GuestHome />
        }
        </>
    )
}

export default HomePage;