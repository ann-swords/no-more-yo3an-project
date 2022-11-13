import React, {useState} from 'react'

export default function Login(props) {

  const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const loginHandler = () => {
        props.login(newUser)
    }


  return (
    <div>
      <h1>Login</h1>

      <form>
        <label>Email:</label>
        <input type="email" name="email"  onChange={changeHandler}  />
        <br /><br />
        <label>Password:</label>
        <input type="password" name="password"  onChange={changeHandler} />
        <br /><br />
        <button  onClick={loginHandler} >Login</button>
      </form>
    </div>
  );
}
