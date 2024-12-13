// import { specialCharacterNotAllowed, onlyNumbersAllowed } from "./utils";

export const nameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
export const emailRegex = /^\S+@\S+\.\S+$/;
// export const emailRegex =
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const mobileRegex = /^[6-9]\d{9}$/;
export const specialCharacterNotAllowed = /^[a-zA-Z0-9]*$/;
export const onlyNumbersAllowed = /^[0-9]$/;
export const allowedAll = /^[a-zA-Z0-9!@#$%^&*()_+=[\]{}|\\;:'",.<>?/`~\- ]*$/;

export const handleNoSpecial = (event: any) => {
  if (!specialCharacterNotAllowed.test(event.key) && event.key !== " ") {
    event.preventDefault(); // Prevents the key from being entered
  }
};

export const handleAllowAll = (event: any) => {
  if (!allowedAll.test(event.key) && event.key !== " ") {
    event.preventDefault(); // Prevents the key from being entered
  }
};

export const handleOnlyNumbers = (event: any) => {
  // Allow only numeric characters and control keys

  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"];
  if (!onlyNumbersAllowed.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
};
