import React, {useState} from 'react'

export default function Login(props) {

  const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const loginHandler = (e) => {
      e.preventDefault() 
      props.login(newUser)
    }


  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={loginHandler}>
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
      </form>
    </div>
  );
}
