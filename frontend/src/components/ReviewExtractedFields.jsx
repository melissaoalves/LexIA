import React from "react";
import styled from "styled-components";
import { SubmitButton } from "../pages/PeticoesStyles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const fieldLabels = {
  nome_autor: "Nome",
  sufixo_genero: "Sufixo do Gênero",
  estado_civil: "Estado Civil",
  cpf: "CPF",
  rg: "RG",
  endereco_completo: "Endereço Completo",
  nome_mae: "Nome da Mãe",
  nb: "Número do Benefício",
  der: "Data da Entrada do Requerimento",
  endereco_inss: "Endereço do INSS",
  cid: "CID",
  nome_medico: "Nome do(s) Médico(s)",
  crm: "CRM",
  motivo_indeferimento: "Motivo do Indeferimento",
  quadro_clinico: "Quadro Clínico",
  dependencia_materna: "Possui dependência materna?",
  medicacoes: "Medicações",
  data_atestado: "Data do Atestado",
  qtd_componentes_familiar: "Quantidade de Pessoas na Família",
  renda: "Renda",
  valor_causa: "Valor da Causa"
};

export default function ReviewExtractedFields({ fields, setFields, onConfirm }) {
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      {Object.entries(fields).map(([key, value]) => (
        <FieldGroup key={key}>
          <Label>{fieldLabels[key] || key}</Label>
          <Input name={key} value={value} onChange={handleChange} />
        </FieldGroup>
      ))}
      <SubmitButton onClick={onConfirm}>Confirmar dados</SubmitButton>
    </Container>
  );
}
