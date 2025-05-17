// LoginStyles.js
import styled from "styled-components";

const font = `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

const colors = {
  background: "#f4f4fc",
  textPrimary: "#2d2d2d",
  textSecondary: "#6b6b6b",
  accent: "#2d2d2d",
  accentHover: "#e6ce92",
  border: "#cccccc",
  light: "#ffffff"
};

export const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: ${colors.background};
  font-family: ${font};
`;

export const FormSection = styled.div`
  flex: 1;
  padding: 4rem 3rem;
  background: ${colors.light};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    padding: 2rem;
  }
`;

export const VisualSection = styled.div`
  flex: 1;
  background: #1d1d1d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Form = styled.form`
  max-width: 400px;
  margin: auto;
  width: 100%;
`;

export const Title = styled.h1`
  font-family: ${font};
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${colors.textPrimary};
`;

export const Subtitle = styled.p`
  font-family: ${font};
  font-size: 1rem;
  color: ${colors.textSecondary};
  margin-bottom: 2rem;
`;

export const Label = styled.label`
  font-family: ${font};
  font-weight: 600;
  margin-bottom: 0.4rem;
  margin-top: 1rem;
  display: block;
  color: ${colors.textPrimary};
`;

export const Input = styled.input`
  font-family: ${font};
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  margin-bottom: 0.9rem;
  font-size: 1rem;
  background: ${colors.light};
  color: ${colors.textPrimary};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);

  &::placeholder {
    color: ${colors.textSecondary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(45, 45, 45, 0.15);
    border-color: ${colors.accent};
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${colors.accent};
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  font-family: ${font};

  &:hover {
    background: ${colors.accentHover};
  }
`;

export const FooterText = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin-top: 2rem;
  font-family: ${font};

  a {
    color: ${colors.accent};
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const OAuthContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 1rem;
`;

export const OAuthButton = styled.button`
  flex: 1;
  padding: 0.6rem;
  background: white;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-family: ${font};

  &:hover {
    background: ${colors.background};
  }
`;

export const StyledLink = styled.a`
  color: ${colors.accent};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 40%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.textSecondary};
  font-size: 1rem;
  padding: 0;

  &:hover {
    color: ${colors.textPrimary};
  }
`;
