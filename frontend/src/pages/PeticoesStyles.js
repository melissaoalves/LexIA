import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const colors = {
  background: "#f4f4fc",
  textPrimary: "#ffffff",
  textSecondary: "#b0b0b0",
  textTerciary: "#2d2d2d",
  border: "#cccccc",
  accent: "#2d2d2d",
  accentHover: "#e6ce92",
  lightGray: "#ffffff",
  tagBg: "#ffdfa1",
  tagText: "#ffffff",
  marginTop: "#ffdfa1"
};

const defaultFont = `"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`;
const shadow = `0 2px 8px rgba(0, 0, 0, 0.06)`;

export const Container = styled.div`
  background: ${colors.background};
  min-height: 100vh;
  padding: 6rem 1rem 2rem 1rem;
  font-family: ${defaultFont};
  color: ${colors.textTerciary};
  box-sizing: border-box;
  box-shadow: ${shadow};
`;

export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: ${colors.accent};
  display: flex;
  justify-content: center;
  padding: 1.5rem 2rem;
  z-index: 1000;
  font-family: ${defaultFont};
  box-shadow: ${shadow};
`;

export const HeaderContentWrapper = styled.div`
  width: 100%;
  max-width: 1270px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${defaultFont};
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 2.0rem;
  color: ${colors.textPrimary};
  font-family: ${defaultFont};
  letter-spacing: 1px;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

export const Subtitulo = styled.h2`
  font-family: ${defaultFont};
  font-size: 1.75rem;
  font-weight: 700;
  text-align: left;
  margin: 1.2rem 0 1.2rem 1rem;
  color: ${colors.textTerciary};

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

export const SearchTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${colors.textTerciary};
  margin-bottom: 0.5rem;
  font-family: ${defaultFont};

  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const CreateButton = styled.button`
  padding: 0.6rem 1.9rem;
  background-color: ${colors.accent};
  color: ${colors.tagText};
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: ${defaultFont};
  box-shadow: ${shadow};

  &:hover {
    background-color: ${colors.accentHover};
  }

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

export const PeticoesContainer = styled.div`
  background: ${colors.lightGray};
  border-radius: 12px;
  border: 1px solid ${colors.border};
  width: 100%;
  height: calc(100vh - 260px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  font-family: ${defaultFont};
  box-shadow: ${shadow};

  @media (max-width: 600px) {
    height: auto;
  }
`;

export const PeticaoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-family: ${defaultFont};
`;


export const PeticaoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background-color: ${colors.lightGray};
  transition: background-color 0.2s ease;
  font-family: ${defaultFont};
  box-shadow: ${shadow};

  &:hover {
    background-color: rgba(224, 224, 224, 0.57);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const ClienteNome = styled.span`
  font-weight: 600;
  font-size: 1rem;
  font-family: ${defaultFont};
`;

export const ClienteDetalhes = styled.span`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  font-family: ${defaultFont};
  line-height: 1.6; /* aumenta o espaçamento entre linhas */
`;

export const DownloadButton = styled.a`
  margin-left: auto;
  padding: 0.5rem;
  border-radius: 6px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.accent};
  transition: background-color 0.3s ease;
  font-family: ${defaultFont};
  box-shadow: ${shadow};

  &:hover {
    color: ${colors.accentHover};
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${defaultFont};
`;

export const ModalContent = styled.div`
  background: ${colors.background};
  border-radius: 12px;
  padding: 2rem;
  width: 480px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  font-family: ${defaultFont};
  box-shadow: ${shadow};
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
  font-family: ${defaultFont};
  box-shadow: ${shadow};

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
  font-family: ${defaultFont};
  box-shadow: ${shadow};

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
  font-family: ${defaultFont};
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
  font-family: ${defaultFont};
  box-shadow: ${shadow};
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: ${defaultFont};
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
  font-family: ${defaultFont};
`;

export const FileName = styled.span`
  font-weight: 600;
  font-family: ${defaultFont};
`;

export const FileDetails = styled.span`
  font-size: 0.85rem;
  color: ${colors.textSecondary};
  font-family: ${defaultFont};
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
  color: ${colors.textTerciary};
  display: flex;
  align-items: center;
  font-family: ${defaultFont};

  &:hover {
    color: #b00020;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
  font-family: ${defaultFont};
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  min-width: 250px;
  font-family: ${defaultFont};

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  min-width: 0;
  width: 90%;
  padding: 0.6rem 1rem 0.6rem 2.7rem;
  font-size: 1rem;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  outline: none;
  background-color: ${colors.lightGray};
  color: ${colors.textTerciary};
  font-family: ${defaultFont};
  box-shadow: ${shadow};

  &::placeholder {
    color: ${colors.textSecondary};
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: ${colors.textSecondary};
  pointer-events: none;
`;

export const StatusText = styled.span`
  color: ${(props) => (props.concluido ? "#048530" : "#c49400")};
  background-color: ${(props) => (props.concluido ? "#e3faeb" : "#fff4d4")};
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  font-family: ${defaultFont};
`;

export const WrapperCentralizado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  font-family: ${defaultFont};
`;

export const WrapperLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  max-width: 1330px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  font-family: ${defaultFont};
`;

export const TextAreaEditavel = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${colors.border};
  font-size: 1rem;
  resize: vertical;
  background-color: ${colors.lightGray};
  color: ${colors.textTerciary};
  font-family: ${defaultFont};
  box-shadow: ${shadow};
`;

export const LoadingBar = styled.div`
  margin-top: 1rem;
  height: 10px;
  width: 100%;
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  font-family: ${defaultFont};
  box-shadow: ${shadow};

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 30%;
    background-color: ${colors.accent};
    animation: loadingAnim 1.2s infinite;
  }

  @keyframes loadingAnim {
    0% { left: -30%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }
`;

export const DadosModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  font-family: ${defaultFont};
`;

export const DadosModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  font-family: ${defaultFont};
  box-shadow: ${shadow};
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  font-family: ${defaultFont};
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-family: ${defaultFont};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: 1rem;
  background: ${colors.lightGray};
  color: ${colors.textTerciary};
  font-family: ${defaultFont};
  box-shadow: ${shadow};
`;

export const UsuarioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: ${defaultFont};
`;

export const NomeUsuario = styled.span`
  font-weight: 600;
  color: ${colors.textPrimary};
  font-family: ${defaultFont};
`;

export const AvatarCirculo = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${colors.accentHover};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.accent};
  font-weight: bold;
  text-transform: uppercase;
  font-family: ${defaultFont};
  box-shadow: ${shadow};
`;

export const AvatarMenuWrapper = styled.div`
  position: relative;
  cursor: pointer;
  font-family: ${defaultFont};
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 45px;
  right: 0;
  background-color: ${colors.lightGray};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  box-shadow: ${shadow};
  z-index: 999;
  font-family: ${defaultFont};

  li {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    color: ${colors.textTerciary};
    cursor: pointer;

    &:hover {
      background-color: ${colors.accentHover};
    }
  }
`;
