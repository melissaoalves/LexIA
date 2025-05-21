import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalBox = styled.div`
  background: #ffffff;
  padding: 2rem;
  width: 90%;
  max-width: 480px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.55rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fafafa;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2d2d2d;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  margin-top: 1.5rem;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

export default function OfficeDataModal({ show, onSubmit }) {
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    oab: "",
    telefone: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    email: "",
  });

  const [logo, setLogo] = useState(null);
  const [userData, setUserData] = useState({ nome: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (show && token) {
      axios
        .get("http://localhost:8000/auth/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("[OfficeDataModal] GET /auth/me/ →", res.data);
          setUserData(res.data);
          setFormData((prev) => ({
            ...prev,
            nome: res.data.nome,
            email: res.data.email,
          }));
        })
        .catch((err) => {
          console.error("[OfficeDataModal] Erro ao buscar dados do usuário:", err);
        });
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    console.log("[OfficeDataModal] Logo selecionada:", file);
  };

  const isFormValid = Object.entries(formData).every(
    ([key, value]) => (key === "complemento" ? true : value.trim() !== "")
  );

  const handleSubmit = () => {
    const token = localStorage.getItem("accessToken");
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (logo) data.append("logo", logo);

    console.log("[OfficeDataModal] PATCH /escritorio/me/ envio: fields=", formData, "logo=", logo);

    axios
      .patch("http://localhost:8000/escritorio/me/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("[OfficeDataModal] PATCH /escritorio/me/ resposta:", res.data);
        onSubmit(data);
      })
      .catch((err) => {
        console.error("[OfficeDataModal] Erro ao enviar os dados:", err);
        if (err.response) {
          console.error("[OfficeDataModal] Status:", err.response.status);
          console.error("[OfficeDataModal] Response data:", err.response.data);
        } else {
          console.error("[OfficeDataModal] Sem resposta do servidor.");
        }
        alert("Erro ao enviar dados. Verifique os logs no console.");
      });
  };

  if (!show) return null;

  return (
    <Overlay>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>Dados do Escritório</Title>

        <Grid>
          <FullWidth>
            <Label>Nome do Escritório</Label>
            <Input name="nome" value={formData.nome} onChange={handleChange} />
          </FullWidth>

          <FullWidth>
            <Label>Email</Label>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </FullWidth>

          <div>
            <Label>CNPJ</Label>
            <Input name="cnpj" value={formData.cnpj} onChange={handleChange} />
          </div>

          <div>
            <Label>OAB</Label>
            <Input name="oab" value={formData.oab} onChange={handleChange} />
          </div>

          <div>
            <Label>Telefone</Label>
            <Input name="telefone" value={formData.telefone} onChange={handleChange} />
          </div>

          <div>
            <Label>CEP</Label>
            <Input name="cep" value={formData.cep} onChange={handleChange} />
          </div>

          <div>
            <Label>Logradouro</Label>
            <Input name="logradouro" value={formData.logradouro} onChange={handleChange} />
          </div>

          <div>
            <Label>Número</Label>
            <Input name="numero" value={formData.numero} onChange={handleChange} />
          </div>

          <div>
            <Label>Complemento</Label>
            <Input name="complemento" value={formData.complemento} onChange={handleChange} />
          </div>

          <div>
            <Label>Bairro</Label>
            <Input name="bairro" value={formData.bairro} onChange={handleChange} />
          </div>

          <div>
            <Label>Cidade</Label>
            <Input name="cidade" value={formData.cidade} onChange={handleChange} />
          </div>

          <div>
            <Label>Estado</Label>
            <Input name="estado" value={formData.estado} onChange={handleChange} />
          </div>

          <FullWidth>
            <Label>Logo do Escritório</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </FullWidth>
        </Grid>

        <Button disabled={!isFormValid} onClick={handleSubmit}>
          Salvar Dados
        </Button>
      </ModalBox>
    </Overlay>
  );
}
