import React, {useState} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import './Signup.css'

 export default function Signup(props) {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [newUser, setNewUser] = useState({});
  const regsiterHandler = (e) => {
    e.preventDefault();
    navigate('/login');
    props.register(newUser) 
  }

    const changeHandler = (e) => {
      const user = { ...newUser };
      user[e.target.name] = e.target.value;
      setNewUser(user);

      if(!user.firstName || !user.lastName || !user.mobile || !user.email ||  !user.password  || !user.role){
        setDisabled(true)
      }else{
        setDisabled(false)
      } 
    }

  return (
    <div>
      <Container>

        <Row>
          <Col className='left-row' ></Col>
          <Col className='right-row' xs={8 }>
          <h1 className='signup'>Signup</h1>
          <br/>
          <Form  id='signUpForm' onSubmit={regsiterHandler}>
            <div className="form-floating mb-3">
              <input type="text" name="firstName" onChange={changeHandler} className="form-control" id="floatingInput" placeholder="First Name" required/>
              <label htmlFor="floatingInput">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="lastName" onChange={changeHandler} className="form-control" id="floatingInput"  placeholder="Last Name" required/>
              <label htmlFor="floatingInput">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="mobile" onChange={changeHandler} className="form-control" id="floatingInput"  placeholder="Phone Number" required/>
              <label htmlFor="floatingInput">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input  type="email" name="email" onChange={changeHandler} className="form-control" id="floatingInput"  placeholder="Email Address" required/>
              <label htmlFor="floatingInput">Email Address</label>
              <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
            </div>
            <div className="form-floating mb-3">
              <input type="password" name="password" autoComplete='' onChange={changeHandler} className="form-control" id="floatingPassword"  placeholder="Password" required/>
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline radio-group-container">

              <p>Please select from below if you are a Food Donator or Food Reciever ..</p>

              <div>
                <input type="radio" id="foodDon" name="role" value={'Donator'} className="custom-control-input" onChange={changeHandler} required />
                <label htmlFor="foodDon" className="custom-control-label" style={{ "marginLeft": "15px" }}>Food Donator</label>
              </div>

              <div>
                <input type="radio" id="foodRec" name="role" value={'Reciever'} className="custom-control-input" onChange={changeHandler} required/>
                <label htmlFor="foodRec" style={{ "marginLeft": "15px" }} className="custom-control-label">Food Reciever</label>
              </div>
            </div>
            <br />  
            <Button className="submit-button" disabled={disabled} type='submit'>Signup</Button>
              <p className="signup-text">
                Already have an account? <a  href="/login">Login</a>
              </p>
          </Form>

        </Col>
      </Row>
    </Container>    
  </div>
  );
}


