import { Map, Grid, Home } from "react-feather";

export const Menu = [
  {
    url: "/",
    icon: <Home size={20} />,
    navName: "Home",
    dropdown: false,
  },
  {
    url: "/store-locator",
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
