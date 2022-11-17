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

      const [isReserving, setReserving] = useState(false);
    
      useEffect(() => {
        if (isReserving) {

          reservedStat().then(() => {
            document.getElementById('reserveBtn').innerText = 'Reserved'
          });
          
          axios.post(`http://localhost:4000/food/${id}` , foodStatus)
          .then(res => {})
          .catch(err => {
            console.log(err)
          })
        }
      }, [isReserving]);
    
      const handleClick = (e) => { 
        setReserving(true);
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
                    <Carousel.Item>
                      <img className='imgg'
                        src={image}
                        alt={"slide "+idx}
                      />
                    </Carousel.Item>
                )) }
            </Carousel>)
          : (<h1>stil loading</h1>)}
          <hr/>
        </div>


      <div class="div2"> 

          {/* Food Details: */}
          <div class="col1"> 
            <p className='food'>Dish Name: <span className='foodContent'>{food.name}</span></p>
                <p className='food'>Discription: <span className='foodContent'>{food.description}</span> </p>
                
              
                {food.contains? <p className='food'>Food Contents: </p> : null}

                {food.contains ?
                
                food.contains.map((el, idx) =>
                <p key={idx} className="allergies">
                    {el.contentName}
                </p>) : null}


                {/* Add the location */}
                <p className='food'>Location:</p>
                {/* 
                <h3>{food.road}</h3>
                <h3>{food.block}</h3>
                <h3>{food.building}</h3>
                <h3>{food.flat}</h3> */}
                
                <br />
                {food.status === 'Reserved' ? null : <Button
                id='reserveBtn'
          variant="success"
          name="status"
          value={foodStatus.status = 'Reserved'}
          disabled={isReserving}
          onClick={!isReserving ? handleClick : null}
        >
          {isReserving ? 'Reserving...' : 'Reserve'}
        </Button>}
                
        </div>


        {/* The Map: */}
        <div class="col2"> 
            {/* <img className='map-img' src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg'></img> */}
        
        

          < Maps location={food.location}/>
        
        </div> 
        


      </div>


    </div>
   

        {/* <div>
            right down box
        </div> */}
        {/* <h1>FoodDetails</h1>
        <h1>{food.name}</h1>
        {/* <img alt='foodImage' className='food-details-img' src={props.food.images[0]}></img> */}
        {/* <img alt='foodImage' className='food-details-img' src='https://media.npr.org/assets/img/2013/09/26/ap110725132481-64efa1b0559d2ba8f38c7f6aaa9b96221806903b-s1100-c50.jpg'></img> */}
        
    

</div>
  )
      }
export default FoodDetails