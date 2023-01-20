import React, { useEffect, useState } from "react";
import def from "../assets/default.png";
import "../pages/style.css";
import "../output.css";

export const Menu = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.menu);
  }, []);
  return data.map((dt) => {
    return (
      <div className="box-kantin text-center" key={dt.id}>
        <div className="title-kantin py">
          <p>{dt.nama}</p>
        </div>
        <div className="image-kantin">
          <img src={def} alt="" />
        </div>
        <div className="desc-kantin py-2 flex flex-col justify-center align-middle gap-4">
          <p>{dt.harga}</p>
        </div>
      </div>
    );
  });
};
