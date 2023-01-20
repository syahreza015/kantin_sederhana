import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../assets/home.png";
import "../output.css";
import "./style.css";

export const Nav = () => {
  const navigate = useNavigate();
  const lokasi = useLocation();
  const path = lokasi.pathname.toString();
  const Menu = () => {
    return (
      <div className="navbar-part w-1/3">
        <div className="menu-container flex align-middle justify-center">
          <h3 className="bg-white bg-opacity-60 font-bold px-9 py-2">
            E1E120015 MUHAMAD SYAHREZA JAELANI
          </h3>
        </div>
      </div>
    );
  };
  const Start = () => {
    if (path === "/") {
      return (
        <div className="navbar-part w-1/3 mx-auto">
          <div className="start-container flex justify-end">
            <button
              className=" bg-slate-100 p-2 rounded-lg hover:bg-slate-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <nav>
      <div className="navbar-container w-full flex justify-between px-4 py-3">
        <div className="navbar-part w-1/3">
          <button
            className="logo-container bg-white bg-opacity-30 rounded-xl px-4 hover:bg-slate-300"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="home" className=" w-11" />
          </button>
        </div>
        <Menu />
        <Start />
      </div>
    </nav>
  );
};
