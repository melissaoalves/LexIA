import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  WrapperLeft,
  Subtitulo,
  WrapperCentralizado,
  ModalBackdrop,
  ModalContent,
  Header,
  HeaderContentWrapper,
  Title,
  UsuarioWrapper,
  AvatarMenuWrapper,
  AvatarCirculo,
  NomeUsuario,
  DropdownMenu,
  NavMenu,
  HeaderLeftGroup
} from "./PeticoesStyles";

import OfficeDataModal from "../components/OfficeDataModal";
import SearchBar from "../components/SearchBar";
import DocumentDropZone from "../components/DocumentDropZone";
import LoadingStatus from "../components/LoadingStatus";
import ReviewExtractedFields from "../components/ReviewExtractedFields";
import SuccessMessage from "../components/SuccessMessage";
import PeticoesList from "../components/PeticoesList";
import LawyersSelection from "../components/LawyersSelection";

export default function Peticoes() {
  const [loadingEscritorio, setLoadingEscritorio] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("upload");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [selectedAdvogados, setSelectedAdvogados] = useState([]);
  const [peticoes, setPeticoes] = useState([]);
  const [filteredPeticoes, setFilteredPeticoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [statusMensagem, setStatusMensagem] = useState("");
  const [dadosExtraidos, setDadosExtraidos] = useState({});
  const [showOfficeModal, setShowOfficeModal] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    // busca advogados do escritório
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8000/advogados/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLawyers(res.data))
      .catch((err) => console.error("Erro ao buscar advogados:", err));
  }, []);

  const atualizarPeticoes = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.get("http://localhost:8000/api/peticoes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPeticoes(res.data);
      setFilteredPeticoes(res.data);
    } catch (err) {
      console.error("Erro ao buscar petições:", err);
    }
  };

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);

    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8000/escritorio/me/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.nome) setShowOfficeModal(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
        setShowOfficeModal(true);
      })
      .finally(() => setLoadingEscritorio(false));
  }, []);

  useEffect(() => {
    atualizarPeticoes();
  }, []);

  useEffect(() => {
    const filtro = peticoes.filter((p) =>
      p.nome_cliente?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeticoes(filtro);
  }, [searchTerm, peticoes]);

  const handleFilesChange = (e) => {
    const novosArquivos = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...novosArquivos]);
    e.target.value = null;
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      const dropped = Array.from(e.dataTransfer.files);
      setSelectedFiles((prev) => [...prev, ...dropped]);
      e.dataTransfer.clearData();
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("documentos", file));
    // adiciona advogados selecionados
    selectedAdvogados.forEach((id) => formData.append("advogados", id));

    setModalStep("processing");
    setStatusMensagem("Extraindo textos dos documentos...");

    try {
      const res = await axios.post("http://localhost:8000/api/upload/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setStatusMensagem("Estruturando dados com IA...");

      setTimeout(async () => {
        await atualizarPeticoes();
        const novaPeticao = res.data.peticao;
        setDadosExtraidos(
          typeof novaPeticao.dados_extraidos === "string"
            ? JSON.parse(novaPeticao.dados_extraidos)
            : novaPeticao.dados_extraidos
        );
        setModalStep("review");
      }, 2000);
    } catch (error) {
      alert("Erro ao enviar documentos");
      console.error(error);
    }
  };

  const handleReviewConfirm = () => {
    setModalStep("done");
  };

  const handleOfficeSubmit = async (formData) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.patch("http://localhost:8000/escritorio/me/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setShowOfficeModal(false);
    } catch (error) {
      console.error("Erro ao salvar escritório", error);
      alert("Erro ao salvar dados do escritório.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Container>
      {!loadingEscritorio && showOfficeModal && (
        <OfficeDataModal show={true} onSubmit={handleOfficeSubmit} />
      )}

      <Header>
        <HeaderContentWrapper>
          <HeaderLeftGroup>
            <Title>LexIA</Title>
            <NavMenu>
              <a href="/peticoes">Petições</a>
              <a href="/advogados">Advogados</a>
            </NavMenu>
          </HeaderLeftGroup>

          <UsuarioWrapper>
            <NomeUsuario>{nomeUsuario}</NomeUsuario>
            <AvatarMenuWrapper onClick={() => setMenuAberto(!menuAberto)}>
              <AvatarCirculo>
                {nomeUsuario ? nomeUsuario.charAt(0).toUpperCase() : "?"}
              </AvatarCirculo>
              {menuAberto && (
                <DropdownMenu>
                  <li>Meu perfil</li>
                  <li onClick={handleLogout}>Sair</li>
                </DropdownMenu>
              )}
            </AvatarMenuWrapper>
          </UsuarioWrapper>
        </HeaderContentWrapper>
      </Header>

      <WrapperLeft>
        <Subtitulo>Minhas Petições</Subtitulo>
      </WrapperLeft>

      <WrapperCentralizado>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onCreateClick={() => {
            setModalOpen(true);
            setModalStep("selectLawyers");
            setSelectedFiles([]);
            setDadosExtraidos({});
            setSelectedAdvogados([]);
          }}
        />

        <PeticoesList peticoes={filteredPeticoes} />
      </WrapperCentralizado>

      {modalOpen && (
        <ModalBackdrop>
          <ModalContent>
            <button
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              onClick={() => setModalOpen(false)}
              aria-label="Fechar modal"
            >
              &times;
            </button>

            {modalStep === "selectLawyers" && (
              <LawyersSelection
                lawyers={lawyers}
                selected={selectedAdvogados}
                setSelected={setSelectedAdvogados}
                onNext={() => setModalStep("upload")}
              />
            )}

            {modalStep === "upload" && (
              <DocumentDropZone
                dragOver={dragOver}
                fileInputRef={fileInputRef}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                handleFilesChange={handleFilesChange}
                handleSubmit={handleSubmit}
              />
            )}

            {modalStep === "processing" && (
              <LoadingStatus text={statusMensagem} />
            )}

            {modalStep === "review" && (
              <ReviewExtractedFields
                fields={dadosExtraidos}
                setFields={setDadosExtraidos}
                onConfirm={handleReviewConfirm}
              />
            )}

            {modalStep === "done" && <SuccessMessage />}
          </ModalContent>
        </ModalBackdrop>
      )}
    </Container>
  );
}
