import React from 'react'
import './SingleFood.css'

function SingleFood(props) {
  return (


    <div className='food-card'>

      <a href={`fooddetails/${props.food._id}`} style={{textDecoration: 'none'}}>

        <div className='single-food'>

        {/* <img alt='foodImage' className='food-img' src={props.food.images[0]}></img> */}
        <img alt='foodImage' className='food-img' src={'https://media.npr.org/assets/img/2013/09/26/ap110725132481-64efa1b0559d2ba8f38c7f6aaa9b96221806903b-s1100-c50.jpg'}></img>
        <p>{props.food.name}</p>            
        <p>{props.food.description}</p>


        </div>




      </a>
   


    </div>


  )
}

export default SingleFood