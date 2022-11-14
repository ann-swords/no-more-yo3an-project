import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Maps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  if(!isLoaded) return (<div>Loading...</div>)
  return <Map/>;
}

function Map(){
return(
  <div className="map-container">
    <GoogleMap zoom={10} center={{lat: 26.0667, lng: 50.5577}}>
    </GoogleMap>
  </div>
)
}


