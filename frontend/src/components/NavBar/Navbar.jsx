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
      userRole();
    }

    const handleSubmit = (e) =>{
        props.onSubmitHandler(formData);
        handleClose();
    }

    const userRole = () => {
      if(props.user){
      let role = props.user.role ;
      return role;
    }
  }

  return (
    <div>
        {props.isAuth ? (
        <div className='navbar'>
          <div className="navbar-container">
          <div>

             <Link className="navbar-href" to='/'><img src="https://i.imgur.com/HUEuXKf.png" alt="No More Yo3an Logo" width="155" height="45"/></Link>
             <Link className="navbar-href" to='/about'>About</Link>
             <Link className="navbar-href" to='/food'>Find Food</Link>
             {userRole() == 'Donator' ? <Link className="navbar-href" to='/donate'>Donate</Link> : null}
             
          </div>
          <div>
            <NavDropdown title={props.user ? "Welcome " + localStorage.getItem("userName") : null}>
                <NavDropdown.Item onClick={handleShow}>My Profile</NavDropdown.Item>
                {userRole() == 'Donator' ? <NavDropdown.Item href='/user/donates'>My Donations</NavDropdown.Item> : null}
                <NavDropdown.Item href='/' onClick={props.onLogoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
          </div>
        </div>
    ):
    (<div className='navbar'>
        <div className="navbar-container">
            <div>

                <Link className="navbar-href" to='/'><img src="https://i.imgur.com/HUEuXKf.png" alt="No More Yo3an Logo" width="155" height="45"/></Link>
                <Link className="navbar-href" to='/about'>About</Link>
                <Link className="navbar-href" to='/food'>Find Food</Link>
                <Link className="navbar-href" to='/donate'>Donate</Link>

                {/* <img src="https://i.imgur.com/7JjrDzk.png" alt="No More Yo3an Logo" width="250" height="90"/> */}
            </div>
            <div>
                <li>
                    <Link className="navbar-href" to="/signup">Signup</Link>
                </li>
                <li>
                    <Link className="navbar-href" to="/login">Login</Link>
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