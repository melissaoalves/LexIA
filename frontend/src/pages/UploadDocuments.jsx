import React, { useState, useEffect, useRef } from "react";
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
} from "./PeticoesStyles";
import { FaTrash, FaDownload } from "react-icons/fa";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [peticoes, setPeticoes] = useState([]);
  const [filteredPeticoes, setFilteredPeticoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

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
      {
        id: 3,
        nomeCliente: "Lucas Pereira",
        status: "Concluído",
        dataCriacao: "2025-05-14",
        arquivo_peticao_url: "/files/peticao_3.docx",
      },
      {
        id: 4,
        nomeCliente: "Joãgo Silva",
        status: "Concluído",
        dataCriacao: "2025-05-10",
        arquivo_peticao_url: "/files/peticao_1.docx",
      },
      {
        id: 5,
        nomeCliente: "Mariaa Santos",
        status: "Em andamento",
        dataCriacao: "2025-05-12",
        arquivo_peticao_url: "/files/peticao_2.docx",
      },
      {
        id: 6,
        nomeCliente: "Lucass Pereira",
        status: "Concluído",
        dataCriacao: "2025-05-14",
        arquivo_peticao_url: "/files/peticao_3.docx",
      },
      {
        id: 7,
        nomeCliente: "Joãfgo Siglva",
        status: "Concluído",
        dataCriacao: "2025-05-10",
        arquivo_peticao_url: "/files/peticao_1.docx",
      },
      {
        id: 8,
        nomeCliente: "Marsia Ssantos",
        status: "Em andamento",
        dataCriacao: "2025-05-12",
        arquivo_peticao_url: "/files/peticao_2.docx",
      },
      {
        id: 9,
        nomeCliente: "Lucas Persseira",
        status: "Concluído",
        dataCriacao: "2025-05-14",
        arquivo_peticao_url: "/files/peticao_3.docx",
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
    alert(`${selectedFiles.length} arquivos selecionados para upload.`);
    setModalOpen(false);
    setSelectedFiles([]);
  };

  return (
    <Container>
      <Header>
        <Title>Minhas Petições</Title>
      </Header>

      <SearchWrapper>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Buscar petições..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <CreateButton onClick={() => setModalOpen(true)}>
          Gerar / Criar Petição
        </CreateButton>

      </SearchWrapper>

      <PeticoesContainer>
        {filteredPeticoes.map((peticao) => (
          <PeticaoCard key={peticao.id}>
            <PeticaoInfo>
                <ClienteNome>{peticao.nomeCliente}</ClienteNome>
                <ClienteDetalhes>
                    Status: <StatusText concluido={peticao.status === "Concluído"}>{peticao.status}</StatusText> <br />
                    Data de criação: {peticao.dataCriacao}
                </ClienteDetalhes>
            </PeticaoInfo>
            <DownloadButton href={peticao.arquivo_peticao_url} download>
              <FaDownload />
            </DownloadButton>
          </PeticaoCard>
        ))}
      </PeticoesContainer>

      {modalOpen && (
        <ModalBackdrop onClick={() => setModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Enviar documentos</h2>

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
                    <FileThumbnail src={getFileThumbnail(file)} alt={file.name} />
                    <FileDetailsWrapper>
                      <FileName>{file.name}</FileName>
                      <FileDetails>
                        {file.name.split(".").pop().toUpperCase()} • {formatFileSize(file.size)}
                      </FileDetails>
                    </FileDetailsWrapper>
                  </FileInfo>
                  <RemoveButton onClick={() => removerArquivo(index)} title="Remover arquivo">
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
          </ModalContent>
        </ModalBackdrop>
      )}
    </Container>
  );
}
