import React from "react";
import {
  PeticoesContainer,
  PeticaoCard,
  PeticaoInfo,
  ClienteNome,
  ClienteDetalhes,
  StatusText,
  DownloadButton
} from "../pages/PeticoesStyles";
import { FaDownload } from "react-icons/fa";

export default function PeticoesList({ peticoes }) {
  if (!peticoes || peticoes.length === 0) {
    return (
      <PeticoesContainer>
        <p style={{ padding: "1rem", color: "#888" }}>Nenhuma petição encontrada.</p>
      </PeticoesContainer>
    );
  }

  return (
    <PeticoesContainer>
      {peticoes.map((p) => (
        <PeticaoCard key={p.id}>
          <PeticaoInfo>
            <ClienteNome>{p.nome_cliente}</ClienteNome>
            <ClienteDetalhes>
              Status:{" "}
              <StatusText concluido={p.status === "Concluído"}>
                {p.status}
              </StatusText>
              <br />
              Data de criação: {new Date(p.data_criacao).toLocaleDateString()}
            </ClienteDetalhes>
          </PeticaoInfo>
          {p.arquivo_peticao && (
            <DownloadButton href={p.arquivo_peticao} download>
              <FaDownload />
            </DownloadButton>
          )}
        </PeticaoCard>
      ))}
    </PeticoesContainer>
  );
}
