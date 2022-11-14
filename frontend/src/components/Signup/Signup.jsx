import React, {useState} from 'react'

export default function Signup(props) {

  const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const regsiterHandler = () => {
        props.register(newUser)
    }



  return (
    <div>
      <h1>Signup</h1>


      <form>
        <label>FirstName:</label>
        <input type="text"  name="firstName"   onChange={changeHandler}  />

       
        <br /><br />

        <label>LastName:</label>
        <input type="text" name="lastName"   onChange={changeHandler} />

        <br /><br />


        <label>Mobile Number:</label>
        <input type="text" name="mobile"   onChange={changeHandler} />

        <br /><br />

        <label>Email:</label>
        <input type="email" name="email"  onChange={changeHandler} />

        <br /><br />

        <label>Password:</label>
        <input type="password" name="password"   onChange={changeHandler} />

        <br /><br />

{/* Still not sure how it will be */}
        {/* <label>Role:</label>
        <input type="text" name="role"/>   onChange={changeHandler} */}

        <br /><br />

        <button  onClick={regsiterHandler}  >Signup</button>

        <p>
        Aleady have an account? <br />
        <a href="/login">Login here</a>
      </p>
        
      </form>
    </div>
  );
}
