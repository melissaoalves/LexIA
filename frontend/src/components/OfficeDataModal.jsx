import React, { useState } from "react";
import styled from "styled-components";

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
    complemento: "", // opcional
    bairro: "",
    cidade: "",
    estado: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const isFormValid = Object.entries(formData).every(
    ([key, value]) =>
      key === "complemento" ? true : value.trim() !== ""
  );

  if (!show) return null;

  return (
    <Overlay>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>Dados do Escritório</Title>

        <Grid>
          <FullWidth>
            <Label>Nome do Escritório</Label>
            <Input name="nome" value={formData.nome} onChange={handleChange} placeholder="Digite o nome" />
          </FullWidth>

          <div>
            <Label>CNPJ</Label>
            <Input name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" />
          </div>

          <div>
            <Label>OAB</Label>
            <Input name="oab" value={formData.oab} onChange={handleChange} placeholder="Ex: OAB/UF 00000" />
          </div>

          <div>
            <Label>Telefone</Label>
            <Input name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(00) 0000-0000" />
          </div>

          <div>
            <Label>CEP</Label>
            <Input name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" />
          </div>

          <div>
            <Label>Logradouro</Label>
            <Input name="logradouro" value={formData.logradouro} onChange={handleChange} placeholder="Rua, avenida..." />
          </div>

          <div>
            <Label>Número</Label>
            <Input name="numero" value={formData.numero} onChange={handleChange} placeholder="Ex: 123" />
          </div>

          <div>
            <Label>Complemento</Label>
            <Input name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Apto, sala..." />
          </div>

          <div>
            <Label>Bairro</Label>
            <Input name="bairro" value={formData.bairro} onChange={handleChange} placeholder="Digite o bairro" />
          </div>

          <div>
            <Label>Cidade</Label>
            <Input name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Digite a cidade" />
          </div>

          <div>
            <Label>Estado</Label>
            <Input name="estado" value={formData.estado} onChange={handleChange} placeholder="UF" />
          </div>
        </Grid>

        <Button disabled={!isFormValid} onClick={() => onSubmit(formData)}>
          Salvar Dados
        </Button>
      </ModalBox>
    </Overlay>
  );
}
