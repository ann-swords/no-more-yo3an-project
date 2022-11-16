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
    contains: [],
    images: []
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
      console.log(newFood)
  }

  // ISSUE HERE
  const donationHandler = (e) => {
      e.preventDefault();

      // call function to upload the images to cloud
      // get the url from the cloud
      // save it to the newFood state
      uploadImages()

      setNewFood(...newFood, newFood.images=cloudImages)

      props.donate(newFood)
  }




  const [selectedImages, setSelectedImages] = useState([])

  const [imagesFiles, setImagesFiles] = useState([])


  const [image, setImage] = useState()


  const [cloudImages, setCloudImages] = useState([])

  const uploadImages = (e) => {


    let files = imagesFiles

    console.log('first file', files[0])
    console.log('second file', files[1])

    const filesKeys = Object.keys(files)


    console.log('files keys', filesKeys)


    for (let i = 0; i < filesKeys.length-1; i++) {


      let image = files[filesKeys[i]];
      
      let formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', 'project_3')
      axios.post('https://api.cloudinary.com/v1_1/dnjtrpebc/image/upload/', formData)
      .then(res => {
        console.log(res.data.url)
        let image = res.data.url
  

        console.log('image', image)

        setCloudImages([...cloudImages, image])
  
        // setCloudImages(...cloudImages);
  
        // food.images.push(image)
  
        // must be save to the form state
        // setNewFood(food)
        
        console.log('cloudImages', cloudImages)
  
        console.log('sample updating the state of images')
      })
      .catch(err => console.log(err))
      
    }



  }





  const onSelectFile = (e) => {
    const selectedFiles = e.target.files

    setImagesFiles(selectedFiles)

    console.log(selectedFiles)

    // convert to array to view it
    const selectedFilesArray = Array.from(selectedFiles)

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })
    console.log(imagesArray)
    setSelectedImages((previousImages) => previousImages.concat(imagesArray))

  }

  const removeImage = (e) => {

    const image = e.target.value

    const updatedSelected = selectedImages.filter((e) => e !== image)
    setSelectedImages(updatedSelected)

    console.log('selectedImages', selectedImages)


    // must update the file
    // const updatedSelected = selectedImages.filter((e) => e !== image)
    // setSelectedImages(updatedSelected)

    // console.log('selectedImages', selectedImages)
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
              {//older version
              
              /* <Form.Group className="mb-3">
                <Form.Label>Attach at least one Image</Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  onChange={(event) => { setImage(event.target.files[0])}}
                  required
                />
                <button onClick={uploadImage}>Upload Image</button>
              </Form.Group> */}
              <Form.Group className="mb-3">
                <Form.Label>Attach at least one Image</Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  onChange={onSelectFile}
                  required
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFileMultiple">
              <div className="file-images-div">
                  {selectedImages && selectedImages.map((image, idx) => {
                    return(
                      <div key={'single-file-div-'+idx} className='single-file-div'>
                      
                        <div key={`file-${idx}-img`} className='file-img-div'>
                            <img src={image} className="file-img" alt="upload"/>
                        </div>
                        <div key={`file-${idx}-btn`} className='file-delete-btn'>
                          <Button value={image} onClick={removeImage}>
                            Delete
                          </Button>
                        </div >
                      </div>
                    )
                  })}  
                </div>
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
