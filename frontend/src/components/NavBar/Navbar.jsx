import React, {useEffect, useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
// import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Navbar(props) {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

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

    
    const getUser = () =>{
        axios.get(`http://localhost:4000/users/${props.user.user.id}`)
        .then(res => {
            setUser(res.data);
            setFormData(res.data);
            setShow(true);
        })
        .catch(err => console.log(err))
    }

   

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        // e.preventDefault();
        getUser();
    }

    const handleSubmit = (e) =>{
        axios.post(`http://localhost:4000/users/${props.user.user.id}`, formData)
        .then(res => {
            setUser(res.data);
            // props.user.user.name = formData.firstName
            handleClose();
        })
    }
    

  return (
    <div>
        {props.isAuth ? (
        <div className='navbar'>
          <div className="navbar-container">
          <div>
             <Link to='/home'>Home</Link>
          </div>
          <div>
            <NavDropdown title={props.user ? "Welcome " + props.user.user.name : null}>
                    <NavDropdown.Item onClick={handleShow}>My Profile</NavDropdown.Item>
                    <NavDropdown.Item href='/user/donates'>My Donations</NavDropdown.Item>
                    <NavDropdown.Item href="/logout" onClick={props.onLogoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
          </div>
        </div>
    ):
    (<div className='navbar'>
        <div className="navbar-container">
            <div>
                <Link to='/home'>Home</Link>
            </div>
            <div>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
                <li>
                    <Link to="/signin">Signin</Link>
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
                value={formData.las}
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