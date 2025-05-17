import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const colors = {
  background: "#f4f4fc",
  textPrimary: "#2d2d2d",
  textSecondary: "#b0b0b0",
  border: "#cccccc",
  accent: "#2d2d2d",
  accentHover: "#e6ce92",
  lightGray: "#ffffff",
  tagBg: "#ffdfa1",
  tagText: "#ffffff",
  marginTop: "#ffdfa1"
};

export const Container = styled.div`
  background: ${colors.background};
  min-height: 100vh;
  padding: 6rem 3rem 2rem 3rem; // Top maior para compensar header fixo
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: ${colors.textPrimary};
`;


export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: ${colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  z-index: 1000;
`;



export const Title = styled.h1`
  font-weight: 700;
  font-size: 1.75rem;
`;

export const CreateButton = styled.button`
  padding: 0.6rem 1.6rem;
  background-color: ${colors.accent};
  color: ${colors.tagText};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 3rem;


  &:hover {
    background-color: ${colors.accentHover};
  }
`;

export const PeticoesContainer = styled.div`
  background: #ccc;
  border-radius: 12px;
  border: 1px solid #cccccc; /* cor atualizada */
  height: 700px;
  width: 1300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  /* Scrollbar estilizada */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0 12px 12px 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a6a6a6;
    border-radius: 10px;
  }
`;




export const PeticaoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background-color: ${colors.lightGray};
  width: 100%;
  &:hover {
  background-color:rgba(224, 224, 224, 0.57);
}
`;

export const PeticaoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const ClienteNome = styled.span`
  font-weight: bold;
  font-size: 0.95rem;
`;

export const ClienteDetalhe = styled.span`
  color: ${colors.textSecondary};
  font-size: 0.85rem;
`;

export const DownloadButton = styled.a`
  margin-left: auto;         /* empurra para a direita */
  padding-left: 2rem;        /* distância do conteúdo */
  background: none;
  padding: 0.5rem;
  border-radius: 6px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.accent};
  transition: background-color 0.3s ease;

  &:hover {
    color: ${colors.accentHover};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;


export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: ${colors.background};
  border-radius: 12px;
  padding: 2rem;
  width: 480px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
`;

export const DragDropArea = styled.div`
  border: 2px dashed ${colors.border};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  color: ${colors.textSecondary};
  background-color: ${colors.lightGray};
  cursor: pointer;
  margin-bottom: 1rem;

  &.drag-over {
    background-color: ${colors.accentHover};
    border-color: ${colors.accent};
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const SubmitButton = styled.button`
  background-color: ${colors.accent};
  border: none;
  padding: 0.6rem 1.6rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  color: ${colors.tagText};
  margin-top: 1rem;

  &:hover {
    background-color: ${colors.accentHover};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const FileListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.lightGray};
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${colors.border};
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FileThumbnail = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 4px;
`;

export const FileDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FileName = styled.span`
  font-weight: 600;
`;

export const FileDetails = styled.span`
  font-size: 0.85rem;
  color: ${colors.textSecondary};
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
  color: ${colors.textPrimary};
  display: flex;
  align-items: center;

  &:hover {
    color: #b00020;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const SearchInput = styled.input`
  width: 60%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  font-size: 1rem;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  outline: none;
  background-color: ${colors.lightGray};
  color: ${colors.textPrimary};

  &::placeholder {
    color: ${colors.textSecondary};
  }
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 0.9rem;
  transform: translateY(-50%);
  color: ${colors.textSecondary};
`;

export const ClienteDetalhes = styled.span`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
`;

export const StatusText = styled.span`
  color: ${(props) => (props.concluido ? "#048530" : "#c49400")};
  background-color: ${(props) => (props.concluido ? "#e3faeb" : "#fff4d4")};
  padding: 0.25rem 0.6rem;
  border-radius: 999px; /* deixa o canto bem arredondado como uma tag */
  font-weight: 600;
  font-size: 0.85rem;
`;

export const TopBar = styled.div`
  width: 100%;
  background-color: #ffdfa1; // amarelo claro
  padding: 1.2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;


