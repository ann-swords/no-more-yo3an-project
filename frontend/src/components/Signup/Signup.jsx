import React, {useState} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Signup.css'

 export default function Signup(props) {

  const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
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

        <form onSubmit={regsiterHandler}>

        <input type="text" name="firstName" onChange={changeHandler} placeholder="FirstName"/>
        
        <br /><br />

        <input type="text" name="lastName" onChange={changeHandler} placeholder="LastName"/>
      
        <br /><br />

        <input type="text" name="mobile" onChange={changeHandler} placeholder="Mobile Number"/>

        <br /><br />

        <input type="email" name="email" onChange={changeHandler} placeholder="Email"/>

        <br /><br />

        <input type="password" name="password" autoComplete='' onChange={changeHandler} placeholder="password"/>

        <br /><br />

        <div className="custom-control custom-radio custom-control-inline">
          <p>Please select from below if you are a Food Donator or Food Reciever ..</p>
          <input type="radio" name="role" value={'Donator'} className="custom-control-input" onChange={changeHandler} required />
          <label className="custom-control-label" style={{ "marginRight": "10px" }}>Food Donator</label>

          <input type="radio" name="role" value={'Reciever'} className="custom-control-input" onChange={changeHandler} />
          <label className="custom-control-label">Food Reciever</label>
        </div>

        <br />

        <Button onClick={regsiterHandler}>Signup </Button>

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


