export const emailRegex = /^\S+@\S+\.\S+$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/;

export const specialCharacterNotAllowed = /^[a-zA-Z0-9]*$/;
export const onlyNumbersAllowed = /^[0-9]$/;

export const stateCapitals: any = {
  AndhraPradesh: { lat: 15.9129, lng: 79.74 }, // Amaravati
  ArunachalPradesh: { lat: 27.102, lng: 93.692 }, // Itanagar
  Assam: { lat: 26.2006, lng: 92.9376 }, // Dispur
  Bihar: { lat: 25.6093, lng: 85.1238 }, // Patna
  Chhattisgarh: { lat: 21.2514, lng: 81.6296 }, // Raipur
  Goa: { lat: 15.4909, lng: 73.8278 }, // Panaji
  Gujarat: { lat: 23.0225, lng: 72.5714 }, // Gandhinagar
  Haryana: { lat: 28.4595, lng: 77.0266 }, // Chandigarh (shared with Punjab)
  HimachalPradesh: { lat: 31.1048, lng: 77.1734 }, // Shimla
  Jharkhand: { lat: 23.6102, lng: 85.2799 }, // Ranchi
  Karnataka: { lat: 12.9716, lng: 77.5946 }, // Bengaluru
  Kerala: { lat: 8.5241, lng: 76.9366 }, // Thiruvananthapuram
  MadhyaPradesh: { lat: 23.2599, lng: 77.4126 }, // Bhopal
  Maharashtra: { lat: 19.076, lng: 72.8777 }, // Mumbai
  Manipur: { lat: 24.817, lng: 93.9368 }, // Imphal
  Meghalaya: { lat: 25.5788, lng: 91.8933 }, // Shillong
  Mizoram: { lat: 23.1645, lng: 92.9376 }, // Aizawl
  Nagaland: { lat: 25.6751, lng: 94.1086 }, // Kohima
  Odisha: { lat: 20.2961, lng: 85.8245 }, // Bhubaneswar
  Punjab: { lat: 30.7333, lng: 76.7794 }, // Chandigarh (shared with Haryana)
  Rajasthan: { lat: 26.9124, lng: 75.7873 }, // Jaipur
  Sikkim: { lat: 27.3306, lng: 88.612 }, // Gangtok
  TamilNadu: { lat: 13.0827, lng: 80.2707 }, // Chennai
  Telangana: { lat: 17.385, lng: 78.4867 }, // Hyderabad
  Tripura: { lat: 23.8315, lng: 91.2868 }, // Agartala
  UttarPradesh: { lat: 26.8467, lng: 80.9462 }, // Lucknow
  Uttarakhand: { lat: 30.0668, lng: 79.0193 }, // Dehradun
  WestBengal: { lat: 22.5726, lng: 88.3639 }, // Kolkata
  // Union Territories
  AndamanAndNicobarIslands: { lat: 11.667, lng: 92.7354 }, // Port Blair
  Chandigarh: { lat: 30.7333, lng: 76.7794 }, // Chandigarh
  DadraAndNagarHaveliAndDamanAndDiu: { lat: 20.3974, lng: 72.8328 }, // Daman
  Delhi: { lat: 28.7041, lng: 77.1025 }, // Delhi
  JammuAndKashmir: { lat: 34.0837, lng: 74.7973 }, // Srinagar (Summer), Jammu (Winter)
  Ladakh: { lat: 34.1526, lng: 77.577 }, // Leh
  Lakshadweep: { lat: 10.5667, lng: 72.6417 }, // Kavaratti
  Puducherry: { lat: 11.9416, lng: 79.8083 }, // Puducherry
};
