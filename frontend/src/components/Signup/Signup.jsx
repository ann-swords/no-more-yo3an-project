import React, {useState} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import {useNavigate} from 'react-router-dom';

import './Signup.css'

 export default function Signup(props) {
  const navigate = useNavigate();

  window.addEventListener('load', () => {
    document.getElementById('signUpBtn').disabled = true;
  });

  const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        setNewUser(user);

        if(user.firstName === 0 || user.firstName === undefined ||
            user.lastName === 0 || user.lastName === undefined  ||
            user.mobile ===   0 || user.mobile === undefined    ||
            user.email ===    0 || user.email === undefined     ||
            user.password === 0 || user.password === undefined  ||
            user.role ===     0 || user.role === undefined)
        document.getElementById('signUpBtn').disabled = true
        else{
        document.getElementById('signUpBtn').disabled = false
    }
        
    }

  const regsiterHandler = (e) => {
        e.preventDefault();
        navigate('/login')
        props.register(newUser)
        
    }

  return (

    <div>

      <Container>

      <Row >
        <Col className='left-row' ></Col>

        <Col className='right-row' xs={8 }>
          
        <h1 className='signup'>Signup</h1>
        <br/>

    <Form  id='signUpForm' onSubmit={regsiterHandler}>

      <Form.Group className="mb-3" >
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="firstName" onChange={changeHandler} placeholder="Enter first name" required/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="lastName" onChange={changeHandler} placeholder="Enter last name" required/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" name="mobile" onChange={changeHandler} placeholder="Enter phone number" required/>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" onChange={changeHandler}  placeholder="Enter email" required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" autoComplete='' onChange={changeHandler}  placeholder="Password" required/>
      </Form.Group>


      
      <div className="custom-control custom-radio custom-control-inline">
          <p>Please select from below if you are a Food Donator or Food Reciever ..</p>
          <input type="radio" name="role" value={'Donator'} className="custom-control-input" onChange={changeHandler} required />
          <label className="custom-control-label" style={{ "marginRight": "10px" }}>Food Donator</label>

          <input type="radio" name="role" value={'Reciever'} className="custom-control-input" onChange={changeHandler} required/>
          <label className="custom-control-label">Food Reciever</label>
        </div>

        <br />

        
        <Button id="signUpBtn" type='submit'>Signup</Button>

        <p> <br />
          Aleady have an account?<br />
          <a className="btn btn-link" href="/login">Login here</a>
        </p>
    </Form>



      {/* <form id='signUpForm' onSubmit={regsiterHandler}>

        <input  type="text" name="firstName" onChange={changeHandler} required  placeholder='FirstName:'/>

        <br /> <br />

        <label>LastName:</label>
        <input  type="text" name="lastName" onChange={changeHandler} required/>

        <br /><br />

        <label>Mobile Number:</label>
        <input  type="text" name="mobile" onChange={changeHandler} required/>

        <br /><br />

        <label>Email:</label>
        <input  type="email" name="email" onChange={changeHandler} required/>

        <br /><br />

        <label>Password:</label>
        <input  type="password" name="password" autoComplete='' onChange={changeHandler} required />

        <br /><br />
        <button id="signUpBtn" type='submit'>Signup</button>


      </form> */}

        </Col>
      </Row>
    </Container>

      
      
    </div>
  );
}


