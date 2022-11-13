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

  const [newFood, setNewFood] = useState({});

  const changeHandler = (e) => {
      const food = { ...newFood };
      food[e.target.name] = e.target.value;
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
              // name={a.contentName}
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
