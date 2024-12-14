"use client";

import React from "react";
import "../../sass/pages/locator.scss";
import Header from "../../components/commonHeader/header";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "@/app/styles/selectStyle";

const Locator = () => {
  const {
    watch,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const fieldArray: any = [
    {
      name: "state",
      title: "Select State",
      options: [
        { label: "All", value: "all" },
        { label: "Stock In", value: "in" },
        { label: "Stock Out", value: "out" },
      ],
      // options: productOptions ? productOptions : "",
    },
    {
      name: "city",
      title: "Select City",
      options: [
        { label: "All", value: "all" },
        { label: "Stock In", value: "in" },
        { label: "Stock Out", value: "out" },
      ],
    },
  ];

  const stateWatcher = watch("state");
  const cityWatcher = watch("city");

  console.log("state", stateWatcher);
  console.log("city", cityWatcher);
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
                          defaultValue={{ label: "All", value: "" }}
                        />
                      </>
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="locator_content-right"></div>
      </div>
    </div>
  );
};

export default Locator;
