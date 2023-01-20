import React, { useEffect, useState } from "react";
import def from "../assets/default.png";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DATA_URL } from "../conf";
import "./style.css";
import "../output.css";
import { ListPesan } from "../components/listMenu";

export const Kantin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [id, setId] = useState("hidden");
  const [belanja, setBelanja] = useState([]);
  const [total, setTotal] = useState(0);
  const no = useParams();
  const [idKantin, setIdKantin] = useState(no.id);
  const [pemesan, setPemesan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [kantin, setKantin] = useState([]);

  const submit = () => {
    const tot = total;
    belanja.map((dat) => {
      const nama = dat.nama;
      const harga = dat.harga;
      const total = tot;

      axios
        .post(DATA_URL + "checkout/submit", {
          menu: nama,
          harga: harga,
          total: total,
          nama: pemesan,
          lokasi: lokasi,
          kantin: idKantin,
        })
        .then((res) => {
          log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const postData = async () => {
    const all = total;
    belanja.map((dat) => {
      const id = dat.id;
      const nama = dat.nama;
      const harga = dat.harga;
      const total = all;

      axios
        .post(DATA_URL + "keranjang/input", {
          id: id,
          nama: nama,
          harga: harga,
          total: total,
          no: idKantin,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const Belanjaan = () => {};

  const ListMenu = () => {
    return data.map((dt) => {
      return (
        <div className="box-kantin" key={dt.id}>
          <div className="title-kantin py">
            <p>{dt.nama}</p>
          </div>
          <div className="image-kantin">
            <img src={`images/${dt.img}`} alt="" />
          </div>
          <div className="desc-kantin py-2 flex flex-col justify-center align-middle gap-4">
            <p>{dt.harga}</p>
            <div className="button flex gap-2 justify-center align-middle">
              <button
                className="bg-green-600 rounded-md px-3 py-1 hover:bg-green-500"
                onClick={() => {
                  setBelanja([...belanja, dt]);
                  setTotal(total + dt.harga);
                }}
              >
                Pesan
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const onDelete = (id) => {
    belanja.map((dt) => {
      setBelanja(belanja.filter((rm) => dt.id !== rm.id));
      setTotal(total - dt.harga);
    });
  };

  useEffect(() => {
    function fetchData() {
      axios
        .post(DATA_URL + "menu", {
          id: idKantin,
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function getKantin() {
      axios
        .post(DATA_URL + "kantin/get", {
          id: idKantin,
        })
        .then((res) => {
          setKantin(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
    getKantin();
  }, []);

  return kantin.map((dt) => {
    return (
      <main>
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
              </div>
            </div>
            <div className="document-container">
              <div className="menu-title w-1/2 mx-auto text-center font-bold text-xl font-serif mb-4">
                <h2 className="bg-white rounded-md bg-opacity-40">MENU</h2>
              </div>
              <div className="container-kantin bg-white rounded-md bg-opacity-40 px-5 py-4 flex flex-col gap-5 align-middle flex-wrap justify-center">
                <div className="boc-container w-full flex gap-5 justify-center align-middle bg-stone-50 rounded-xl px-4 py-3 flex-wrap text-center">
                  <ListMenu data={belanja} title="belanja" />
                </div>
                <button
                  className="bin w-1/2 bg-orange-500 py-2 rounded-xl mx-auto font-bold hover:bg-orange-800 hover:text-white"
                  onClick={() => {
                    id == "hidden" ? setId("visible") : setId("hidden");
                  }}
                >
                  KERANJANG
                </button>
                <div
                  className="container-keranjang bg-white rounded-md bg-opacity-40 px-5 py-4 flex flex-col gap-5 align-middle flex-wrap justify-center"
                  id={id}
                >
                  <div className="list-beli flex gap-5 align-middle w-full justify-center flex-wrap">
                    <ListPesan
                      data={belanja}
                      title="belanjaan"
                      onDelete={onDelete}
                    />
                  </div>
                  <span className="bg-slate-700 w-1/3 mx-auto rounded-xl p-3 font-bold flex justify-center gap-2">
                    <p className="bg-slate-400 w-1/2 text-center">Total</p>
                    <p className="w-1/2 text-white text-center">{total}</p>
                  </span>
                  <div className="container-form w-1/2 mx-auto">
                    <form
                      className="bg-slate-600 rounded-xl p-3 text-black"
                      onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                        alert("berhasil");
                        navigate("/");
                      }}
                    >
                      <div className="container flex gap-3 justify-center">
                        <div className="container-label flex flex-col">
                          <ul className="flex flex-col gap-2 text-white">
                            <li>Pembeli</li>
                            <li>Lokasi</li>
                          </ul>
                        </div>
                        <div className="container-input">
                          <ul className="flex flex-col gap-2">
                            <li>
                              <input
                                type="text"
                                name="pembeli"
                                onChange={(e) => {
                                  setPemesan(e.target.value);
                                }}
                              />
                            </li>
                            <li>
                              <input
                                type="text"
                                name="lokasi"
                                onChange={(e) => {
                                  setLokasi(e.target.value);
                                }}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <button type="submit" className="w-full mt-3">
                        <p className="bg-blue-800 py-2 w-1/2 rounded-lg mx-auto hover:bg-blue-500 text-white hover:text-black">
                          CheckOut &gt;&gt;
                        </p>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  });
};
