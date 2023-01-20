import def from "../assets/default.png";
import "../pages/style.css";
import "../output.css";
import { useEffect, useState } from "react";

export const ListPesan = (props) => {
  return props.data.map((dt) => {
    return (
      <span className="barang bg-slate-700" key={dt.id}>
        {dt.nama} <br />
        {dt.harga}
        <span>
          <button
            className="bg-red-600 rounded-md px-3 py-1 hover:bg-red-500"
            onClick={() => {
              props.onDelete(dt.id);
            }}
          >
            Cancel
          </button>
        </span>
      </span>
    );
  });
};
