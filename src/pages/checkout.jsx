import React, { useEffect, useState } from "react";
import def from "../assets/default.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DATA_URL } from "../conf";
import { ListPesan } from "../components/listMenu";
import axios from "axios";
import "./style.css";
import "../output.css";

export const CheckOut = () => {
  const no = useParams();
  const [idKantin, setIdKantin] = useState(no.id);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pemesan, setPemesan] = useState("");
  const [lokasi, setLokasi] = useState("");

  useEffect(() => {
    const getData = () => {
      axios
        .get(DATA_URL + "keranjang")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, []);

  useEffect(() => {
    data.map((dt) => {
      setTotal(dt.total);
    });
  }, [data]);

  const TotalHarga = () => {
    return <p className="w-1/2 text-white text-center">{total}</p>;
  };

  const ListItem = () => {
    return data.map((dat) => {
      return (
        <div className="box-kantin text-center" key={dat.id}>
          <div className="title-kantin py">
            <p>{dat.nama}</p>
          </div>
          <div className="image-kantin">
            <img src={def} alt="" />
          </div>
          <div className="desc-kantin py-2 flex flex-col justify-center align-middle gap-4">
            <p>{dat.harga}</p>
            <div className="button flex gap-2 justify-center align-middle">
              <button className="bg-red-600 rounded-md px-3 py-1 hover:bg-red-500">
                BATAL
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <main>
      <section className="my-5">
        <div className="title w-1/2 text-center mx-auto bg-transparent font-bold text-xl font-serif">
          <h2 className="bg-white rounded-md bg-opacity-40" id="list">
            CHECKOUT
          </h2>
        </div>
        <div className="document-container">
          <div className="menu-title w-1/2 mx-auto text-center font-bold text-xl font-serif mb-4">
            <h2 className="bg-white rounded-md bg-opacity-40">MENU</h2>
          </div>
          <div className="container-kantin bg-white rounded-md bg-opacity-40 px-5 py-4 flex flex-col gap-5 align-middle flex-wrap justify-center">
            <div className="item-container flex flex-wrap gap-5 justify-center"></div>
            <span className="bg-slate-700 w-1/3 mx-auto p-3 font-bold flex justify-center gap-2">
              <p className="bg-slate-400 w-1/2 text-center">Total</p>
              <TotalHarga />
            </span>
            <div className="container bg-white bg-opacity-50 rounded-xl flex justify-center flex-wrap gap-5 p-5">
              <ListPesan />
            </div>
            <div className="form-container">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(pemesan, lokasi);
                }}
                action=""
                className="flex flex-col gap-3 w-1/2 mx-auto justify-center align-middle"
              >
                <div className="input-container flex gap-3 w-1/2 mx-auto justify-center align-middle p-4">
                  <div className="label flex flex-col justify-content align-middle align-center gap-3">
                    <ul className="flex flex-col justify-content align-middle align-center gap-3">
                      <li>Pemesan</li>
                      <li>Lokasi</li>
                    </ul>
                  </div>
                  <div className="input flex flex-col justify-content align-middle align-center gap-3">
                    <ul className="flex flex-col justify-content align-middle align-center gap-3">
                      <li>
                        <input
                          type="text"
                          name="pemesan"
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
                <button
                  type="submit"
                  className="mb-2 w-1/2 bg-blue-500 py-2 rounded-xl mx-auto font-bold hover:bg-blue-800 hover:text-white mx-auto"
                  onClick={() => {
                    alert("berhasil");
                    submit();
                  }}
                >
                  SUBMIT &gt;&gt;
                </button>
              </form>
            </div>
            <button
              className="bin w-1/2 bg-orange-500 py-2 rounded-xl mx-auto font-bold hover:bg-orange-800 hover:text-white"
              onClick={() => {
                navigate("/kantin");
              }}
            >
              &lt;&lt; BACK
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
