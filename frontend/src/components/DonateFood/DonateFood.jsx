import React, { useState, useEffect } from "react";
import axios from "axios";
import './DonateFood.css'

import FoodMap from "../FoodMap/FoodMap";
import { Container, Button, Row, Col, Form } from "react-bootstrap";


export default function DonateFood(props) {
  const [selected, setSelected] = useState(null);
  const [allergies, setAllergies] = useState([]);
  const [newFood, setNewFood] = useState({
    // must be declared
    contains: []
  });


  useEffect(()=>{
    if(allergies.length === 0){
      getAllergies();
    }
    setNewFood({
      ...newFood, ...selected
    })
    // changeHandler();
  },[selected])


  const getAllergies = () =>{
    axios.get("http://localhost:4000/food-contents")
    .then(res => {
      console.log(res.data)
      setAllergies(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  

  const changeHandler = (e) => {
    console.log('target name', e.target.name)

      const food = { ...newFood, ...selected };

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


<Container>
        <h1>Donate Food</h1>
        <Form onSubmit={donationHandler}>
          <Row>
            <Col className="right-row">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={changeHandler}
                  placeholder="Enter food name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  onChange={changeHandler}
                  placeholder="Enter food description"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Production Date</Form.Label>
                <Form.Control
                  type="date"
                  name="prodDate"
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expDate"
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Attach at least one Image</Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <label>Contains:</label> <br />
              {allergies.map((a, index) => (
                <React.Fragment key={index}>
                  <input
                    type="checkbox"
                    id={index}
                    name="contains"
                    value={a._id}
                    onChange={changeHandler}
                  />
                  <label htmlFor={index}>{a.contentName}</label> <br />
                </React.Fragment>
              ))}
              <br />
              <Button type="submit">
                Donate
              </Button>
            </Col>


            {/* Map and Location Deatils: */}
            <Col>
              <div>
                <label>Address:</label> <br />

                <input type="text" placeholder="Block No" name="block" onChange={changeHandler} required />
                <input type="text" placeholder="Road No" name="road" onChange={changeHandler} required/>
                <input type="text" placeholder="Building No / villa " name="building" onChange={changeHandler} required/>
                <input type="text" placeholder="Flat" name="flat" onChange={changeHandler} required/>

                <br />
                <br />
                <div className="map-details">
                  <FoodMap setSelected={setSelected} selected={selected} />
                </div>
              </div>
            </Col>

            
          </Row>
        </Form>
      </Container>

    </div>
  );
}
