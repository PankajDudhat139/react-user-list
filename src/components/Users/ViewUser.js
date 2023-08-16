import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, Col, Container, Row } from 'reactstrap';

const ViewUser = () => {
    const [user, SetUser] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadusers();
    }, []);

    const loadusers = async () => {
        const result = await axios.get(`http://localhost:3001/data-users/${id}`);
        SetUser(result.data);
    }

    // const gobackhandle = () => {
    //     navigate("/");
    // }

    return (
        <>
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem><Link className='text-decoration-none' to="/">User List</Link></BreadcrumbItem>
                    <BreadcrumbItem active>User Detail</BreadcrumbItem>
                </Breadcrumb>
                <Row className="justify-content-center">
                    <Col md={6} className='mt-5 mb-5'>
                        <Card>
                            <CardBody className='p-4'>
                                
                                <div className="table-responsive">
                                    <table className="table table-text-small mb-0 table-bordered">
                                        <tbody>
                                            <tr>
                                                <td colSpan={2} className='avatar-img'><img src={user.avatar} alt='avatar' /></td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-primary">Name</th>
                                                <td>{user.name}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-primary">Email</th>
                                                <td>{user.email}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-primary">DOB</th>
                                                <td>{user.dob}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-primary">Country</th>
                                                <td>{user.country}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    {/* <Button color='primary' className="mb-3 mt-2" onClick={gobackhandle}>Go Back</Button> */}
                                    <div></div>
                                    <Link className="btn btn-warning mt-3" to={`/editUser/${id}`} title="Edit User">Edit</Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ViewUser;
