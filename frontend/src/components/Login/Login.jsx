import React, {useState} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './Login.css'
export default function Login(props) {

  const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        // console.log(user);
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

      <Button type='submit'>Login</Button>

      <p> <br />
        Don't have an account? <br />
        <a className="btn btn-link" href="/signup">Signup here</a>

      </p>

</Form>


     


      {/* <form onSubmit={loginHandler}>
        <label>Email:</label>
        <input type="email" name="email"  onChange={changeHandler}  />
        <br /><br />
        <label>Password:</label>
        <input type="password" name="password"  onChange={changeHandler} />
        <br /><br />
        <button type="submit">Login</button>

        <p> <br />
        Don't have an account? <br />
        <a className="btn btn-link" href="/signup">Signup here</a>

      </p>
      </form> */}

   </Col>
      </Row>
    </Container>
      
    </div>
  );
}
