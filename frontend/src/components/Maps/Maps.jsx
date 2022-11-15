import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import React, { useMemo, useState } from 'react'

export default function Maps() {

  const center = useMemo(() => ({lat: 26.0667, lng: 50.5577}), [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });


  // add single marker
  // const [markers, setMarkers] = useState([])


  if(!isLoaded) {
    return (<div>Loading...</div>)
  } else {

    return (

      <GoogleMap zoom={10} center={center} mapContainerStyle={{ width: '100%', height: '100%'}}>
         <MarkerF position={center}/>
      </GoogleMap>
    );

  }
}


