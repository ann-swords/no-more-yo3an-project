import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage'; 
import About from './components/About/About';
import DonateFood from './components/DonateFood/DonateFood';
import AllFood from './components/AllFood/AllFood';
import Navbar from './components/NavBar/Navbar';
import { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Footer from './components/Footer/Footer';
import FoodDetails from './components/FoodDetails/FoodDetails';
import MyDonations from './components/MyDonations/MyDonations';
// import NotAuthorized from './components/NotAuthorized';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  // const navigate = new useNavigate();
  // const history = useHistory();
  const notify = toast();
  useEffect(()=>{
    let token = localStorage.getItem("token");
    if(token != null){
      let user = jwt_decode(token);
        getUser(user.user.id);
      if(user){
        setIsAuth(true);
        setUser(user);
        // localStorage.setItem("userName", user.firstName);
      }else if(!user){
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    }
  },[])



const loginHandler = (cred) =>{
try {
  axios.post("http://localhost:4000/auth/signin", cred)
  .then(res =>{
    if(res.data.token != null){
      localStorage.setItem("token", res.data.token);
      let user = jwt_decode(res.data.token);
      setIsAuth(true);
      // getUser(user.user.id);
    }

  })
  .catch(err => {
    toast.error("Error -> " + err.response.data.message)
  })

} catch (error) {
  toast.error("Error -> " + error)
}
}

const getUser = (id) =>{
  axios.get(`http://localhost:4000/users/${id}`)
  .then(res => {
      setUser(res.data);
      setIsAuth(true);
      localStorage.setItem("userName", res.data.firstName);
  })
  .catch(err => console.log(err))
}

const onSubmitHandler = (formData) =>{
  try {
    axios.post(`http://localhost:4000/users/${user._id}`, formData)
  .then(res => {
      getUser(res.data._id);
      toast("Your profile data is successfully updated !",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
  } catch (error) {
    toast.error(error)
  }
}

//Add a new user:
const registerHandler = (user) => {
  axios
    .post("http://localhost:4000/users", user)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      toast.error("Error -> " + err.response.data.message)
    });
};

const onLogoutHandler = (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  setIsAuth(false);
  setUser(null);
  // window.location.replace("/home")
    toast('You are logged out successfuly!',{
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
    }


//Add a new Food donation


  return (
    <Router>
    <div className="App">
    <Navbar onLogoutHandler={onLogoutHandler} onSubmitHandler={onSubmitHandler} isAuth={isAuth} user={user}></Navbar>
      <Routes>
      <Route path="/home" element={<HomePage/>} />
      <Route path="/about" element={<About/>} />
        <Route path="/signup" element={<Signup register={registerHandler}/>} />
        <Route path="/login" element={isAuth? <HomePage/> : <Login login={loginHandler}/>} />
        {/* <Route path="/food/new" element={ <Food donate={donationHandler}/>} />         */}
        <Route path="/food" element={isAuth? <AllFood/> : <Login login={loginHandler}/>} />

        <Route path="/user/donates" element={<MyDonations/>} />
        <Route path="/food/:id/details" element={<FoodDetails/>} />

        <Route path="/donate" element={isAuth? <DonateFood/> : <Login login={loginHandler}/>}/> {/*<NotAuthorized/> */}

        <Route path="/fooddetails/:id" element={isAuth? <FoodDetails /> : <Login login={loginHandler}/>} />
      </Routes>
      <ToastContainer />
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
