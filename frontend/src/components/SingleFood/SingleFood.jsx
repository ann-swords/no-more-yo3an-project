import React, { useState } from 'react'
import './SingleFood.css'
import { useNavigate } from "react-router-dom";

function SingleFood(props) {
  
  const [food, setFood] = useState(props.food)

  const navigate = new useNavigate();

  const id = food._id

  const handleFoodClick = (e) => {
      console.log('food id', id)
      navigate(`/food/${id}/details`);
  }

  return (

    <div className='food-card' onClick={handleFoodClick}>

      {food.images.length ? 
      (<img alt='food image' className='food-img' src= {food.images[0]} />)
      : (<img alt='food image' className='food-img' src= 'https://media.npr.org/assets/img/2013/09/26/ap110725132481-64efa1b0559d2ba8f38c7f6aaa9b96221806903b-s1100-c50.jpg'/>
      )}
        <p className='food-card-title'>{food.name}</p>            
        <p className='food-card-desc'>{food.description}</p>
    </div>


  )
}

export default SingleFood