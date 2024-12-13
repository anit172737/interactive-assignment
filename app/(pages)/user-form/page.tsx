"use client";

import Header from "@/app/components/commonHeader/header";
import React from "react";
import "../../sass/pages/userForm.scss";
import { useForm } from "react-hook-form";
import { outfit } from "@/app/fonts/font";
import {
  handleNoSpecial,
  handleOnlyNumbers,
  emailRegex,
  mobileRegex,
  handleAllowAll,
  nameRegex,
} from "@/app/utils/helperFunctions";

// const customStyles = {
//   control: (provided: any) => ({
//     ...provided,
//     minHeight: "38px",
//     height: "38px",
//     fontSize: "13px",
//     backgroundColor: "#270936", // Set background color to #270936
//     color: "white", // Set text color to white
//     border: "none", // Sets the overall height
//   }),
//   valueContainer: (provided: any) => ({
//     ...provided,
//     height: "38px", // Adjusts the container for the selected value
//     padding: "0 6px",
//     fontSize: "13px",
//     color: "white", // Adjusts padding to fit the height
//   }),
//   input: (provided: any) => ({
//     ...provided,
//     margin: "0px",
//     padding: "0px",
//     fontSize: "13px",
//     color: "white",
//     // Adjusts input padding to fit within the height
//   }),
//   indicatorsContainer: (provided: any) => ({
//     ...provided,
//     height: "38px",
//     color: "white", // Aligns indicators (e.g., dropdown arrow) with the new height
//   }),
//   menu: (provided: any) => ({
//     ...provided,
//     backgroundColor: "#270936",
//     fontSize: "13px", // Set dropdown menu background to #270936
//   }),
//   singleValue: (provided: any) => ({
//     ...provided,
//     fontSize: "13px",
//     fontWeight: "500",
//     color: "white",
//   }),
//   placeholder: (provided: any) => ({
//     ...provided,
//     fontSize: "13px",
//   }),
//   option: (provided: any, state: any) => ({
//     ...provided,
//     backgroundColor: state.isSelected
//       ? "#a300f1" // Background color for the selected option
//       : state.isFocused
//       ? "#400060" // Background color for focused (but not selected) option
//       : "#270936", // Default background color // Highlight focused option
//     color: "white", // Set option text color to white
//     cursor: "pointer",
//   }),
// };

const UserForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const fieldArray = [
    {
      name: "name",
      title: "Name",
      placeholder: "name",
      type: "allowAll",
      inputType: "input",
      required: true,
      pattern: { value: nameRegex, message: "Enter valid name." },
    },
    {
      name: "email",
      title: "Email ID",
      placeholder: "email",
      type: "allowAll",
      inputType: "input",
      required: true,
      pattern: { value: emailRegex, message: "Enter valid email ID." },
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      placeholder: "number",
      type: "OnlyNumbers",
      inputType: "input",
      required: true,
      pattern: { value: mobileRegex, message: "Enter valid phone number." },
    },
    {
      name: "message",
      title: "Message",
      placeholder: "message",
      type: "NoSpecial",
      inputType: "textArea",
      required: false,
    },
  ];
  const onSubmit = async (data: any) => {
    const { name, email, phoneNumber, message } = data;
    const string = `Name : ${name.trim()},\nEmail : ${email.trim()},\nPhone Number : ${phoneNumber.trim()}${
      message ? `,\nMessage : ${message.trim()}` : ""
    }`;
    await alert(string);

    setValue("name", "");
    setValue("email", "");
    setValue("phoneNumber", "");
    setValue("message", "");
  };

  return (
    <div className="userForm">
      <Header title="User Form" />
      <div className="userForm-content">
        <form
          className="userForm-content-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {fieldArray.map((field: any) => {
            return (
              <div key={field.name} className="userForm-content-form-field">
                {/* {field.inputType === "input" ? ( */}
                <>
                  <label htmlFor={field.name}>
                    {field.title}
                    {field.required && <span>*</span>}
                  </label>
                  {field.inputType === "textArea" ? (
                    <textarea
                      className={`${outfit.className}`}
                      {...register(field.name, {
                        required: {
                          value: field.required ? true : false,
                          message: "This field is required.",
                        },
                        // pattern: { value: field.pattern.value, message: "" },
                      })}
                      placeholder={`Enter ${field.placeholder}`}
                    ></textarea>
                  ) : (
                    <input
                      className={`${outfit.className}`}
                      {...register(field.name, {
                        required: {
                          value: field.required ? true : false,
                          message: "This field is required.",
                        },
                        pattern: field.pattern && {
                          value: field.pattern.value,
                          message: field.pattern.message,
                        },
                      })}
                      placeholder={`Enter ${field.placeholder}`}
                      autoFocus={field.name === "name" ? true : false}
                      // onKeyDown={
                      //   field.type === "allowAll"
                      //     ? handleAllowAll
                      //     : handleOnlyNumbers
                      // }
                    />
                  )}
                </>
                {/* )  */}

                {errors[field.name] && (
                  <p style={{ color: "orange" }}>
                    <>{errors[field.name]?.message as unknown}</>
                  </p>
                )}
              </div>
            );
          })}
          <div className="userForm-content-footer">
            <button
              className="userForm-content-footer-btn userForm-content-footer-btn-submit"
              type="submit"
            >
              Submit
            </button>
            <button
              className="userForm-content-footer-btn userForm-content-footer-btn-cancel"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
