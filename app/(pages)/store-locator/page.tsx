"use client";

import React, { useEffect, useMemo, useState } from "react";
import "../../sass/pages/locator.scss";
import Header from "../../components/commonHeader/header";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "@/app/styles/selectStyle";
import data from "../../components/locatorData/re.json";
import { Phone } from "react-feather";
import Map from "@/app/components/googleMap/map";
import { stateCapitals } from "@/app/utils/utils";
import { isShopOpen, isTodaySunday } from "@/app/utils/helperFunctions";

const Locator = () => {
  const [mapData, setMapData] = useState<any>(data);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [cityObj, setCityObj] = useState<any>({});
  const [stores, setStores] = useState<any>([]);
  const [storeLocations, setStoreLocations] = useState<any>([]);
  const [mapCenter, setMapCenter] = useState<any>({
    lat: 19.076,
    lng: 72.8777,
  }); // Mumbai coordinates as default center

  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  //watchers
  const stateWatcher = watch("state");
  const cityWatcher = watch("city");

  //cityStateMap
  const obj = mapData["cityStateMap"];
  //keys of cityStateMap
  const stateKeys = Object.keys(obj);
  //state options
  const stateOptions =
    stateKeys &&
    stateKeys.map((key: any) => ({
      label: key,
      value: key,
    }));

  //array of city names and city values
  const city = useMemo(() => {
    if (stateWatcher) {
      const objForState = obj[stateWatcher?.value];
      setCityObj(objForState || {});
      if (objForState) {
        return [Object.keys(objForState), Object.values(objForState)];
      }
    }
    return [];
  }, [stateWatcher]);

  //city options
  const cityOptions = useMemo(() => {
    return city?.[0]?.map((key: any) => ({
      label: key,
      value: key,
    }));
  }, [city]);

  //fieldArray for form
  const fieldArray: any = [
    {
      name: "state",
      title: "Select State",
      options: stateOptions || [],
    },
    {
      name: "city",
      title: "Select City",
      options: cityOptions || [],
    },
  ];

  //remove duplicate values from locations
  const getUniqueLocations = (locations: any[]) => {
    const uniqueLocations = locations.reduce((acc: any[], current) => {
      const isDuplicate = acc.some(
        (item) =>
          item.latitude === current.latitude &&
          item.longitude === current.longitude
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueLocations;
  };

  //Set stores after city change
  useEffect(() => {
    if (cityWatcher) {
      const data = cityObj[cityWatcher?.value];
      const uniqueData = data?.length > 1 ? getUniqueLocations(data) : data;
      setStores(uniqueData || []); // Always reset stores to new data or empty array
    } else {
      setStores([]); // Clear stores if no city is selected
    }
  }, [cityWatcher, cityObj]);

  //Set store locations and map center
  useEffect(() => {
    if (stores.length !== 0) {
      const locationData = stores.map((store: any, index: any) => ({
        id: index + 1,
        name: store.name,
        lat: Number(store.latitude),
        lng: Number(store.longitude),
      }));

      setStoreLocations(locationData);

      // Set map center to the first store's location
      setMapCenter({
        lat: locationData[0]?.lat || mapCenter.lat,
        lng: locationData[0]?.lng || mapCenter.lng,
      });
    }
  }, [stores]);

  //update values on state change
  useEffect(() => {
    if (stateWatcher) {
      setValue("city", ""); // Reset city when state changes
      setStores([]); // Clear stores
      setStoreLocations([]); // Clear map locations
      //  Dynamically set map center based on selected state
      const selectedState = stateWatcher.value.replace(/\s+/g, "");
      const capitalCoordinates = stateCapitals[selectedState];
      if (capitalCoordinates) {
        setMapCenter(capitalCoordinates);
      } else {
        // Default to Mumbai if the state is not in the mapping
        setMapCenter({ lat: 19.076, lng: 72.8777 });
      }
    }
  }, [stateWatcher]);

  //prevent pre-rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="locator">
      <Header title="Store Locator" />
      <div className="locator_content locator_content-place">
        <div className="locator_content-left">
          {isClient ? (
            <div className="locator_content-left-top">
              {fieldArray.map((item: any) => (
                <div key={item.name} className="profit-top-select">
                  <label htmlFor={item.name}>{item.title} :</label>
                  <Controller
                    name={item.name}
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Select
                        styles={customStyles}
                        options={item.options}
                        {...field}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          ) : (
            "Loading states and cities..."
          )}

          {stores.length > 0 && (
            <div className="locator_content-left-bottom">
              <p className="locator_content-left-bottom-result">
                {stores.length} {stores.length < 2 ? "result" : "results"}
              </p>
              {stores.map((store: any, index: number) => (
                <div key={index} className="locator_content-left-bottom-card">
                  <h2>{store.name}</h2>
                  <p>{store.averageRating} Rating</p>
                  <p>
                    <span>
                      {isTodaySunday() ||
                      !isShopOpen(
                        store.dealerOperationHours.mondayOpenTime,
                        store.dealerOperationHours.mondayCloseTime
                      )
                        ? "Close "
                        : "Open"}
                    </span>
                    {isTodaySunday()
                      ? ""
                      : ", closes at " +
                        store.dealerOperationHours.mondayCloseTime +
                        " "}
                    | <Phone height={13} color="white" />
                    {store.phoneNumber}{" "}
                  </p>
                  <p>
                    {store.address}, {store.city}, {store.state} -{" "}
                    {store.pincode}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="locator_content-right">
          <Map storeLocations={storeLocations} center={mapCenter} />
        </div>
      </div>
    </div>
  );
};

export default Locator;
