import React, { useState } from 'react';
import {Carousel, Button, Container, Row, Col} from 'react-bootstrap';
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

    <div className='bodyy'>

<Carousel activeIndex={index} onSelect={handleSelect} className='main-carousel' interval={1000}>
      <Carousel.Item>
        <img
          className="d-block"  height={590}
          src="https://i.imgur.com/20F147c.png"
          alt="First slide"
        />
        <Carousel.Caption className='firstCap'>
          <p> Help to significantly reduce the amount of food waste in Bahrain.</p>
        <Button  className='btn-home' onClick={navigateToDonatePage}>Donate</Button>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block"  height={590}
          src="https://i.imgur.com/LOvCTeM.png"
          alt="Second slide"
        />

        <Carousel.Caption className='secondCap'>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"  height={590}
          src="https://i.imgur.com/aSav2Em.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className='thirdCap'>
          <p>
           In need for food? Find Donated Food
          </p>
          <Button  className='findFoodBtn' onClick={navigateToFoodPage}>Find Food</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <Container className='termsPack'>
<h1>Terms of Packing</h1>
<br />
    <Row className='row1'>
        <Col className='terms1'><p>Ensure the safety of the food to be conserved during the packing process</p></Col>

        <Col className='terms2' ></Col>
    </Row>

    <Row className='row2'>
        <Col className='terms3' ></Col>

        <Col className='terms1'>Ensure that food is in good condition and has not been touched by hand.</Col>
    </Row>

    <Row className='row3'>
        <Col className='terms1'> Airtight containers shall be used, suitable for packing hot food and prepared for reuse and reheating in the microwave.</Col>

        <Col className='terms6'>
        </Col>
    </Row>

    <Row className='row4'>
        <Col className='terms7' ></Col>

        <Col className='terms1'>Food shall not be packed from outdoor buffets due to hygienic reasons.</Col>
    </Row>

    </Container>
    
    
    
    </div>

  )
}
