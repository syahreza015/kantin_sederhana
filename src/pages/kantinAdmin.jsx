import React, { useEffect, useState } from "react";
import def from "../assets/default.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import "../output.css";
import { DATA_URL } from "../conf";
import axios from "axios";

export const AdminKantin = () => {
  const idHal = useParams();
  const [no, setNo] = useState(idHal.id);
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  const [pesan, setPesan] = useState([]);
  const [id, setId] = useState("hidden");

  useEffect(() => {
    const getData = async () => {
      axios
        .post(DATA_URL + "kantin/get", {
          id: no,
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getMenu = async () => {
      axios
        .post(DATA_URL + "menu", {
          id: no,
        })
        .then((res) => {
          setMenu(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getPesan = () => {
      axios
        .post(DATA_URL + "pesan", {
          id: no,
        })
        .then((res) => {
          setPesan(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
    getMenu();
    getPesan();
  }, []);

  const ListPesan = () => {
    return pesan.map((dt) => {
      return (
        <div className="container p-3 bg-white bg-opacity-60 rounded-lg flex justify-between">
          <ul key={dt.id}>
            <li>pesanan : {dt.menu}</li>
            <li>harga : {dt.harga}</li>
            <li>pemesan : {dt.nama}</li>
            <li>lokasi : {dt.lokasi}</li>
          </ul>
          <button
            className="bg-blue-500 w-1/4 button hover:bg-blue-600 rounded-md"
            onClick={() => {
              const idPesan = dt.id;
              const pesanBaru = pesan.filter((pes) => pes.id != dt.id);
              const postPesan = () => {
                axios
                  .post(DATA_URL + "ok", {
                    id: idPesan,
                  })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              };
              postPesan();
              setPesan(pesanBaru);
            }}
          >
            Okey
          </button>
        </div>
      );
    });
  };

  const Menu = () => {
    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState("");
    return menu.map((dt) => {
      return (
        <div className="box-kantin text-center py-2" key={dt.id}>
          <div className="title-kantin py">
            <p>{dt.nama}</p>
            <input
              type="text"
              id={id}
              onChange={(e) => {
                setNama(e.target.value);
              }}
            />
          </div>
          <div className="image-kantin">
            <img src={`/images/${dt.img}`} alt="" />
          </div>
          <div className="desc-kantin py-2 flex flex-col justify-center align-middle gap-4">
            <p>{dt.harga}</p>
            <input
              type="text"
              id={id}
              onChange={(e) => {
                setHarga(e.target.value);
              }}
            />
          </div>
          <div className="button-container flex justify-center gap-2">
            <button
              className="action-button bg-red-600 rounded-md mx-auto p-2 hover:bg-red-700 hover:text-white"
              onClick={() => {
                const deleteData = async () => {
                  axios
                    .post(DATA_URL + "menu/delete", {
                      id: dt.id,
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                };
                const newData = menu.filter((dat) => dat.id !== dt.id);
                setMenu(newData);
                deleteData();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  return data.map((dt) => {
    return (
      <main key={dt.id}>
        <section className="my-5">
          <div className="section-container">
            <div className="title-container w-3/4 mx-auto text-center font-bold text-xl font-serif mb-4">
              <div className="title bg-white rounded-md bg-opacity-40 px-5 py-4">
                <h2 className="mb-3 bg-orange-400 rounded-md bg-opacity-80 ">
                  {dt.nama}
                </h2>
                <img
                  src={`/images/${dt.img}`}
                  alt="warung"
                  className=" w-44 rounded-xl mx-auto mb-3"
                />
                <div className="more-container flex flex-col gap-4">
                  <span className="w-1/3 bg-slate-700 text-white text-center py-2 rounded-xl mx-auto">
                    <ul>
                      <li>
                        <span>Pemilik : {dt.pemilik}</span>
                      </li>
                      <li>
                        <span>Lokasi : {dt.lokasi}</span>
                      </li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>
            <div className="document-container">
              <div className="menu-title w-1/2 mx-auto text-center font-bold text-xl font-serif mb-4">
                <h2 className="bg-white rounded-md bg-opacity-40">MENU</h2>
              </div>
              <div className="subtitle w-1/4 mx-auto bg-slate-400 rounded-md py-2 flex justify-center mb-4">
                <button
                  className="bg-green-600 rounded-md bg-opacity-80 px-4 py-1 width-300 hover:bg-green-400 hover:bg-opacity-80 text-center"
                  onClick={() => {
                    navigate("/tambah/" + no);
                  }}
                >
                  <p>Tambah</p>
                </button>
              </div>
              <div className="container-kantin bg-white rounded-md bg-opacity-40 px-5 py-4 flex flex-col gap-5 align-middle flex-wrap justify-center">
                <div className="boc-container w-full flex flex-col gap-5 justify-center align-middle bg-stone-50 rounded-xl px-4 py-3 flex-wrap">
                  <div className="button flex gap-2 flex-col justify-center align-middle">
                    <div className="container flex justify-center flex-wrap gap-4">
                      <Menu menu={menu} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-5 container-kantin bg-white rounded-md bg-opacity-40 px-5 py-4 flex flex-col-reverse gap-5 align-middle flex-wrap justify-center">
          <ListPesan />
        </section>
      </main>
    );
  });
};
