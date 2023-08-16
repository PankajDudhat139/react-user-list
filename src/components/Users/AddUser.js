import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uid } from 'uid';
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';


const AddUser = () => {
    const [avatarFile, setAvatarFile] = useState()
    const [modal, setModal] = useState(false);


    let navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched',
        defaultValues: {
            name: "",
            email: "",
            country: "",
            dob: "",
            id: uid(12)
        }
    });

    const FormSubmit = async (user) => {
        const reader = new FileReader();
        let userData = { ...user }
        reader.onloadend = async () => {
            userData = {
                ...user,
                avatar: reader.result
            }
            await axios.post("http://localhost:3001/data-users", userData);
        }
        if (avatarFile) {
            reader.readAsDataURL(avatarFile);
        }
        await axios.get("http://localhost:3001/data-users", user);
        setModal(true);

    }
    const toggle = () => {
        setModal(!modal);
        navigate("/");
    }

    const handleImageChange = (event) => {
        setAvatarFile(event.target.files[0]);
    };


    return (
        <>
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem><Link className='text-decoration-none' to="/">User List</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Add New User</BreadcrumbItem>
                </Breadcrumb>
                {modal && (
                    <Modal className='success-modal' isOpen={modal} toggle={toggle} centered>
                        <ModalHeader toggle={toggle}>Success</ModalHeader>
                        <ModalBody>
                            User added successfully
                        </ModalBody>
                    </Modal>
                )}
                <Row className="justify-content-center">
                    <Col md={8} className="mt-5 mb-5">
                        <Card>
                            <CardHeader className="bg-primary">
                                <CardTitle className="mb-0 text-white">Add New User</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form action="" onSubmit={handleSubmit(FormSubmit)}>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <input type="text" name="name" placeholder="Enter name"
                                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                    {...register("name", { required: 'This field is required' })}
                                                />
                                                {errors.name && (<div className="invalid-feedback">{errors.name.message}</div>)}
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <input type="email" name="email" placeholder="Enter email"
                                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                    {...register("email", {
                                                        required: 'This field is required',
                                                        pattern: {
                                                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                                            message: 'please enter valid email address'
                                                        }
                                                    })}
                                                />
                                                {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)}
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <input type="text" name="dob" placeholder="Enter DOB"
                                                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                                    {...register("dob", { required: 'This field is required' })}
                                                />
                                                {errors.dob && (<div className="invalid-feedback">{errors.dob.message}</div>)}
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <input type="text" name="country" placeholder="Enter Country"
                                                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                                    {...register("country", { required: 'This field is required' })}
                                                />
                                                {errors.country && (<div className="invalid-feedback">{errors.country.message}</div>)}
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <input type="file" accept="image/png, image/gif, image/jpeg" name="avatar" placeholder="Enter Avatar"
                                                    className={`form-control`}
                                                    onChange={handleImageChange}
                                                />
                                                {errors.avatar && (<div className="invalid-feedback">{errors.avatar.message}</div>)}
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <Button color='primary'>Add New User</Button>
                                        </Col>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AddUser;