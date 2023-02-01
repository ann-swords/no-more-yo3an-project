import React, {useState, useEffect} from 'react'
import './FoodDetails.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import Maps from '../Maps/Maps';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import {Row, Col} from 'react-bootstrap'

function FoodDetails() {


    // get all the food details from api
    // const id = props.match.params.id;

    const id = useParams().id

    console.log(id)

    const [food, setFood] = useState({})
    const [foodStatus, setFoodStatus] = useState({status: ''})
  
    useEffect(()=>{
      axios.get(`http://localhost:4000/food/${id}/details`)
      .then(res => {
        console.log(res.data)
        setFood(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  
    },[id])

    function reservedStat() {
      return new Promise((resolve) => setTimeout(resolve, 3000));
    }

      const [isUpdatingOrderStatus, setUpdatingOrderStatus] = useState(false);
    
      useEffect(() => {
        if (isUpdatingOrderStatus) {

          reservedStat().then(() => {

            if(document.getElementById('reserveBtn')){
              document.getElementById('reserveBtn').innerText = 'Reserved'
            }else{
              document.getElementById('collectedBtn').innerText = 'Food Collected'
            }
            

          });
          
          axios.post(`http://localhost:4000/food/${id}` , foodStatus)
          .then(res => {})
          .catch(err => {
            console.log(err)
          })
        }
      }, [isUpdatingOrderStatus]);
    
      const handleClick = (e) => { 
        setUpdatingOrderStatus(true);
        setFoodStatus({
          ...foodStatus,
          [e.target.name]: e.target.value
        })
      }

      const [index, setIndex] = useState(0);

      const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };



      
  return (
<div className='bodyy'>

<br /><br />
    <h1>Donation Details</h1>
    
    <div class="parent">

        {/* Food Images: */}
        <div class="div1">
        {food.images ? 
            (<Carousel  activeIndex={index} onSelect={handleSelect} className='food-image-carousel' interval={1000}>
                {food.images.map((image, idx) => (

                    <Carousel.Item key={idx}>
                
                      <img className='imgg'

                        src={image}
                        alt={"slide "+idx}
                      />
                    </Carousel.Item>
                )) }
            </Carousel>)

          : (<h1>Still loading..</h1>)}
        </div>

      <div class="div2"> 

          {/* Food Details: */}
          <div class="col1"> 
            <p className='food'>Dish Name: <span className='foodContent'>{food.name}</span></p>
                <p className='food'>Discription: <span className='foodContent'>{food.description}</span> </p>
                
              
                {food.contains? <p className='food'>Food Contents: </p> : null}


                {food.contains ?
                
                food.contains.map((el, idx) =>
                <p key={idx} className="allergie">
                    {el.contentName}
                </p>) : null}


                {/* Add the location */}
                

  { food.status === 'Reserved' ? <Button id='collectedBtn' variant="secondary" name="status"
                                          value={setFood.status = 'Collected'} disabled={isUpdatingOrderStatus}
                                          onClick={!isUpdatingOrderStatus ? handleClick : null} >
                                          {isUpdatingOrderStatus ? 'Updating...' : 'Dispatch'}
                                  </Button>
    : null}

  { food.status  === 'Available' ? <Button id='reserveBtn' variant="success" name="status" 
                                           value={setFood.status = 'Reserved'} disabled={isUpdatingOrderStatus}
                                           onClick={!isUpdatingOrderStatus ? handleClick : null} >
                                          {isUpdatingOrderStatus ? 'Reserving...' : 'Reserve'}
                                   </Button>
        
   : null}
        
{ food.status  === 'Collected' ? <Button variant="secondary" disabled={true} > {'This Food has been collected'} </Button>
        
   : null}
  

  {/* //To work on later -> Need to validate userdonator should not be able to reserve his donated food .  */}

          </div>
      
                <br />
        
        {/* The Map: */}
        <div class="col2"> 
      
          < Maps location={food.location}/>
        
        </div> 
        


      </div>


    </div>
   

          
    

</div>
  )
      }
export default FoodDetails