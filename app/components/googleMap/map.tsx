"use client";

import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "500px",
  height: "500px",
};

// const center = {
//   lat: 19.076, // Mumbai Latitude
//   lng: 72.8777, // Mumbai Longitude
// };

// const storeLocations = [
//   { id: 1, name: "Store 1", lat: 19.049, lng: 72.8777 },
//   { id: 2, name: "Store 2", lat: 19.07, lng: 72.8777 },
//   { id: 3, name: "Store 3", lat: 19.016, lng: 72.8777 },
// ];

interface locationData {
  storeLocations: any;
  center: any;
}
const Map = ({ storeLocations, center }: locationData) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBbDv_cdmNkb7H9lN9CEMLJzTi0dhsX8a8", // Replace with your Google Maps API key
  });

  const [selectedStore, setSelectedStore] = useState<any>(null);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;
  console.log("storeLocations", storeLocations);
  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={{ disableDefaultUI: true }}
      >
        {storeLocations.length !== 0 &&
          storeLocations?.map((store: any) => (
            <Marker
              key={store.id}
              position={{ lat: store.lat, lng: store.lng }}
              onClick={() => setSelectedStore(store)}
            />
          ))}

        {storeLocations.length !== 0 &&
          selectedStore &&
          selectedStore.lat != null &&
          selectedStore.lng != null && (
            <InfoWindow
              position={{
                lat: Number(selectedStore.lat),
                lng: Number(selectedStore.lng),
              }}
              onCloseClick={() => setSelectedStore(null)}
            >
              <div>
                <h3>{selectedStore?.name}</h3>
                <p>Latitude: {selectedStore?.lat}</p>
                <p>Longitude: {selectedStore?.lng}</p>
              </div>
            </InfoWindow>
          )}
      </GoogleMap>
    </>
  );
};

export default Map;
