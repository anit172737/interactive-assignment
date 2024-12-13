import React from "react";
import "../../sass/components/header.scss";

interface commonHeaderProps {
  title: string;
}
const Header = ({ title }: commonHeaderProps) => {
  return (
    <div className="commonHeader">
      <div className="commonHeader_top">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Header;
