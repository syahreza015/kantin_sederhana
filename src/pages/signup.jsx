import React, { useRef, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DATA_URL } from "../conf";
import "../output.css";
import "./style.css";

export const SignUp = () => {
  const navigate = useNavigate();
  const form = useRef(null);
  const namaPengguna = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const alamat = useRef(null);

  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [namaPeng, setNamaPeng] = useState("");
  const [addr, setAddr] = useState("");

  const [id, setId] = useState("hidden");
  const [hasil, setHasil] = useState("ada kesalahan!");

  const alert = () => {
    return (
      <div
        className="alert w-1/2 bg-green-500 rounded-md mx-auto text-center py-1"
        id={id}
      >
        {hasil}
      </div>
    );
  };

  return (
    <main className="mt-6 mb-11 w-full flex flex-col align-middle gap-1">
      <section className="section1 w-full flex flex-col gap-5 align-middle">
        <div className="title w-1/2 text-center mx-auto bg-transparent font-bold text-xl font-serif">
          <h2 className="bg-white rounded-md bg-opacity-40" id="list">
            DAFTAR
          </h2>
        </div>
        <div className="form-container container-90 flex flex-col gap-5 rounded-md bg-opacity-40 justify-center align-middle py-5 mx-auto">
          <form
            ref={form}
            className="flex flex-col mx-auto gap-5"
            onSubmit={(event) => {
              const postData = () => {
                axios
                  .post(DATA_URL + "signup", {
                    username: uname,
                    password: pass,
                    nama: namaPeng,
                    alamat: addr,
                  })
                  .then((res) => {
                    console.log(res);
                    if (res.data == "gagal") {
                      setId("visible");
                      console.log(err);
                      form.current.reset();
                    } else {
                      navigate("/login");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              };

              event.preventDefault();
              postData();
            }}
          >
            <div className="inputan flex mx-auto gap-5">
              <div className="label flex flex-col gap-5">
                <h3 className="bg-white rounded-md bg-opacity-80 px-3">
                  Username
                </h3>
                <h3 className="bg-white rounded-md bg-opacity-80 px-3">
                  Password
                </h3>
                <h3 className="bg-white rounded-md bg-opacity-80 px-3">
                  Nama Pemilik
                </h3>
                <h3 className="bg-white rounded-md bg-opacity-80 px-3">
                  Alamat
                </h3>
              </div>
              <div className="input flex flex-col gap-5">
                <input
                  ref={username}
                  type="text"
                  className="input"
                  onChange={() => {
                    setUname(username.current.value);
                  }}
                />
                <input
                  ref={password}
                  type="password"
                  className="input"
                  onChange={() => {
                    setPass(password.current.value);
                  }}
                />
                <input
                  ref={namaPengguna}
                  type="text"
                  className="input"
                  onChange={() => {
                    setNamaPeng(namaPengguna.current.value);
                  }}
                />
                <input
                  ref={alamat}
                  type="text"
                  className="input"
                  onChange={() => {
                    setAddr(alamat.current.value);
                  }}
                />
              </div>
            </div>

            <button className="bg-slate-300 bg-opacity-80 w-1/4 rounded-md mx-auto py-1 hover:bg-slate-400 hover:bg-opacity-80">
              Daftar
            </button>
          </form>
        </div>
        <div className="container-90 instruction-container mx-auto py-5 px-8 flex flex-col gap-3 rounded-md">
          <h4 className="bg-white rounded-md bg-opacity-80 px-5 text-center py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ratione
            numquam praesentium? Autem excepturi, qui, provident nemo hic error
            consequatur dolor repudiandae suscipit dignissimos maiores ut
            consectetur perspiciatis accusamus itaque!
          </h4>
          <NavLink to={-1} className="mx-auto">
            <button className="bg-white rounded-md hover:bg-opacity-100 bg-opacity-80 px-3 text-center py-1 w-32 mx-auto">
              &lt;&lt; Login
            </button>
          </NavLink>
        </div>
      </section>
    </main>
  );
};
