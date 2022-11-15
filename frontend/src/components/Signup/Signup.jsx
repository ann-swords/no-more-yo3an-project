import React, {useState} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Signup.css'

 export default function Signup(props) {

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
        props.register(newUser)
        
    }

  return (

    <div>

      <Container>
      <Row >
        <Col className='left-row' >ADD IMAGE HERE</Col>
        <Col className='right-row' xs={8 }>
      <h1>Signup</h1>

      <form id='signUpForm' onSubmit={regsiterHandler}>

        <label>FirstName:</label>
        <input  type="text" name="firstName" onChange={changeHandler} required />

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

        <div className="custom-control custom-radio custom-control-inline">
          <p>Please select from below if you are a Food Donator or Food Reciever ..</p>
          <input type="radio" name="role" value={'Donator'} className="custom-control-input" onChange={changeHandler} required />
          <label className="custom-control-label" style={{ "marginRight": "10px" }}>Food Donator</label>

          <input type="radio" name="role" value={'Reciever'} className="custom-control-input" onChange={changeHandler} required/>
          <label className="custom-control-label">Food Reciever</label>
        </div>

        <br />

        <button id="signUpBtn" type='submit'>Signup</button>

        <p> <br />
          Aleady have an account?<br />
          <a className="btn btn-link" href="/login">Login here</a>
        </p>

      </form>

        </Col>
      </Row>
    </Container>

      
      
    </div>
  );
}


