"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { outfit } from "../../fonts/font";

interface locationData {
  storeLocations: any;
  center: any;
}
const Map = ({ storeLocations, center }: locationData) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBbDv_cdmNkb7H9lN9CEMLJzTi0dhsX8a8",
  });

  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [mapStyle, setMapStyle] = useState({
    width: "580px",
    height: "530px",
    borderRadius: "10px",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1500) {
        setMapStyle({
          width: "700px",
          height: "530px",
          borderRadius: "10px",
        });
      } else if (window.innerWidth <= 1100) {
        setMapStyle({
          width: "580px",
          height: "530px",
          borderRadius: "10px",
        });
      } else {
        setMapStyle({
          width: "580px",
          height: "530px",
          borderRadius: "10px",
        });
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;
  return (
    <>
      <GoogleMap
        mapContainerStyle={mapStyle}
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
