import React, {useState} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './Login.css'
export default function Login(props) {

  const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const loginHandler = (e) => {
try {
  e.preventDefault() 
  props.login(newUser)
} catch (error) {
  toast.error("ERROR ->" + error);
}     
    }


  return (
    <div>

<Container>

<Row >
  <Col className='left-col' ></Col>

  <Col className='right-col' xs={8 }>
    
  <h1 className='signup'>Login to continue</h1>
  <br/>

<Form onSubmit={loginHandler}>
 
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

  <Button type='submit' className="submit-button">Login</Button>
  <br />
  <span className="signup-text">Don't have an account? <a href="/signup">Signup</a></span>
</Form>
  </Col>
</Row>
</Container>
      
    </div>
  );
}
