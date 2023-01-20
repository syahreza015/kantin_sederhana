import React, { useRef, useState } from "react";
import {
  createRoutesFromChildren,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { DATA_URL } from "../conf";
import axios from "axios";
import "../output.css";
import "./style.css";

export const Admin_Login = () => {
  const navigate = useNavigate();
  const username = useRef(null);
  const password = useRef(null);
  const form = useRef(null);
  const [warning, setWarning] = useState("hidden");
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");

  return (
    <main className="mt-6 mb-11 w-full flex flex-col align-middle gap-1">
      <section className="section1 w-full flex flex-col gap-5 align-middle">
        <div className="title w-1/2 text-center mx-auto bg-transparent font-bold text-xl font-serif">
          <h2 className="bg-white rounded-md bg-opacity-40" id="list">
            LOGIN ADMIN
          </h2>
        </div>
        <div className="form-container container-90 flex gap-5 rounded-md bg-opacity-40 justify-center align-middle py-5 mx-auto">
          <form
            ref={form}
            className="flex flex-col gap-5"
            onSubmit={(event) => {
              event.preventDefault();
              const action = () => {
                form.current.reset();
                setWarning("visible");
              };

              axios
                .post(DATA_URL + "admin/login", {
                  username: uname,
                  password: pass,
                })
                .then((res) => {
                  res.data == "berhasil" ? navigate("/admin") : action();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <div className="inputan flex gap-5">
              <div className="label flex flex-col gap-5">
                <h3 className="bg-white rounded-md bg-opacity-80 px-3">
                  Username
                </h3>
                <h3 className="bg-white rounded-md bg-opacity-80 px-3">
                  Password
                </h3>
              </div>
              <div className="input flex flex-col gap-5">
                <input
                  ref={username}
                  type="text"
                  className="input"
                  onChange={(e) => {
                    setUname(e.target.value);
                  }}
                />
                <input
                  ref={password}
                  type="password"
                  className="input"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </div>
            </div>
            <span
              className="bg-red-700 px-2 py-1 text-center font-bold w-1/2 mx-auto rounded-xl"
              id={warning}
            >
              Data Tidak Valid!
            </span>
            <button
              type="submit"
              className="bg-slate-300 bg-opacity-80 w-1/4 rounded-md mx-auto py-1 hover:bg-slate-400 hover:bg-opacity-80"
            >
              Login
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
          <button
            className="bg-white rounded-md hover:bg-opacity-100 bg-opacity-80 px-3 text-center py-1 w-32 mx-auto"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Daftar &gt;&gt;
          </button>
        </div>
      </section>
    </main>
  );
};
