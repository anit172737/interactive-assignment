"use client";

import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { outfit } from "../../fonts/font";

const mapContainerStyle = {
  width: "580px",
  height: "530px",
  borderRadius: "10px",
};

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
              <div className={`${outfit.className} locator_content-right-info`}>
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
