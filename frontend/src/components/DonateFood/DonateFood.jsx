import React, { useState, useEffect } from "react";
import axios from "axios";
import './DonateFood.css'

import FoodMap from "../FoodMap/FoodMap";


export default function DonateFood(props) {
  const [selected, setSelected] = useState(null);
  const [allergie, setAllergie] = useState([]);


  useEffect(()=>{
    axios.get("http://localhost:4000/food-contents")
    .then(res => {
      console.log(res.data)
      setAllergie(res.data)
    })
    .catch(err => {
      console.log(err)
    })

  },[])



  const [newFood, setNewFood] = useState({

    // must be declared
    contains: []
  });

  const changeHandler = (e) => {


    console.log('target name', e.target.name)

      const food = { ...newFood };

      // if the field is contains then do this
      if(e.target.name === 'contains'){
        console.log('contains is modified')
 
        // if checked removed then add it
        if(e.target.checked){
          food.contains.push(e.target.value)

          // remove the content if not checked removed
        } else {
          let id = food.contains.findIndex(element => element === e.target.value)
          food.contains.splice(id, 1)
        }

        // if other fields then go here an update normally
      }else{
        food[e.target.name] = e.target.value;
      }

      console.log(food);
      setNewFood(food);
  }

  // ISSUE HERE
  const donationHandler = (e) => {
      e.preventDefault();
      props.donate(newFood)
  }


  return (
    <div>
      <h1>Donate Food</h1>
      <form onSubmit={donationHandler}>
        <label>Name</label>
        <input type="text" name="name" onChange={changeHandler}/>
        <br /><br />
        <label>Description</label>
        <input type="text" name="description" onChange={changeHandler}/>
        <br /><br />
        <label>Production Date</label>
        <input type="date" name="prodDate" onChange={changeHandler}/>
        <br /><br />
        <label>Expiry Date</label>
        <input type="date" name="expDate" onChange={changeHandler}/>
        <br /><br />
        <label>Attach Images</label>
        <input type="file" name="images" onChange={changeHandler}/>
        <br /><br />

{/* Map and Location Deatils: */}
        <div>
          <label>Address:</label> <br />
          <input type="text" placeholder="Block" name="block"/>
          <input type="text" placeholder="Road" name="road" />
          <input type="text" placeholder="House" name="house" />
          <br /><br />
          


          <div className='map-details'>

          < FoodMap setSelected={setSelected} selected={selected} />
                
        </div>
        
          <br /><br />
        </div>


        <label>Contains:</label> <br />
        {allergie.map((a, index) => (
          <React.Fragment key={index}>
            <input
              type="checkbox"
              id={index}
              name= "contains"
              value={a._id}
              onChange={changeHandler}
            />
            <label htmlFor={index}>{a.contentName}</label> <br />
          </React.Fragment>
        ))}
        <br /><br />
        <button type="submit">Donate</button>
        {/* <button type="submit">Donate</button> */}
      </form>
    </div>
  );
}
