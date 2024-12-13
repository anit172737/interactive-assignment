import { Map, Grid } from "react-feather";

export const Menu = [
  {
    url: "/",
    icon: <Map size={20} />,
    navName: "Store Locator",
    dropdown: false,
  },
  {
    url: "/user-form",
    icon: <Grid size={20} />,
    navName: "User Form",
    dropdown: false,
  },
];
