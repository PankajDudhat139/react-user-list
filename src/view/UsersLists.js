import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import UserDefault from '../assets/images/User.png'

const UsersLists = () => {

    // ------Load User's Data
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadDataUsers();
    }, [])

    const loadDataUsers = async () => {
        const result = await axios.get("http://localhost:3001/data-users");
        setUsers(result.data);
    }

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            await axios.delete(`http://localhost:3001/data-users/${id}`);
            loadDataUsers();
        } else {
            // alert('No');
        }
    }


    return (
        <>
        <Container>
            <Row>
                {
                    users.length > 0 ?
                        users.map((data, index) => {
                            return (
                                <Col key={index} lg={3} sm={6}>
                                    <Card className='mb-4 user-card text-center' >
                                        <CardHeader><div className='user-img'>
                                                {data.avatar ? (
                                                    <img src={data.avatar} alt="Uploaded" />
                                                ) : (
                                                    <img
                                                        src={UserDefault}
                                                        alt="Default"
                                                    />
                                                )}
                                            </div></CardHeader>
                                        <CardBody>
                                            
                                            <CardTitle tag='h5'>
                                                <Link className='user-link' to={`/viewUser/${data.id}`}>{data.name}</Link>
                                            </CardTitle>
                                            <CardText className='user-email'>{data.dob}</CardText>
                                            <div className='user-btns'>
                                                <Link className="btn btn-warning btn-icon mt-0 me-2" to={`/editUser/${data.id}`} title="Edit User">Edit</Link>
                                                <Button color='danger' className="btn-icon mt-0 me-2" title="Delete User" onClick={() => deleteUser(data.id)}>Delete</Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        }) :

                        <Col lg={12}>
                            <div className='text-center'>
                                <img
                                    height={500}
                                    src='https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=2000'
                                    alt='no-data-img'
                                />
                            </div>
                        </Col>
                }
            </Row>
        </Container>
        </>
    )
}

export default UsersLists;