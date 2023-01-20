import React, { useEffect, useRef, useState } from "react";
import def from "../assets/default.png";
import "./style.css";
import "../output.css";
import axios from "axios";
import { useParams, useNavigate, useOutlet } from "react-router-dom";
import { MenuKantin } from "../components/menuKantin";
import { Menu } from "../components/list";
import { DATA_URL } from "../conf";

export const Tambah = () => {
  const idHal = useParams();
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState("");
  const [file, setFile] = useState();
  const form = useRef(null);
  const fil = useRef(null);
  const navigate = useNavigate();

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

  const postData = async () => {};

  const ListItem = () => {
    return data.map((dt) => {
      return (
        <div className="box-kantin text-center" key={dt.id}>
          <div className="title-kantin py">
            <p>{dt.nama}</p>
          </div>
          <div className="image-kantin">
            <img src={`/images/${dt.img}`} alt="" />
          </div>
          <div className="desc-kantin py-2 flex flex-col justify-center align-middle gap-4">
            <p>{dt.harga}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <main className="main-full">
      <section>
        <div className="container-section w-full flex flex-col gap-5">
          <div className="title w-1/2 mx-auto bg-slate-300 text-center bg-opacity-40 p-3 text-lg font-bold">
            TAMBAH
          </div>
          <div className="container-doc w-full bg-slate-300 bg-opacity-40 p-4 flex flex-col align-center justify-center gap-5">
            <div className="container flex flex-wrap gap-5 justify-center">
              <ListItem />
            </div>
            <form
              encType="multipart/form-data"
              ref={form}
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData();

                const id = idHal.id;
                formData.append("nama", nama);
                formData.append("harga", harga);
                formData.append("idKantin", id);
                formData.append("imgName", gambar);
                formData.append("gamb", fil.current.files[0]);

                axios.post(DATA_URL + "menu/post", formData).catch((err) => {
                  console.log(err);
                });

                // formData.append("gamb", fil.current.files[0]);

                // axios.post(DATA_URL + "gambar", formData).catch((err) => {
                //   console.log(err);
                // });
                form.current.reset();

                getData();
              }}
            >
              <div className="container-form flex gap-2 p-4 rounded-lg bg-slate-400 justify-center">
                <div className="container-label flex flex-col gap-2">
                  <ul className="flex flex-col gap-2">
                    <li>Nama</li>
                    <li>Harga</li>
                  </ul>
                </div>
                <div className="container-input flex flex-col gap-2 justify-center">
                  <ul className="flex flex-col gap-2 justify-center">
                    <li>
                      <input
                        type="text"
                        name="nama"
                        onChange={(e) => {
                          setNama(e.target.value);
                        }}
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        name="harga"
                        onChange={(e) => {
                          setHarga(e.target.value);
                        }}
                      />
                    </li>
                    <li>
                      <input
                        ref={fil}
                        type="file"
                        name="gamb"
                        id="img"
                        onChange={(e) => {
                          setGambar(e.target.files[0].name);
                        }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <button
                type="submit"
                className="w-1/2 bg-blue-500 hover:bg-blue-600 hover:text-white p-2 rounded-md mx-auto"
              >
                Submit
              </button>
            </form>
            <button
              className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => {
                navigate(-1);
              }}
            >
              &lt;&lt;BACK
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
