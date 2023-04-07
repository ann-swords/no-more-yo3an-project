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
      // console.log(res.data)
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
  const donationHandler = async (e) => {
      e.preventDefault();

      // call function to upload the images to cloud
      // get the url from the cloud
      // save it to the newFood state
      await uploadImages()

      // const foodWithoutImages = { ...newFood };
      
      // foodWithoutImages.images = cloudImages
      // // foodWithoutImages.images = newThing

      // // must wait for the newthing

      // // useEffect
      // // setNewFood(foodWithoutImages)
      // setNewFood({...newFood, images: cloudImages})
      // // debugger
      // console.log('newFood', newFood)

      // props.donate(newFood)
  }




  const [selectedImages, setSelectedImages] = useState([])

  // issue here
  const [imagesFiles, setImagesFiles] = useState([])


  // const [image, setImage] = useState()

  // let newThing = []

  const [cloudImages, setCloudImages] = useState([])

  const uploadImages = () => {


    // let files = imagesFiles

    // console.log('first file', files[0])
    // console.log('second file', files[1])

    // const filesKeys = Object.keys(files)


    // console.log('files keys', filesKeys)
    let images = [];
    console.log('imagesFiles', imagesFiles)

    for (let i = 0; i < imagesFiles.length; i++) {

    // for (let i = 0; i < filesKeys.length-1; i++) {


      let image = imagesFiles[i];

      console.log('image is being sent', image)
      
      let formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', 'project_3')
      axios.post('https://api.cloudinary.com/v1_1/dnjtrpebc/image/upload/', formData)
      .then(res => {
        console.log(res.data.url)
        let image = res.data.url
        images.push(image);

        console.log('image', image)

        // 
        // setCloudImages(...cloudImages, image)

        // setCloudImages(current => [...current, image])
        // setCloudImages(...cloudImages, image)
  
        // setCloudImages(...cloudImages);
  
        // food.images.push(image)
  
        // must be save to the form state
        // setNewFood(food)
        
        // console.log('cloudImages', cloudImages)
  
        console.log('sample updating the state of images')

        console.log('cloudImages now',cloudImages)

        // newThing.push(image)

        // console.log('newthing now',newThing)
      })
      .catch(err => console.log(err))
      .finally(()=> {
        setCloudImages(images);
        setNewFood({...newFood, images: images})
        props.donate(newFood)
        // debugger
      })
      
    }
    // console.log('cloudImages', cloudImages)


    // const foodWithoutImages = { ...newFood };
      
    // foodWithoutImages.images = cloudImages
    // foodWithoutImages.images = newThing

    // must wait for the newthing

    // useEffect
    // setNewFood(foodWithoutImages)
    // debugger
    console.log('newFood', newFood)


  }





  const onSelectFile = (e) => {
    const selectedFiles = e.target.files
    
    console.log('selected filess', selectedFiles)

    console.log('type', typeof selectedFiles)

    // setImagesFiles({...selectedFiles})

    
    let chosenFiles = [...selectedFiles]

    console.log('chosen files', chosenFiles)

    console.log('chosen type ', typeof chosenFiles)

    // handleUploadFiles(chosenFiles);

    setImagesFiles([...chosenFiles])

    console.log('images', imagesFiles)



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

    const id = e.target.id

    const updatedSelected = selectedImages.filter((e) => e !== image)
    setSelectedImages(updatedSelected)

    console.log('selectedImages', selectedImages)


    // must update the file
    // const updatedSelected = selectedImages.filter((e) => e !== image)
    // setSelectedImages(updatedSelected)

    // console.log('selectedImages', selectedImages)
  }


  return (
    <div className='bodyy'>

<br /><br />
        <h1 className="head1">Donate Food</h1>
    <Container>
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
      <br />
      </>
              {/* Image Upload: */}

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
                {/* <Form.Label>Attach at least one Image</Form.Label> */}
                <Form.Control
                  type="file"
                  name="images"
                  onChange={onSelectFile}
                  required
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                />
              </Form.Group>
              <br />

              <Form.Group className="mb-3" controlId="formFileMultiple">
              <div className="file-images-div">
                  {selectedImages && selectedImages.map((image, idx) => {
                    return(
                      <div key={'single-file-div-'+idx} className='single-file-div'>
                      
                        <div key={`file-${idx}-img`} className='file-img-div'>
                            <img src={image} className="file-img" alt="upload"/>
                        </div>
                        <div key={`file-${idx}-btn`} className='file-delete-btn'>
                          <Button value={image} id={idx} onClick={removeImage}>
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
