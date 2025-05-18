import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Header,
  Title,
  CreateButton,
  PeticoesContainer,
  PeticaoCard,
  PeticaoInfo,
  DownloadButton,
  ModalBackdrop,
  ModalContent,
  DragDropArea,
  HiddenFileInput,
  SubmitButton,
  FileList,
  FileListItem,
  FileInfo,
  FileThumbnail,
  FileDetailsWrapper,
  FileName,
  FileDetails,
  RemoveButton,
  SearchInput,
  SearchWrapper,
  SearchIcon,
  ClienteNome,
  ClienteDetalhes,
  StatusText,
  WrapperCentralizado,
  SearchInputWrapper,
  HeaderContentWrapper,
  AvatarCirculo,
  NomeUsuario,
  UsuarioWrapper,
  AvatarMenuWrapper,
  DropdownMenu,
  Subtitulo,
  WrapperLeft,
  NavMenu,
  HeaderLeftGroup
} from "./PeticoesStyles";
import { FaTrash, FaDownload } from "react-icons/fa";
import OfficeDataModal from "../components/OfficeDataModal";

const LoadingBar = () => (
  <div
    style={{
      marginTop: "1rem",
      height: "10px",
      width: "100%",
      backgroundColor: "#eee",
      borderRadius: "8px",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "30%",
        backgroundColor: "#2d2d2d",
        animation: "loadingAnim 1.2s infinite",
      }}
    />
    <style>{`
      @keyframes loadingAnim {
        0% { left: -30%; }
        50% { left: 100%; }
        100% { left: 100%; }
      }
    `}</style>
  </div>
);

function formatFileSize(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function getFileThumbnail(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "pdf")
    return "https://cdn-icons-png.flaticon.com/512/337/337946.png";
  if (ext === "doc" || ext === "docx")
    return "https://cdn-icons-png.flaticon.com/512/337/337932.png";
  if (ext === "png" || ext === "jpg" || ext === "jpeg")
    return URL.createObjectURL(file);
  return "https://cdn-icons-png.flaticon.com/512/565/565547.png";
}

export default function Peticoes() {
  const [loadingEscritorio] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [peticoes, setPeticoes] = useState([]);
  const [filteredPeticoes, setFilteredPeticoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const [modalStep, setModalStep] = useState("upload");
  const [extractedText, setExtractedText] = useState("");
  const [selectedAdvogados, setSelectedAdvogados] = useState([]);
  const [showOfficeModal, setShowOfficeModal] = useState(true);

  const advogadosDisponiveis = [
    { id: 1, nome: "Dr. Ana Paula" },
    { id: 2, nome: "Dr. Carlos Souza" },
    { id: 3, nome: "Dr. Letícia Almeida" },
  ];

  const simularExtracaoTexto = () => {
    setModalStep("loading");
    setTimeout(() => {
      setExtractedText("Exemplo de texto extraído do documento para edição...");
      setModalStep("edit");
    }, 2000);
  };

  const toggleAdvogado = (id) => {
    setSelectedAdvogados((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchedPeticoes = [
      {
        id: 1,
        nomeCliente: "João Silva",
        status: "Concluído",
        dataCriacao: "2025-05-10",
        arquivo_peticao_url: "/files/peticao_1.docx",
      },
      {
        id: 2,
        nomeCliente: "Maria Santos",
        status: "Em andamento",
        dataCriacao: "2025-05-12",
        arquivo_peticao_url: "/files/peticao_2.docx",
      },
    ];
    setPeticoes(fetchedPeticoes);
    setFilteredPeticoes(fetchedPeticoes);
  }, []);

  useEffect(() => {
    const filtered = peticoes.filter((peticao) =>
      peticao.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeticoes(filtered);
  }, [searchTerm, peticoes]);

  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    e.target.value = null;
  };

  const removerArquivo = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles((prev) => [...prev, ...droppedFiles]);
      e.dataTransfer.clearData();
    }
  };

  const handleSubmit = () => {
    if (selectedFiles.length === 0) return;
    simularExtracaoTexto();
  };

  const handleOfficeSubmit = async (formData) => {
    const token = localStorage.getItem("accessToken");

    console.log("Token JWT recuperado:", token);

    if (!token) {
      alert("Usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
      // Confirma os dados que estão sendo enviados
      console.log("Payload enviado:", formData);

      const response = await axios.patch(
        "http://localhost:8000/escritorio/me/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // DEBUG: Verifica a resposta da API
      console.log("Resposta da API:", response.data);

      setShowOfficeModal(false);
    } catch (error) {
      // DEBUG: Detalha erro de autenticação ou outro
      if (error.response) {
        console.error("Erro ao salvar dados do escritório:", {
          status: error.response.status,
          data: error.response.data,
        });

        if (error.response.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          alert("Erro ao salvar dados. Verifique os campos e tente novamente.");
        }
      } else {
        console.error("Erro na requisição:", error.message);
        alert("Erro de conexão com o servidor.");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const nomeSalvo = localStorage.getItem("nome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);

    axios
      .get("http://localhost:8000/escritorio/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.nome) {
          setShowOfficeModal(false); // escritório já está cadastrado
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          console.log("Erro ao buscar escritório:", error);
          setShowOfficeModal(true);
        }
      });
  }, []);


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
        <SearchWrapper>
          <SearchInputWrapper>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Buscar petições..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInputWrapper>

          <CreateButton
            onClick={() => {
              setModalOpen(true);
              setModalStep("upload");
              setSelectedFiles([]);
              setExtractedText("");
              setSelectedAdvogados([]);
            }}
          >
            Gerar / Criar Petição
          </CreateButton>
        </SearchWrapper>

        <PeticoesContainer>
          {filteredPeticoes.map((peticao) => (
            <PeticaoCard key={peticao.id}>
              <PeticaoInfo>
                <ClienteNome>{peticao.nomeCliente}</ClienteNome>
                <ClienteDetalhes>
                  Status:{" "}
                  <StatusText concluido={peticao.status === "Concluído"}>
                    {peticao.status}
                  </StatusText>
                  <br />
                  Data de criação: {peticao.dataCriacao}
                </ClienteDetalhes>
              </PeticaoInfo>
              <DownloadButton href={peticao.arquivo_peticao_url} download>
                <FaDownload />
              </DownloadButton>
            </PeticaoCard>
          ))}
        </PeticoesContainer>
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

            <h2>Enviar documentos</h2>

            {modalStep === "upload" && (
              <>
                <DragDropArea
                  className={dragOver ? "drag-over" : ""}
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  Clique ou arraste os arquivos aqui para enviar
                </DragDropArea>

                <HiddenFileInput
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.docx,.png,.jpg,.jpeg"
                  onChange={handleFilesChange}
                />

                <FileList>
                  {selectedFiles.map((file, index) => (
                    <FileListItem key={index}>
                      <FileInfo>
                        <FileThumbnail
                          src={getFileThumbnail(file)}
                          alt={file.name}
                        />
                        <FileDetailsWrapper>
                          <FileName>{file.name}</FileName>
                          <FileDetails>
                            {file.name.split(".").pop().toUpperCase()} •{" "}
                            {formatFileSize(file.size)}
                          </FileDetails>
                        </FileDetailsWrapper>
                      </FileInfo>
                      <RemoveButton
                        onClick={() => removerArquivo(index)}
                        title="Remover arquivo"
                      >
                        <FaTrash size={18} />
                      </RemoveButton>
                    </FileListItem>
                  ))}
                </FileList>

                <SubmitButton
                  disabled={selectedFiles.length === 0}
                  onClick={handleSubmit}
                >
                  Enviar Documentos
                </SubmitButton>
              </>
            )}

            {modalStep === "loading" && (
              <div>
                <p>Lendo documento...</p>
                <LoadingBar />
              </div>
            )}

            {modalStep === "edit" && (
              <div>
                <label>Texto extraído (editável):</label>
                <textarea
                  rows={8}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "8px",
                    marginTop: "0.5rem",
                  }}
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                />
                <SubmitButton onClick={() => setModalStep("select")}>
                  Confirmar texto
                </SubmitButton>
              </div>
            )}

            {modalStep === "select" && (
              <div>
                <h3>Selecionar advogados</h3>
                {advogadosDisponiveis.map((adv) => (
                  <label
                    key={adv.id}
                    style={{ display: "block", marginBottom: "0.5rem" }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAdvogados.includes(adv.id)}
                      onChange={() => toggleAdvogado(adv.id)}
                    />{" "}
                    {adv.nome}
                  </label>
                ))}

                {selectedAdvogados.length > 0 && (
                  <SubmitButton onClick={() => alert("Petição gerada!")}>
                    Gerar Petição
                  </SubmitButton>
                )}
              </div>
            )}
          </ModalContent>
        </ModalBackdrop>
      )}
    </Container>
  );
}
