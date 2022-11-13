import React from 'react'
import './SingleFood.css'

function SingleFood(props) {
  return (


    <div className='food-card'>

   
        <img className='food-img' src={props.food.images[0]}></img>
        <p>{props.food.name}</p>            
        <p>{props.food.description}</p>            




    </div>


  )
}

export default SingleFood