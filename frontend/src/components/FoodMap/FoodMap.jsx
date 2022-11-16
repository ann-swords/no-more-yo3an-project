import { GoogleMap, useLoadScript, MarkerF, Marker } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { Combobox } from '@headlessui/react'

export default function FoodMap(props) {
  const center = useMemo(() => ({ lat: 26.0667, lng: 50.5577 }), []);
  // const [selected, setSelected] = useState(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries: ["places"],
  });

  // add single marker
  // const [markers, setMarkers] = useState([])
  // console.log('selected', selected)
  // debugger

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="places-container">
            <PlacesAutocomplete setSelected={props.setSelected} />
        </div>

        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
            {props.selected && <Marker position={props.selected}></Marker>}
        </GoogleMap>
      </>
    );
  }
}


const PlacesAutocomplete = ({ setSelected}) => {
    const {
        ready,//Ready to go to load google script
        value, //for the user who typed in the input box
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete();
    // console.log('setValue', value)
    // debugger;

    //----- A function that convertes the address to lang and lut--------------
    //val: A string that represents the address the user selected.
    const handleSelect = async  (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({address});
        console.log(results);
        const {lat, lng} = await getLatLng(results[0]);
        setSelected({lat, lng});
        // console.log("selected",selected)
    }

    //Call axios here 

    return (
    <Combobox onChange={handleSelect}>
        <Combobox.Input value={value} onChange={e =>setValue(e.target.value)} disabled={!ready} placeholder={"Search an address"} />
        <Combobox.Options>
          {
            data.map(item => 
          <ul>
              <Combobox.Option key={item.place_id}  value={item.description}><li>{item.description}</li></Combobox.Option>
          </ul>
          )}
        </Combobox.Options>
    </Combobox>
    )

}

