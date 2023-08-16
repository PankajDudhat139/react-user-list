
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

const Header = () => {
    return (
        <Container fluid className='p-0'>
            <Row className="justify-content-center">
                <Col md={12} className="p-0 mb-5">
                    <Card>
                        <CardBody className="p-0">
                            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom pt-3 pb-3">
                                <div className="container-fluid">
                                    <Link to='/' className="navbar-brand text-primary mr-0"><b>All Users</b></Link>
                                    <div className="form-inline ml-auto">
                                        <Link to="/addnewuser" className="btn btn-primary my-2 my-sm-0">Add New User</Link>
                                    </div>
                                </div>
                            </nav>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Header;