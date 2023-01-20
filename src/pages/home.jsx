import React, { useEffect, useState } from "react";
import def from "../assets/default.png";
import { createSearchParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { DATA_URL } from "../conf";
import "../output.css";
import "./style.css";

export const Home = () => {
  const [menu, setMenu] = useState([]);
  const [data, setData] = useState([]);
  const [kantin, setKantin] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      axios
        .get(DATA_URL + "kantin")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
  }, []);

  const ListKantin = () => {
    return data.map((dt) => {
      return (
        <div className="box-kantin py-2" key={dt.id}>
          <div className="title-kantin py">
            <p>{dt.nama}</p>
          </div>
          <div className="image-kantin">
            <img src={`/images/${dt.img}`} alt="" className="image" />
          </div>
          <div className="desc-kantin py-2">
            <button
              className="mx-auto bg-slate-400 rounded-md px-3 py-1 hover:bg-slate-600"
              onClick={() => {
                axios
                  .post(DATA_URL + "visit/kantin", {
                    id: dt.id,
                  })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                navigate("/" + dt.id);
                setKantin(dt.id);
              }}
            >
              Visit
            </button>
          </div>
        </div>
      );
    });
  };
  return (
    <main className="mt-6 mb-11 w-full flex flex-col align-middle gap-1">
      <section
        className="section1 w-full flex flex-col gap-5 align-middle"
        id="section1"
      >
        <div className="title w-1/2 text-center mx-auto bg-transparent font-bold text-xl font-serif">
          <h2 className="bg-white rounded-md bg-opacity-40" id="list">
            LIST KANTIN TERDAFTAR
          </h2>
        </div>
        <div className="container-kantin flex flex-wrap gap-3 h-50">
          <ListKantin />
        </div>
      </section>
      {/* section2 */}
    </main>
  );
};
