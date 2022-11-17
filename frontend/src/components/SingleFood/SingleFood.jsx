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

      {/* <img alt='food image' className='food-img' src={food.images[0]} 
         onError={(e) =>
                  (e.target.src="https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png")}
                  /> */}

        <img className='food-img' src={food.images[0]}
                alt="Food"
               onError={(e) =>
                  (e.target.src="https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png")
          }/>
        <p className='food-card-title'>{food.name}</p>            
        <p className='food-card-desc'>{food.description}</p>
    </div>


  )
}

export default SingleFood