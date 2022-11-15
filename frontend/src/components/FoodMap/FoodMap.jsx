import { GoogleMap, useLoadScript, MarkerF, Marker } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// import {
//   Combobox,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxOptionText,
//   Listbox,
// } from "react-widgets";

import { Combobox } from '@headlessui/react'

export default function FoodMap() {
  const center = useMemo(() => ({ lat: 26.0667, lng: 50.5577 }), []);
  const [selected, setSelected] = useState('')

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries: ["places"],
  });

  // add single marker
  // const [markers, setMarkers] = useState([])

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="places-container">
            <PlacesAutocomplete setSelected={setSelected} />
        </div>

        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
            {selected && <Marker position={selected}></Marker>}
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

    // debugger;


    return (
    <Combobox>
        <Combobox.Input value={value} onChange={e =>setValue(e.target.value)} disabled={!ready} placeholder={"Search an address"} />
    
            <Combobox.Options>
            {
             data.map(item => 
            <Combobox.Option key={item.place_id}  value={item.description}>{item.description}</Combobox.Option>
            )}
            </Combobox.Options>


    </Combobox>


    )

}

