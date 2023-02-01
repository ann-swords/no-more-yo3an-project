import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './DonateFood.css'
import FoodMap from "../FoodMap/FoodMap";
import { Container, Button, Row, Col, Form, FloatingLabel  } from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function DonateFood(props) {

  const navigate = new useNavigate();
  const [selectedImages, setSelectedImages] = useState([])
  const [selected, setSelected] = useState(null);
  const [allergies, setAllergies] = useState([]);
  const form = useRef(null)
  const [newFood, setNewFood] = useState({
    // must be declared
    contains: [],
    // images: [{}]
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



  const donationHandler = (e) => {
    e.preventDefault();
    submitFood()
  };

  const submitFood = async() =>{
    console.log('newFood',newFood)
    const token = localStorage.getItem('token')
    const myData = new FormData();
    // formData.append('images')
    // myData.append()
    for (let i = 0; i < newFood.images.length; i++) {
      myData.append('images', newFood.images[i]) 
    }
    for (let i = 0; i < newFood.contains.length; i++) {
      myData.append('contains',  newFood.contains[i]) 
    }
    myData.append('name', newFood.name)
    myData.append('description', newFood.description)
    myData.append('prodDate', newFood.prodDate)
    myData.append('expDate', newFood.expDate)
    myData.append('block', newFood.block)
    myData.append('road', newFood.road)
    myData.append('flat', newFood.flat)
    myData.append('lat', newFood.lat)
    myData.append('lng', newFood.lng)
    myData.append('building', newFood.building)
   console.log('myData', ...myData);
   if (token) {
      const result = await axios.post('http://localhost:4000/food', myData, { headers: {"Authorization": token, "Content-Type": "multipart/form-data"}})
      if(result){
        alert(result)
      }
      // axios({
      //   method: 'POST',
      //   url: "http://localhost:4000/food",
      //   data: myData,
      //   headers: {"Authorization": token, "Content-Type": "multipart/form-data",}
      // })
      // .then(() => {

      //     // USE NAVIGATE
      //     // navigate("/user/donates" + "?donated=1")
      //     // window.location.replace("/user/donates" + "?donated=1")
      //   })
      //   .catch((err) => {
      //     toast.error("Error -> " + err)
      //   })
    }
  }


 

  // const uploadImages = async() => {
  //     await setImages();
  //     console.log('uploadimages', cloudImages);
  //     setNewFood({...newFood, })
  //     // cloudImages["images"] = cloudImages
  //     props.donate(newFood);
  //     // navigate("/user/donates");
  //     // debugger;
  //   }

  // const uploadImage = () => {
  //   console.log('selectedImages', selectedImages);

  //   const data = new FormData()
  //   data.append("file", image)
  //   data.append("upload_preset", "project_3")
  //   // data.append("cloud_name","project_3")
  //   fetch("https://api.cloudinary.com/v1_1/dnjtrpebc/image/upload/",{
  //   method:"post",
  //   body: data
  //   })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     setUrl(data.url)
  //     // debugger
  //   })
  //   .catch(err => console.log(err))
  //   }
    

  //   const setImages = async() => {
  //     console.log('imagesFiles', imagesFiles)
  
  //     for (let i = 0; i < imagesFiles.length; i++) {
  
  //       let image = imagesFiles[i];
  
  //       console.log('image is being sent', image)
        
  //       let formData = new FormData()
  //       formData.append('file', image)
  //       formData.append('upload_preset', 'project_3')
  //       await axios.post('https://api.cloudinary.com/v1_1/dnjtrpebc/image/upload/', formData)
  //       .then(res => {
  //         console.log(res.data.url)
  //         let image_ = res.data.url
  //         // images.push(image_);  
  //         setCloudImages([...cloudImages, image_])
  //       })
  //       .catch(err => console.log(err))
  //     } 
  //     // debugger
  //   // setCloudImages(images);
  //   // debugger
  //   console.log('newFood', newFood)
  // }
  
  // console.log('cloudImages', cloudImages);


// debugger;

  const onSelectFile = (e) => {
    let images_= [];
    // console.log('e.target.files',e.target.files)
    let files = e.target.files;
    console.log('typeof files',typeof e.target.files[0])
    for(let i=0; i < files.length; i++){
      images_.push(files[i]);
      // debugger
    }
    setSelectedImages(selectedImages.concat(images_))
    console.log(images_);
    setNewFood({...newFood, images:images_})
    // setNewFood({...newFood, images: selectedImages})
    console.log('selectedImages', selectedImages);
  }

  const removeImage = (index) => {
    selectedImages.splice(index, 1);
    setSelectedImages(selectedImages.filter((index_) => index_ !== index))
  }


  return (
    <div className='bodyy'>

<br /><br />
        <h1 className="head1">Donate Food</h1>
    <Container>
        <Form ref={form} onSubmit={donationHandler}>
          <Row>
            <Col className="donation">

              <FloatingLabel controlId="floatingInput" label="Dish Name" className="mb-3">
                <Form.Control type="text" name="name" onChange={changeHandler} placeholder="Description"  />
              </FloatingLabel>

              <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
                <Form.Control as="textarea" name="description" onChange={changeHandler} placeholder="Description"  />
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
                   
                />
              </Form.Group>


              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expDate"
                  onChange={changeHandler}
                   
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
                   
                />
                <button onClick={uploadImage}>Upload Image</button>
              </Form.Group> */}

              <Form.Group className="mb-3">
                {/* <Form.Label>Attach at least one Image</Form.Label> */}
                <Form.Control
                  type="file"
                  name="images"
                  onChange={onSelectFile}
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
                            <img src={URL.createObjectURL(image)} className="file-img" alt="upload"/>
                        </div>
                        <div key={`file-${idx}-btn`} className='file-delete-btn'>
                          <Button  onClick={e => removeImage(idx)}>
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
                          <input type="text" name="block" onChange={changeHandler} class="form-control" id="floatingInput" placeholder="Block No"  />
                          <label for="floatingInput">Block No</label>
                        </div>
                  </Form.Group>

                  <Form.Group as={Col} md="3">
                  <div class="form-floating mb-3">
                          <input type="text" name="road" onChange={changeHandler} class="form-control" id="floatingInput" placeholder="Road No"  />
                          <label for="floatingInput">Road No</label>
                        </div>
                  </Form.Group>


                  <Form.Group as={Col} md="3">
                  <div class="form-floating mb-3">
                          <input type="text" name="building" onChange={changeHandler} class="form-control" id="floatingInput" placeholder="Building/Villa"  />
                          <label for="floatingInput">Building/Villa</label>
                        </div>
                  </Form.Group>


                  <Form.Group as={Col} md="3">
                  <div class="form-floating mb-3">
                          <input type="text" name="flat" onChange={changeHandler} class="form-control" id="floatingInput" placeholder="Flat"  />
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

