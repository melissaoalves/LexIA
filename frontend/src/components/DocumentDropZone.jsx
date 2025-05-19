import React from "react";
import {
  DragDropArea,
  HiddenFileInput,
  FileList,
  FileListItem,
  FileInfo,
  FileThumbnail,
  FileDetailsWrapper,
  FileName,
  FileDetails,
  RemoveButton,
  SubmitButton
} from "../pages/PeticoesStyles";
import { FaTrash } from "react-icons/fa";

function formatFileSize(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function getFileThumbnail(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "pdf") return "https://cdn-icons-png.flaticon.com/512/337/337946.png";
  if (["doc", "docx"].includes(ext)) return "https://cdn-icons-png.flaticon.com/512/337/337932.png";
  if (["png", "jpg", "jpeg"].includes(ext)) return URL.createObjectURL(file);
  return "https://cdn-icons-png.flaticon.com/512/565/565547.png";
}

export default function DocumentDropZone({ dragOver, fileInputRef, selectedFiles, setSelectedFiles, onDragOver, onDragLeave, onDrop, handleFilesChange, handleSubmit }) {
  const removerArquivo = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
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
              <FileThumbnail src={getFileThumbnail(file)} alt={file.name} />
              <FileDetailsWrapper>
                <FileName>{file.name}</FileName>
                <FileDetails>{file.name.split(".").pop().toUpperCase()} • {formatFileSize(file.size)}</FileDetails>
              </FileDetailsWrapper>
            </FileInfo>
            <RemoveButton onClick={() => removerArquivo(index)} title="Remover arquivo">
              <FaTrash size={18} />
            </RemoveButton>
          </FileListItem>
        ))}
      </FileList>

      <SubmitButton disabled={selectedFiles.length === 0} onClick={handleSubmit}>
        Enviar Documentos
      </SubmitButton>
    </>
  );
}
