import styled from "styled-components";

const colors = {
  background: "#f4f4fc",
  textPrimary: "#2d2d2d",
  textSecondary: "#999",
  accent: "#2d2d2d",
  accentHover: "#e6ce92",
  white: "#ffffff",
  green: "#048530",
  yellow: "#c49400",
  greenBg: "#e3faeb",
  yellowBg: "#fff4d4",
  border: "#ccc",
};

const defaultFont = `"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`;
const shadow = `0 2px 8px rgba(0, 0, 0, 0.06)`;

export const Container = styled.div`
  background: ${colors.background};
  min-height: 100vh;
  padding: 6rem 1rem 2rem 1rem;
  font-family: ${defaultFont};
  color: ${colors.textPrimary};
  box-sizing: border-box;
`;

export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${colors.accent};
  padding: 1.5rem 2rem;
  z-index: 1000;
  box-shadow: ${shadow};
`;

export const HeaderContentWrapper = styled.div`
  max-width: 1270px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${colors.white};
  margin: 0;
`;

export const NavMenu = styled.nav`
  display: flex;
  gap: 2rem;

  a {
    color: ${colors.white};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      color: ${colors.accentHover};
    }
  }
`;

export const UsuarioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NomeUsuario = styled.span`
  color: ${colors.white};
  font-weight: 600;
`;

export const AvatarMenuWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const AvatarCirculo = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${colors.accentHover};
  color: ${colors.accent};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 45px;
  right: 0;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  box-shadow: ${shadow};
  z-index: 999;

  li {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    color: ${colors.textPrimary};
    cursor: pointer;

    &:hover {
      background-color: ${colors.accentHover};
    }
  }
`;

export const Subtitulo = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
`;

export const WrapperCentralizado = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

export const CreateButton = styled.button`
  background-color: ${colors.accent};
  color: ${colors.white};
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: ${shadow};


  &:hover {
    background-color: ${colors.accentHover};
    color: ${colors.textPrimary};
  }
`;

export const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${shadow};
`;

export const TabelaHeader = styled.thead`
  background-color: #f5f5f5;

  th {
    text-align: left;
    padding: 1rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
  }
`;

export const TabelaRow = styled.tr`
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #fafafa;
  }
`;

export const TabelaCelula = styled.td`
  padding: 1rem;
  font-size: 0.95rem;
`;

export const StatusTag = styled.span`
  color: ${(props) => (props.ativo ? colors.green : colors.yellow)};
  background-color: ${(props) => (props.ativo ? colors.greenBg : colors.yellowBg)};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalContent = styled.div`
  background: ${colors.background};
  padding: 2.5rem;
  border-radius: 12px;
  width: 480px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${shadow};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: 1rem;
`;

export const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: ${colors.accent};
  color: ${colors.white};
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.accentHover};
    color: ${colors.textPrimary};
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
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

export const ActionsBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
`;

export const TituloComAcoes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;


