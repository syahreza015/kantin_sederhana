import React, { useRef, useState } from "react";
import "./style.css";
import "../output.css";
import axios from "axios";
import { DATA_URL } from "../conf";
import { useNavigate } from "react-router-dom";

export const WarungTambah = () => {
  const [nama, setNama] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [pemilik, setPemilik] = useState("");
  const [id, setId] = useState("hidden");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alamat, setAlamat] = useState("");
  const file = useRef(null);
  const [img, setImg] = useState("");

  const tambahWarung = () => {
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("lokasi", lokasi);
    formData.append("pemilik", pemilik);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("alamat", alamat);
    formData.append("imgName", img);
    formData.append("file", file.current.files[0]);

    axios
      .post(DATA_URL + "warung/insert", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    alert("berhasil");
  };

  return (
    <main>
      <section>
        <div className="section-container">
          <div className="title w-1/2 mx-auto bg-orange-600 py-3 my-5 text-center rounded-xl font-bold">
            TAMBAH WARUNG
          </div>
          <div className="container mx-auto w-1/2 bg-white bg-opacity-70 flex flex-col align-middle align-center justify-center gap-5 rounded-xl mb-36 p-5">
            <form
              encType="multipart/form-data"
              onSubmit={(e) => {
                e.preventDefault();
                tambahWarung();
              }}
              className="flex flex-col gap-5 justify-center bg-slate-600 rounded-lg align-middle align-center py-5"
            >
              <div className="input-container flex justify-center gap-5 w-1/2">
                <div className="label">
                  <ul className="flex flex-col gap-4">
                    <li>
                      <span>NAMA</span>
                    </li>
                    <li>
                      <span>LOKASI</span>
                    </li>
                    <li>
                      <span>PEMILIK</span>
                    </li>
                    <li>
                      <span>USERNAME</span>
                    </li>
                    <li>
                      <span>PASSWORD</span>
                    </li>
                    <li>
                      <span>ALAMAT</span>
                    </li>
                    <li>
                      <span>FOTO WARUNG</span>
                    </li>
                  </ul>
                </div>
                <div className="input">
                  <ul className="flex flex-col gap-3">
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
                        name="lokasi"
                        onChange={(e) => {
                          setLokasi(e.target.value);
                        }}
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        name="pemilik"
                        onChange={(e) => {
                          setPemilik(e.target.value);
                        }}
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        name="username"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        name="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        name="alamat"
                        onChange={(e) => {
                          setAlamat(e.target.value);
                        }}
                      />
                    </li>
                    <li>
                      <input
                        ref={file}
                        type="file"
                        name="img"
                        onChange={(e) => {
                          setImg(e.target.files[0].name);
                        }}
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <span
                className="P-2 font-bold text-sm w-1/2 bg-red-500 rounded-md mx-auto text-center"
                id={id}
              >
                ADA MASALAH!
              </span>

              <button
                type="submit"
                className="action-button bg-green-600 hover:bg-green-700 hover:text-white text-center mt-5"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
