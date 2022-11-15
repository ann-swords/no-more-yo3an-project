import React, { useState } from 'react';
import {Carousel, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import './HomePage.css'


export default function HomePage() {

  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const navigateToDonatePage = () =>{
    navigate('/donate')
  }

  const navigateToFoodPage = () =>{
    navigate('/food')
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block"  height={590}
          src="https://i.imgur.com/20F147c.png"
          alt="First slide"
        />
        <Carousel.Caption className='caption'>
          <p> Help to significantly reduce the amount of food waste in Bahrain.</p>
        <Button  className='btn' onClick={navigateToDonatePage}>Donate</Button>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block " height={590}
          src="https://i.imgur.com/aQu02Yj.png"
          alt="Second slide"
        />

        <Carousel.Caption className='slide2'>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"  height={590}
          src="https://i.imgur.com/aSav2Em.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className='cap'>
          <p>
           In need for food? Check Donations
          </p>
          <Button  className='donationBtn' onClick={navigateToFoodPage}>Donations</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
