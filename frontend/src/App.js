import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Peticoes from "./pages/UploadDocuments";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // 👈 NOVO
import AdvogadosPage from "./pages/AdvogadosPage"; 

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/peticoes" element={<Peticoes />} />
          <Route path="/registrar" element={<RegisterPage />} /> {/* 👈 NOVO */}
          <Route path="/advogados" element={<AdvogadosPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
