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

export function isTodaySunday() {
  const today = new Date();
  return today.getDay() === 0; // 0 represents Sunday
}

export function isShopOpen(openTime: any, closeTime: any) {
  const now = new Date();

  // Get the current time in minutes since midnight
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Parse open and close times
  const [openHours, openMinutes] = openTime.split(":").map(Number);
  const openMinutesTotal = openHours * 60 + openMinutes;

  const [closeHours, closeMinutes] = closeTime.split(":").map(Number);
  const closeMinutesTotal = closeHours * 60 + closeMinutes;

  // Check if current time is within open and close times
  return (
    currentMinutes >= openMinutesTotal && currentMinutes <= closeMinutesTotal
  );
}
