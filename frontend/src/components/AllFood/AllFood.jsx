import React, { useState, useEffect } from 'react'
import './AllFood.css'
import SingleFood from '../SingleFood/SingleFood'
import axios from 'axios'

function AllFood() {


    const [foodList, setFoodList] = useState([])

    // useEffect(()=>{

  
    // },[foodList])

  useEffect(() => {
  foods()
  }, [])



const foods = (e) =>{
  axios.get("/food")
  .then(res => {
    setFoodList(res.data)
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })

}
    
  return (
    <>

    <div className="container">
      <h1>Available Food</h1>
      <div className='food-container'>
      
          {foodList.map( (food, index) =>
            <React.Fragment key={index}>
            <SingleFood food={food} />
            </React.Fragment>
          )}
      </div>
    </div>

    </>
  )
}

export default AllFood