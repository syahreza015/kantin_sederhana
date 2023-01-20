import React, { useEffect, useState } from "react";
import def from "../assets/default.png";
import "./style.css";
import "../output.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MenuKantin } from "../components/menuKantin";
import { Menu } from "../components/list";
import { DATA_URL } from "../conf";

export const Edit = () => {
  const navigate = useNavigate();
  const idHal = useParams();
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  useEffect(() => {
    const getData = async () => {
      axios
        .post(DATA_URL + "menu/get", {
          id: idHal,
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  const ListItem = () => {
    return data.map((dt) => {
      return (
        <div
          className="box-kantin text-center flex flex-col px-1 py-2"
          key={dt.id}
        >
          <div className="title-kantin py">
            <p>{dt.nama}</p>
          </div>
          <div className="image-kantin">
            <img src={def} alt="" />
          </div>
          <div className="desc-kantin py-2 flex flex-col justify-center align-middle gap-4">
            <p>{dt.harga}</p>
          </div>
          <button
            className="bg-red-600 rounded-md mx-auto p-2 hover:bg-red-700 hover:text-white"
            onClick={() => {
              console.log(dt.id);
            }}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <main className="main-full">
      <section>
        <div className="container-section w-full flex flex-col gap-5">
          <div className="title w-1/2 mx-auto bg-slate-300 text-center bg-opacity-40 p-3 text-lg font-bold">
            EDIT
          </div>
          <div className="container-doc w-full bg-slate-300 bg-opacity-40 p-4 flex flex-col align-center justify-center gap-5">
            <div className="container flex flex-wrap gap-5 justify-center">
              <ListItem />
            </div>
            <div className="button-container mt-10 py-4 bg-white w-1/2 flex justify-center align-middle rounded-xl mx-auto">
              <button
                className="bg-blue-600 rounded-md mx-auto py-2 px-4 w-20 hover:bg-blue-700 hover:text-white"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
