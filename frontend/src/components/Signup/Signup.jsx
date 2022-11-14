import React, {useState} from 'react'

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
      <h1>Signup</h1>



      <form onSubmit={regsiterHandler}>
        <label>FirstName:</label>
        <input type="text" name="firstName" onChange={changeHandler} />
        
        <br /><br />

        <label>LastName:</label>
        <input type="text" name="lastName" onChange={changeHandler}/>
      
        <br /><br />


        <label>Mobile Number:</label>
        <input type="text" name="mobile" onChange={changeHandler} />

        <br /><br />

        <label>Email:</label>
        <input type="email" name="email" onChange={changeHandler} />

        <br /><br />

        <label>Password:</label>
        <input type="password" name="password" autoComplete='' onChange={changeHandler} />

        <br /><br />

        <div className="custom-control custom-radio custom-control-inline">
          <p>Please select from below if you are a Food Donator or Food Reciever ..</p>
          <input type="radio" name="role" value={'Donator'} className="custom-control-input" onChange={changeHandler} required />
          <label className="custom-control-label" style={{ "marginRight": "10px" }}>Food Donator</label>

          <input type="radio" name="role" value={'Reciever'} className="custom-control-input" onChange={changeHandler} />
          <label className="custom-control-label">Food Reciever</label>
        </div>

        <br />

        <button onClick={regsiterHandler}>Signup</button>

        <p> <br />
          Aleady have an account?<br />
          <a className="btn btn-link" href="/login">Login here</a>
        </p>


      </form>
      
    </div>
  );
}


