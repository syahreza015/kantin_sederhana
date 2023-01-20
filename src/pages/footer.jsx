import React from "react";
import "../output.css";
import "./style.css";

export const Foot = () => {
  return (
    <footer className="w-full mt-auto">
      <div className="footer-container w-full flex justify-between align-middle px-5 py-3">
        <div className="container-30 flex justify-center text-center">
          <h4 className="bg-white bg-opacity-25 rounded-xl px-5 py-4 footer-value">
            CopyRighted <br /> @2022 Syahreza
          </h4>
        </div>
        <div className="container-60 text-end">
          <h4 className="bg-white bg-opacity-25 rounded-xl px-5 py-4 footer-value">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
            eaque. Incidunt possimus rem voluptates adipisci nihil? Cupiditate
            assumenda eveniet quibusdam consectetur non, commodi magnam repellat
            nemo aperiam tenetur illum eligendi!
          </h4>
        </div>
      </div>
    </footer>
  );
};
