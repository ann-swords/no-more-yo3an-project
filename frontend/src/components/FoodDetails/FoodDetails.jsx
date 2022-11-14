import React, {useState, useEffect} from 'react'
import './FoodDetails.css'
import axios from "axios";
import { useParams } from 'react-router-dom';

function FoodDetails(props) {


    // get all the food details from api
    // const id = props.match.params.id;

    const id = useParams().id

    console.log(id)

    const [food, setFood] = useState({})
  
  
    useEffect(()=>{
      axios.get(`http://localhost:4000/food/${id}`)
      .then(res => {
        console.log(res.data)
        setFood(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  
    },[])
    
  
  



  return (
    <div className='food-details-container'>
        <h1>FoodDetails</h1>
        <h1>{food.name}</h1>
        
        {/* <img alt='foodImage' className='food-details-img' src={props.food.images[0]}></img> */}
        <img alt='foodImage' className='food-details-img' src='https://media.npr.org/assets/img/2013/09/26/ap110725132481-64efa1b0559d2ba8f38c7f6aaa9b96221806903b-s1100-c50.jpg'></img>
        
        
    </div>
  )
}

export default FoodDetails