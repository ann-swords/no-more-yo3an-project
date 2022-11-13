import React, { useState } from "react";

export default function Food(props) {
  const [allergie, setAllergie] = useState([
    { contentName: "Milk" },
    { contentName: "Fish" },
    { contentName: "Eggs" },
    { contentName: "Shellfish" },
    { contentName: "TreeNuts" },
    { contentName: "Peanuts" },
    { contentName: "Wheats" },
    { contentName: "Soybeans" },
  ]);

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

  const donationHandler = () => {
      props.donate(newFood)
  }


  return (
    <div>
      <h1>Donate Food</h1>
      <form action="">
        <label>Name</label>
        <input type="text" name="name" onChange={changeHandler}/>
        <br /><br />
        <label>Description</label>
        <input type="text" name="description" onChange={changeHandler}/>
        <br /><br />
        <label>Prodection Date</label>
        <input type="date" name="prodDate" onChange={changeHandler}/>
        <br /><br />
        <label>Expiry Date</label>
        <input type="date" name="expDate" onChange={changeHandler}/>
        <br /><br />
        <label>Attach Images</label>
        <input type="file" name="images" onChange={changeHandler}/>
        <br /><br />

        {/* <div>
          <label>Address:</label> <br />
          <label>Block</label>
          <input type="text" />
          <label>Road</label>
          <input type="text" />
          <label>House</label>
          <input type="text" />
          <br /><br />
          MAP HERE
          <br /><br />
        </div> */}


        <label>Contains:</label> <br />
        {allergie.map((a, index) => (
          <>
            <input
              type="checkbox"
              id={index}
              name= "contains"
              value={a.contentName}
              onChange={changeHandler}
            />
            <label htmlFor={index}>{a.contentName}</label> <br />
          </>
        ))}
        <br /><br />
        <button onClick={donationHandler}>Donate</button>
      </form>
    </div>
  );
}