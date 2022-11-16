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

    <div class="form-floating mb-3">
      <input type="text" name="firstName" onChange={changeHandler} class="form-control" id="floatingInput" placeholder="First Name" required/>
      <label for="floatingInput">First Name</label>
    </div>

    <div class="form-floating mb-3">
      <input type="text" name="lastName" onChange={changeHandler} class="form-control" id="floatingInput"  placeholder="Last Name" required/>
      <label for="floatingInput">Last Name</label>
    </div>
      
    <div class="form-floating mb-3">
      <input type="text" name="mobile" onChange={changeHandler} class="form-control" id="floatingInput"  placeholder="Phone Number" required/>
      <label for="floatingInput">Phone Number</label>
    </div>
      
    <div class="form-floating mb-3">
      <input  type="email" name="email" onChange={changeHandler} class="form-control" id="floatingInput"  placeholder="Email Address" required/>
      <label for="floatingInput">Email Address</label>
      <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
    </div>

    <div class="form-floating mb-3">
      <input type="password" name="password" autoComplete='' onChange={changeHandler} class="form-control" id="floatingPassword"  placeholder="Password" required/>
      <label for="floatingPassword">Password</label>
    </div>

      
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


