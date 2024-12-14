"use client";

import React, { useEffect, useMemo, useState } from "react";
import "../../sass/pages/locator.scss";
import Header from "../../components/commonHeader/header";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "@/app/styles/selectStyle";
import data from "../../components/locatorData/re.json";
import { Phone } from "react-feather";

const Locator = () => {
  const [mapData, setMapData] = useState<any>(data);
  const [cityObj, setCityObj] = useState<any>({}); // Use state to persist cityObj
  const [showrooms, setShowrooms] = useState<any>([]);
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
    stateKeys.map((key: any) => {
      return {
        label: key,
        value: key,
      };
    });

  const city = useMemo(() => {
    if (stateWatcher !== undefined) {
      const objForState = obj[stateWatcher?.value];
      setCityObj(objForState || {}); // Update cityObj state
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

  const cityNames = city?.[0];
  const cityData = city?.[1];

  useEffect(() => {
    if (cityWatcher !== undefined) {
      const data = cityObj[cityWatcher?.value]; // Access cityObj from state
      setShowrooms(data);
    }
  }, [cityWatcher]);

  console.log("showrooms", showrooms);
  const fieldArray: any = [
    {
      name: "state",
      title: "Select State",
      options: stateOptions ? stateOptions : "",
    },
    {
      name: "city",
      title: "Select City",
      options: cityOptions,
    },
  ];

  useEffect(() => {
    if (stateWatcher !== undefined) {
      setValue("city", "");
    }
  }, [stateWatcher]);

  return (
    <div className="locator">
      <Header title="Store Locator" />
      <div className="locator_content locator_content-place">
        <div className="locator_content-left">
          <div className="locator_content-left-top">
            {fieldArray.map((item: any) => {
              return (
                <div key={item.name} className="profit-top-select">
                  <label htmlFor={item.name}>{item.title} :</label>
                  <Controller
                    name={item.name}
                    control={control}
                    // defaultValue={null}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          styles={customStyles}
                          options={item.options}
                          {...field}
                          //   defaultValue={{ label: "All", value: "" }}
                        />
                      </>
                    )}
                  />
                </div>
              );
            })}
          </div>
          {showrooms && (
            <div className="locator_content-left-bottom">
              {/* { ( */}
              <p className="locator_content-left-bottom-result">
                {showrooms.length} results
              </p>
              {/* )} */}

              {showrooms.map((showroom: any) => {
                return (
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
                      {showroom.address}, {showroom.city}, {showroom.state} -
                      {showroom.pincode}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="locator_content-right">Map</div>
      </div>
    </div>
  );
};

export default Locator;
