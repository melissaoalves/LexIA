import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Peticoes from "./pages/UploadDocuments";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // 👈 NOVO

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/peticoes" element={<Peticoes />} />
          <Route path="/registrar" element={<RegisterPage />} /> {/* 👈 NOVO */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
