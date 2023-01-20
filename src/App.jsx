import { useState } from "react";
import "./App.css";
import "./output.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Foot } from "./pages/footer";
import { Nav } from "./pages/navbar";
import { Admin } from "./pages/admin";
import { Admin_Login } from "./pages/admin-login";
import { Login } from "./pages/login";
import { Kantin } from "./pages/kantin";
import { CheckOut } from "./pages/checkout";
import { AdminKantin } from "./pages/kantinAdmin";
import { Edit } from "./pages/edit";
import { Tambah } from "./pages/tambah";
import { SignUp } from "./pages/signup";
import { WarungTambah } from "./pages/tambahWarung";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="--admin" element={<Admin_Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="/:id" element={<Kantin />}></Route>
        <Route path="/ubah/:id" element={<Edit />}></Route>
        <Route path="/adminKantin/:id" element={<AdminKantin />}></Route>
        <Route path="/tambah/:id" element={<Tambah />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/signup/" element={<SignUp />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/tambahWarung" element={<WarungTambah />}></Route>
      </Routes>
      <Foot />
    </div>
  );
}

export default App;
