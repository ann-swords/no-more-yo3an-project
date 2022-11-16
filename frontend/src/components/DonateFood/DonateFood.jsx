import React, { useState, useEffect } from "react";
import axios from "axios";
import './DonateFood.css'

import FoodMap from "../FoodMap/FoodMap";
import { Container, Button, Row, Col, Form, FloatingLabel  } from "react-bootstrap";


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
        <h1 className="head1">Donate Food</h1>
        <Form onSubmit={donationHandler}>
          <Row>
            <Col className="donation">

              <FloatingLabel controlId="floatingInput" label="Dish Name" className="mb-3">
                <Form.Control type="text" name="name" onChange={changeHandler} placeholder="Description" required/>
              </FloatingLabel>

              <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
                <Form.Control as="textarea" name="description" onChange={changeHandler} placeholder="Description" required/>
              </FloatingLabel>

            {/* Prod and Exp Dates */}
        
      <>
      <Row>
      <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Production Date</Form.Label>
                <Form.Control
                  type="date"
                  name="prodDate"
                  onChange={changeHandler}
                  required
                />
              </Form.Group>


              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expDate"
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
      </Row>
      
      </>
        

              {/* Image Upload: */}
              <Form.Group className="mb-3">
                {/* <Form.Label>Attach at least one Image</Form.Label> */}
                <Form.Control
                  type="file"
                  name="images"
                  onChange={changeHandler}
                  required
                />
              </Form.Group>



              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <label>Contains:</label> <br />
              {allergies.map((a, index) => (
                <React.Fragment key={index}>
               <div className="allergies">
               <input
                    type="checkbox"
                    id={index}
                    name="contains"
                    value={a._id}
                    onChange={changeHandler}
                  />
                  <label htmlFor={index}>{a.contentName}</label> 
               </div>
                 
                </React.Fragment>
              ))}
              <br /> <br />
              <Button className="donateBtn" type="submit"> Donate </Button>
            </Col>


            {/* Map and Location Deatils: */}
            <Col className="address">
              <div>
                <p className="address-tag">Address:</p>  

                <Row className="mb-5 haha">

                  <Form.Group as={Col} md="3">
                  <div class="form-floating mb-3">
                          <input type="text" name="block" onChange={changeHandler} class="form-control" id="floatingInput" placeholder="Block No" required/>
                          <label for="floatingInput">Block No</label>
                        </div>
                  </Form.Group>

                  <Form.Group as={Col} md="3">
                  <div class="form-floating mb-3">
                          <input type="text" name="road" onChange={changeHandler} class="form-control" id="floatingInput" placeholder="Road No" required/>
                          <label for="floatingInput">Road No</label>
                        </div>
                  </Form.Group>

                  <Form.Group as={Col} md="3">
                  <div class="form-floating mb-3">
                          <input type="text" name="building" onChange={changeHandler} class="form-control" id="floatingInput" placeholder="Building/Villa" required/>
                          <label for="floatingInput">Building/Villa</label>
                        </div>
                  </Form.Group>

                  <Form.Group as={Col} md="3">
                  <div class="form-floating mb-3">
                          <input type="text" name="flat" onChange={changeHandler} class="form-control" id="floatingInput" placeholder="Flat" required/>
                          <label for="floatingInput">Flat</label>
                        </div>
                  </Form.Group>
                </Row>
                
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

