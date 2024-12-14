export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "38px",
    height: "42px",
    fontSize: "16px",
    marginTop: "2px",
    border: "2px solid #a300f1",
    width: "280px",
    cursor: "pointer",
    outline: "none",
    backgroundColor: "transparent", // Set background color to #270936
    color: "white", // Set text color to white
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: "38px", // Adjusts the container for the selected value
    padding: "0 6px",
    fontSize: "16px",
    color: "white", // Adjusts padding to fit the height
  }),
  input: (provided: any) => ({
    ...provided,
    margin: "0px",
    padding: "0px",
    fontSize: "16px",
    color: "white", // Adjusts input padding to fit within the height
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "38px",
    color: "white", // Aligns indicators (e.g., dropdown arrow) with the new height
  }),
  menu: (provided: any) => ({
    ...provided,
    width: "280px",
    backgroundColor: "#270936",
    fontSize: "16px", // Set dropdown menu background to #270936
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontSize: "16px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#a300f1" // Background color for the selected option
      : state.isFocused
      ? "#400060" // Background color for focused (but not selected) option
      : "#270936", // Default background color, // Highlight focused option
    color: "white", // Set option text color to white
    cursor: "pointer",
    width: "280px",
  }),
};
