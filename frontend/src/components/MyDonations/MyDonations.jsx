import React, {useState, useEffect} from 'react';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import './MyDonations.css';
import Moment from 'react-moment';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyDonations() {
  const navigate = new useNavigate();
  const [foods, setFoods] = useState([]);

  const getUsersDonates = () =>{
    const token = localStorage.getItem('token')
    axios.get('http://localhost:4000/users/food',{
      headers: {Authorization: token}
    })
    .then(res =>{
      setFoods(res.data.foods);
      // debugger
    })
    .catch(err => console.log(err))
  }

  const handleFoodClick = (id) =>{
    console.log('food id', id)
    navigate(`/food/${id}/details`);
    // axios.get(`http://localhost:4000/food/${req.params.id}/details`)
    // .then(res => {
    //   res.json(res.data);
    // })
    // .catch(err =>{
    //   res.json(err);
    // })
  }
    useEffect(() => {
     getUsersDonates();
    },[])

    const { search } = window.location;   
    const donated = (new URLSearchParams(search)).get('donated');
  
    if (donated === '1') {
    
      toast("Thanks for donating ❤️" ,{
        toastId: 'success1',
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
      }
      
  return (
    <div className="page-container">
      <div><img src="https://i.imgur.com/WBkRhKD.png" alt="" /></div>
      <div className='myDonations-list-container'>
        <p className="donation-text">{localStorage.getItem("userName")}, you helped <span className='helpNum'>{foods.length}</span> people! </p>
        <h2>My Donations</h2>
        <div className="donations-list">
          {foods ? foods.map(food => (
          <div key={food._id} onClick={e => handleFoodClick(food._id)} className="donations-container">
              <img className='myDonations-img' src={food.images[0]}
                alt="Food"
               onError={(e) =>
                  (e.target.src="https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png")
              }/>
      
            <div className='donation-details'>
              <p>{food.name}</p>
              <span className="time-text">
               Posted on <Moment format="D MMM YYYY">{food.createdAt}</Moment>
              </span>
            </div>
            <div className='badge-container' >
              <Badge bg={food.status === 'Available' ? "success" : food.status === 'Reserved' ? "warning" : "danger"}>{food.status}</Badge>
            </div>
          </div>
            )
            ):
            <div>
              <h2>You don't have any donation yet, Make your first donation.</h2>
            </div>}
        </div>
      </div>
    </div>
  )
}
