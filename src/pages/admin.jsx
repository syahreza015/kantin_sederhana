import React, { useState } from "react";
import def from "../assets/default.png";
import { useEffect } from "react";
import axios from "axios";
import "../output.css";
import "./style.css";
import { DATA_URL } from "../conf";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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
            <img src={`/images/${dt.img}`} alt="" />
          </div>
          <div className="desc-kantin py-2">
            <button
              className="mx-auto bg-red-600 rounded-md px-3 py-1 hover:bg-red-700 hover:text-white "
              onClick={() => {
                const postData = () => {
                  axios
                    .post(DATA_URL + "kantin/delete", {
                      id: dt.id,
                    })
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                };
                const newData = data.filter((dat) => dt.id != dat.id);
                setData(newData);
                postData();
              }}
            >
              Ban
            </button>
          </div>
        </div>
      );
    });
  };
  return (
    <main>
      <section>
        <div className="section-container my-4 flex flex-col gap-5">
          <div className="title w-1/2 mx-auto bg-slate-300 bg-opacity-40 font-bold rounded-xl text-center py-3">
            HALAMAN ADMIN
          </div>
          <div className="document-container container-90 mx-auto bg-white bg-opacity-40 rounded-xl py-3 flex flex-col gap-3">
            <div className="document-title w-1/2 mx-auto bg-slate-700 text-white text-center py-2 rounded-xl">
              KANTIN TERDAFTAR
            </div>
            <button
              className=" w-28 mx-auto rounded-lg p-2 bg-green-600 text-center hover:bg-green-800 hover:text-white"
              onClick={() => {
                navigate("/tambahWarung");
              }}
            >
              TAMBAH+
            </button>
            <div className="box-container flex flex-wrap justify-center gap-5">
              <ListKantin />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
