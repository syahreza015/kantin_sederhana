import React from "react";
import "../pages/style.css";
import "../output.css";

export const MenuKantin = () => {
  return (
    <div className="container-kantin bg-white rounded-md bg-opacity-40 px-5 py-4 flex flex-col gap-5 align-middle flex-wrap justify-center">
      <div className="boc-container w-full flex flex-col gap-5 justify-center align-middle bg-stone-50 rounded-xl px-4 py-3 flex-wrap">
        <div className="button flex gap-2 flex-col justify-center align-middle">
          <div className="container flex justify-center flex-wrap gap-4">
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};
