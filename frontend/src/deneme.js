import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [name, setName] = useState("");
  const [Author, setAuthor] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [books, setBooks] = useState([]);
  const [openModals, setOpenModals] = useState({});

  const handleOpen = (id) => {
    setOpenModals((prevOpenModals) => ({ ...prevOpenModals, [id]: true }));
  };

  const handleClose = (id) => {
    window.location.reload();
    setOpenModals((prevOpenModals) => ({ ...prevOpenModals, [id]: false }));
  };

  useEffect(() => {
    fetch("http://localhost:8080/book/getAll")
      .then((res) => res.json())
      .then((result) => {
        setBooks(result);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/book/${id}`, {
        method: "DELETE",
      });
  
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Veri silme hatası:", error);
    }
  };
  
  const handleSave = async (id) => {
    const updatedBook = {
      name: name || "",
      author: Author || "",
      description: Description || "",
      price: Price || "",
    };
  
    try {
      const response = await fetch(`http://localhost:8080/book/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });
  
      const result = await response.json();
      
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, ...result } : book
        )
      );
      handleClose(id);
  
      
    } catch (error) {
      console.error("Veri güncelleme hatası:", error);
    }
  };
  
  const handleCreate = async () => {
    const newBook = {
      name: name || "",
      author: Author || "",
      description: Description || "",
      price: Price || "",
    };
  
    try {
      await fetch("http://localhost:8080/book/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
  
      const updatedBooks = await fetch("http://localhost:8080/book/getAll").then((res) => res.json());
      setBooks(updatedBooks);
      setName("");
      setAuthor("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error("Veri ekleme hatası:", error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 70 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>İsim</StyledTableCell>
              <StyledTableCell align="center">Yazar</StyledTableCell>
              <StyledTableCell align="center">Açıklama</StyledTableCell>
              <StyledTableCell align="center">Fiyat</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell align="left">
                <TextField
                  label="İsim"
                  onChange={(e) => setName(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  label="Yazar"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  label="Açıklama"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  label="Fiyat"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCreate}
                >
                  Ekle
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
          <TableBody>
            {books.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.author}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="center">{row.price} TL</StyledTableCell>
                <StyledTableCell align="center">
                  <div>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleOpen(row.id)}
                    >
                      Düzenle
                    </Button>
                    <Modal
                      open={openModals[row.id] || false}
                      onClose={() => handleClose(row.id)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <TextField
                          fullWidth
                          label="İsim"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <hr />
                        <TextField
                          fullWidth
                          label="Yazar"
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                        <hr />
                        <TextField
                          fullWidth
                          label="Açıklama"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <hr />
                        <TextField
                          fullWidth
                          label="Fiyat"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <hr />
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => handleSave(row.id) && handleClose()}
                          
                        >
                          Kaydet
                        </Button>
                      </Box>
                    </Modal>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(row.id)}
                    >
                      Sil
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          
        </Table>
      </TableContainer>
    </div>
  );
}
