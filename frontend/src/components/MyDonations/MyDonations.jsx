import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function MyDonations() {

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
    useEffect(() => {
     getUsersDonates();
    },[])
  
  
  return (
    <div>
      {foods ? foods.map(food => (
      <div key={food._id}>
        <p>{food.name}</p>
        {/* <p>{tweet.description}</p> */}
      </div>
        )
        ): null}
    </div>
  )
}
