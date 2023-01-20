const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
const router = express.Router();
app.use(router);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//connection

const connection = mysql.createConnection({
  host: "localhost",
  port: 6000,
  user: "root",
  password: "",
  database: "kantin",
});

router.post("/gambar", upload.single("gamb"), (req, res) => {
  console.log(req.file);
});

router.post("/post", upload.single("img"), (req, res) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const nama = req.body.nama;
  const alamat = req.body.alamat;
  const query =
    "INSERT INTO user(username,password,nama,alamat) VALUES(?,?,?,?)";
  connection.query(query, [username, password, nama, alamat], (err, result) => {
    if (err) {
      res.status(500);
      console.log("ada kesalahan!");
    } else {
      res.status(200);
      res.send("berhasil");
      console.log("berhasil!");
    }
  });
});

router.post("/user/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = "SELECT * FROM user WHERE username = ? and password = ?";

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500);
      console.log("Ada masalah!");
    } else {
      res.status(200);
      console.log("Berhasil!");

      if (result.length > 0) {
        console.log("authorized");
        res.json(result);
      } else {
        console.log("unauthorized");
        res.send("gagal");
      }
    }
  });
});

router.post("/kantin/get", (req, res) => {
  const id = req.body.id;
  const query = "SELECT * FROM kantin where id=?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500);
      console.log("Failed to retrieve data from kantin");
    } else {
      res.status(200).json(result);
      console.log("berhasil mendapat data kantin");
    }
  });
});

router.post("/menu/get", (req, res) => {
  const id = req.body.id.id;
  const query = "SELECT * FROM menu WHERE idKantin = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      const respond = "gagal";
      res.status(500);
      console.log({ respond });
    } else {
      res.status(200).json(result);
      console.log("berhasil mendapat data menu");
    }
  });
});

router.post("/menu", (req, res) => {
  const id = req.body.id;
  const query = "SELECT * FROM menu WHERE idKantin = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      const respond = "gagal";
      res.status(500);
      console.log({ respond });
    } else {
      res.status(200).json(result);
      console.log("berhasil mendapat data menu");
    }
  });
});

router.post("/keranjang/input", (req, res) => {
  const id = req.body.id;
  const nama = req.body.nama;
  const harga = req.body.harga;
  const total = req.body.total;
  const idKantin = parseInt(req.body.no);
  const query =
    "INSERT INTO keranjang (id,nama,harga,total,idKantin) VALUES(?,?,?,?,?)";

  connection.query(query, [id, nama, harga, total, idKantin], (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      console.log("gagal memasukkan dalam keranjang");
    } else {
      res.status(200);
      console.log("berhasil memasukkan dalam keranjang");
    }
  });
});

router.get("/keranjang", (req, res) => {
  const query = "SELECT * FROM keranjang";

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal");
    } else {
      res.status(200).json(result);
      console.log("berhasil");
    }
  });
});

router.get("/kantin", (req, res) => {
  const query = "SELECT * FROM kantin";

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal mengambil data");
    } else {
      res.status(200).json(result);
      console.log("berhasil mengambil data kantin");
    }
  });
});

router.post("/admin/login", (req, res) => {
  const query = "SELECT * FROM admin WHERE username = ? and password = ?";
  const username = req.body.username;
  const password = req.body.password;

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal");
    } else {
      res.status(200);
      console.log("berhasil");
      if (result.length > 0) {
        console.log("authorized");
        res.send("berhasil");
      } else {
        console.log("unauthorized");
        res.send("gagal");
      }
    }
  });
});

router.post("/warung/insert", upload.single("file"), (req, res) => {
  const query = "INSERT INTO kantin(nama,lokasi,pemilik,img) VALUES(?,?,?,?)";
  const query2 =
    "INSERT INTO user(username, password, nama, alamat) VALUES(?,?,?,?)";
  const nama = req.body.nama;
  const lokasi = req.body.lokasi;
  const pemilik = req.body.pemilik;
  const username = req.body.username;
  const password = req.body.password;
  const alamat = req.body.alamat;
  const img = req.body.imgName;

  connection.query(query, [nama, lokasi, pemilik, img], (err, result) => {
    if (err) {
      res.status(500).send("gagal");
      console.log("gagal menambahkan warung, ", err);
    } else {
      res.status(200).send("berhasil");
      console.log("berhasil menambahkan warung");
    }
  });

  connection.query(
    query2,
    [username, password, nama, alamat],
    (err, result) => {
      if (err) {
        res.status(500);
        console.log("gagal memasukkan data user");
      } else {
        res.status(200);
        console.log("berhasil menambahkan user");
      }
    }
  );
});

router.post("/pesan", (req, res) => {
  const query = "SELECT * FROM pesanan WHERE kantin=?";
  const id = req.body.id;

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log("gagal mengambil data pesanan");
    } else {
      res.status(200).json(result);
      console.log("berhasil mengambil data pesanan");
    }
  });
});

router.post("/kantin/get", (req, res) => {
  const id = req.body.id;
  const query = "SELECT * FROM kantin WHERE id=?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal mengambil data kantin");
    } else {
      res.status(200).send(result);
      console.log("berhasil mengambil data kantin");
    }
  });
});

router.get("/kantin", (req, res) => {
  const query = "SELECT * FROM menu WHERE idKantin = ?";
  const id = req.body.id;

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal");
    } else {
      res.status(200).json(result);
      console.log("berhasil");
    }
  });
});

router.post("/kantin/delete", (req, res) => {
  const query = "DELETE FROM kantin WHERE id=?";
  const query2 = "DELETE FROM user WHERE id=?";
  const id = req.body.id;

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal menghapus kantin");
    } else {
      res.status(200).send("berhasil");
      console.log("berhasil menghapus kantin");
    }
  });

  connection.query(query2, [id], (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal menghapus user");
    } else {
      res.status(200);
      console.log("berhasil menghapus user");
    }
  });
});

router.post("/visit/kantin", (req, res) => {
  const query = "SELECT * FROM menu WHERE idKantin = ?";
  const id = req.body.id;

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal");
    } else {
      res.status(200).json(result);
      console.log("berhasil");
    }
  });
});

router.post("/checkout/submit", (req, res) => {
  const menu = req.body.menu;
  const harga = req.body.harga;
  const total = req.body.total;
  const nama = req.body.nama;
  const lokasi = req.body.lokasi;
  const kantin = req.body.kantin;
  const query =
    "INSERT INTO pesanan(menu,harga,total,nama,lokasi,kantin) VALUES(?,?,?,?,?,?)";
  const query2 = "DELETE FROM keranjang";

  connection.query(
    query,
    [menu, harga, total, nama, lokasi, kantin],
    (err, result) => {
      if (err) {
        res.status(500);
        console.log("ada kesalahan");
      } else {
        res.status(200);
        console.log("berhasil");
      }
    }
  );

  connection.query(query2, (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal menghapus dari keranjang");
    } else {
      res.status(200);
      console.log("data keranjang dihapus");
    }
  });
});

router.post("/menu/post", upload.single("gamb"), (req, res) => {
  const nama = req.body.nama;
  const harga = req.body.harga;
  const id = req.body.idKantin;
  const gambar = req.body.imgName;
  const query = "INSERT INTO menu (nama,harga,idKantin,img) VALUES(?,?,?,?)";

  connection.query(query, [nama, harga, id, gambar], (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal memasukkan dalam menu", err);
    } else {
      res.status(200).json(result);
      console.log("berhasil memasukkan dalam menu");
    }
  });
});

router.post("/ok", (req, res) => {
  const query = "DELETE FROM pesanan WHERE id=?";
  const id = req.body.id;

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log("gagal menghapus pesanan");
    } else {
      res.status(200).json(result);
      console.log("berhasil menghapus pesanan");
      console.log(id);
    }
  });
});

router.post("/menu/delete", (req, res) => {
  const id = req.body.id;
  const query = "DELETE FROM menu WHERE id=?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500);
      console.log("gagal menghapus menu");
    } else {
      res.status(200);
      console.log("berhasil menghapus menu");
    }
  });
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
