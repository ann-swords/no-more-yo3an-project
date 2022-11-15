import React, {useEffect, useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


export default function Navbar(props) {
    let user = props.user
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
        console.log(formData);
    }

    
    const getUser = () => {
        axios.get(`http://localhost:4000/users/${user._id}`)
        .then(res => {
            setFormData(res.data);
            setShow(true);
        })
        .catch(err => console.log(err))
    }


    const handleClose = () => setShow(false);
    const handleShow = () => {
      getUser(user._id);
      setFormData(user);

      setShow(true);
    }

    const handleSubmit = (e) =>{
        props.onSubmitHandler(formData);
        handleClose();
    }
    

  return (
    <div>
        {props.isAuth ? (
        <div className='navbar'>
          <div className="navbar-container">
          <div>
             <Link to='/home'><img src="https://i.imgur.com/XO6tb1a.png" alt="No More Yo3an Logo" width="200" height="80"/></Link>
          </div>
          <div>
            <NavDropdown title={props.user ? "Welcome " + user.firstName : null}>
                <NavDropdown.Item onClick={handleShow}>My Profile</NavDropdown.Item>
                <NavDropdown.Item href='/user/donates'>My Donations</NavDropdown.Item>
                <NavDropdown.Item href="/home" onClick={props.onLogoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
          </div>
        </div>
    ):
    (<div className='navbar'>
        <div className="navbar-container">
            <div>
                <Link to='/home'><img src="https://i.imgur.com/XO6tb1a.png" alt="No More Yo3an Logo" width="200" height="80"/></Link>
            </div>
            <div>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </div>
        </div>
    </div>)}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="name@example.com"
                value={formData.email}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}