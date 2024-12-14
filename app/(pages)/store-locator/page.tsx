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

const Locator = () => {
  const [mapData, setMapData] = useState<any>(data);
  const [cityObj, setCityObj] = useState<any>({});
  const [showrooms, setShowrooms] = useState<any>([]);
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

  const stateWatcher = watch("state");
  const cityWatcher = watch("city");

  const obj = mapData["cityStateMap"];
  const stateKeys = Object.keys(obj);
  const stateOptions =
    stateKeys &&
    stateKeys.map((key: any) => ({
      label: key,
      value: key,
    }));

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

  const cityOptions = useMemo(() => {
    return city?.[0]?.map((key: any) => ({
      label: key,
      value: key,
    }));
  }, [city]);

  useEffect(() => {
    if (cityWatcher) {
      const data = cityObj[cityWatcher?.value];
      setShowrooms(data || []);
    }
  }, [cityWatcher]);

  useEffect(() => {
    if (showrooms.length !== 0) {
      const locationData = showrooms.map((showroom: any, index: any) => ({
        id: index + 1,
        name: showroom.name,
        lat: Number(showroom.latitude),
        lng: Number(showroom.longitude),
      }));

      setStoreLocations(locationData);

      // Set map center to the first showroom's location
      setMapCenter({
        lat: locationData[0]?.lat || mapCenter.lat,
        lng: locationData[0]?.lng || mapCenter.lng,
      });
    }
  }, [showrooms]);

  useEffect(() => {
    if (stateWatcher) {
      setValue("city", ""); // Reset city when state changes
      setShowrooms([]);
      setStoreLocations([]);
      setMapCenter({
        lat: 19.076,
        lng: 72.8777,
      });
    }
  }, [stateWatcher]);

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

  return (
    <div className="locator">
      <Header title="Store Locator" />
      <div className="locator_content locator_content-place">
        <div className="locator_content-left">
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
          {showrooms.length > 0 && (
            <div className="locator_content-left-bottom">
              <p className="locator_content-left-bottom-result">
                {showrooms.length} results
              </p>
              {showrooms.map((showroom: any) => (
                <div
                  key={showroom.latitude}
                  className="locator_content-left-bottom-card"
                >
                  <h2>{showroom.name}</h2>
                  <p>{showroom.averageRating} Rating</p>
                  <p>
                    <span>Open</span>, closes at{" "}
                    {showroom.dealerOperationHours.mondayCloseTime} |{" "}
                    <Phone height={13} color="white" />
                    {showroom.phoneNumber}{" "}
                  </p>
                  <p>
                    {showroom.address}, {showroom.city}, {showroom.state} -{" "}
                    {showroom.pincode}
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
