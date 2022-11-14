import React, { useState } from 'react'
import './AllFood.css'
import SingleFood from '../SingleFood/SingleFood'

function AllFood() {


    /*
    

  "_id": {
    "$oid": "636fb42bf49ba5636619ddcb"
  },
  "name": "Pizza",
  "description": "Awesome Pizza",
  "prodDate": {
    "$date": {
      "$numberLong": "1668258640741"
    }
  },
  "expDate": {
    "$date": {
      "$numberLong": "1668258640741"
    }
  },
  "images": [
    "A",
    "B",
    "C",
    "D"
  ],

  "contains": [],

    */



    const [foodList, setFoodList] = useState([
        
        {
        _id: "636fb42bf49ba5636619ddcb",
        name: "Pizza",
        description: "Awesome Pizza",
        prodDate: "13/11/2022",
        expDate: "13/11/2022",
        images: [
            "https://img.hoodline.com/2022/7/raising_canes_2.webp",
            "https://dynl.mktgcdn.com/p/evpxnwDCKMu4Wa2aTVSrCvZD--tnT16qRINgrY-V3Ik/600x337.jpg"
          ],
        
        contains: [{
            contentName: 'Peanuts'
          },
          {
            contentName: 'milk'
          }]
        },
        {
            _id: "636fb42bf49ba5636619ddcb",
            name: "Burger",
            description: "Awesome Pizza",
            prodDate: "13/11/2022",
            expDate: "13/11/2022",
            images: [
                "https://img.hoodline.com/2022/7/raising_canes_2.webp",
                "https://dynl.mktgcdn.com/p/evpxnwDCKMu4Wa2aTVSrCvZD--tnT16qRINgrY-V3Ik/600x337.jpg"
              ],
            
            contains: [{
                contentName: 'Peanuts'
              },
              {
                contentName: 'milk'
              }]
        },
        {
            _id: "636fb42bf49ba5636619ddcb",
            name: "Fries",
            description: "Awesome Pizza",
            prodDate: "13/11/2022",
            expDate: "13/11/2022",
            images: [
                "https://img.hoodline.com/2022/7/raising_canes_2.webp",
                "https://dynl.mktgcdn.com/p/evpxnwDCKMu4Wa2aTVSrCvZD--tnT16qRINgrY-V3Ik/600x337.jpg"
              ],
            
            contains: [{
                contentName: 'Peanuts'
              },
              {
                contentName: 'milk'
              }]
        },
        {
            _id: "636fb42bf49ba5636619ddcb",
            name: "Pepsi",
            description: "Awesome Pepsi",
            prodDate: "13/11/2022",
            expDate: "13/11/2022",
            images: [
                "https://img.hoodline.com/2022/7/raising_canes_2.webp",
                "https://dynl.mktgcdn.com/p/evpxnwDCKMu4Wa2aTVSrCvZD--tnT16qRINgrY-V3Ik/600x337.jpg"
              ],
            
            contains: [{
                contentName: 'Peanuts'
              },
              {
                contentName: 'milk'
              }]
        },
        {
            _id: "636fb42bf49ba5636619ddcb",
            name: "Pepsi",
            description: "Awesome Pepsi",
            prodDate: "13/11/2022",
            expDate: "13/11/2022",
            images: [
                "https://img.hoodline.com/2022/7/raising_canes_2.webp",
                "https://dynl.mktgcdn.com/p/evpxnwDCKMu4Wa2aTVSrCvZD--tnT16qRINgrY-V3Ik/600x337.jpg"
              ],
            
            contains: [{
                contentName: 'Peanuts'
              },
              {
                contentName: 'milk'
              }]
        },
        {
            _id: "636fb42bf49ba5636619ddcb",
            name: "Pepsi",
            description: "Awesome Pepsi",
            prodDate: "13/11/2022",
            expDate: "13/11/2022",
            images: [
                "https://img.hoodline.com/2022/7/raising_canes_2.webp",
                "https://dynl.mktgcdn.com/p/evpxnwDCKMu4Wa2aTVSrCvZD--tnT16qRINgrY-V3Ik/600x337.jpg"
              ],
            
            contains: [{
                contentName: 'Peanuts'
              },
              {
                contentName: 'milk'
              }]
        }
    ])

    
  return (
    <>

    <h1>Food Page</h1>


    <div className='food-container'>
        
        {foodList.map( (food, index) => 
          <React.Fragment key={index}>
          <SingleFood food={food} />
          </React.Fragment>
        )}


    </div>

    </>
  )
}

export default AllFood