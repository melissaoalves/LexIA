import React, { useState } from "react";
import axios from "axios";
import {
  LoginContainer,
  FormSection,
  VisualSection,
  Form,
  Title,
  Subtitle,
  Input,
  Button,
  FooterText,
  OAuthContainer,
  OAuthButton,
  StyledLink
} from "./LoginStyles";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login/", {
        email,
        password: senha,
      });

      const { access, refresh, nome } = response.data;

      // Salva os tokens no localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("nome", nome);

      // Redireciona para a página de petições
      navigate("/peticoes");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Credenciais inválidas. Verifique email e senha.");
    }
  };

  return (
    <LoginContainer>
      <FormSection>
        <Form onSubmit={handleLogin}>
          <Title>Bem-vindo ao LexIA</Title>
          <Subtitle>Entre com seu e-mail e senha para continuar.</Subtitle>

          <Input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <StyledLink to="/esqueci-senha">Esqueceu a senha?</StyledLink>
          </div>

          <Button type="submit">Entrar</Button>

          <OAuthContainer>
            <OAuthButton disabled>Google</OAuthButton>
          </OAuthContainer>

          <FooterText>
            Não tem conta? <Link to="/registrar">Registrar</Link>
          </FooterText>
        </Form>
      </FormSection>

      <VisualSection>
        <p>Deixe a burocracia com a gente. Você só precisa enviar os documentos.</p>
      </VisualSection>
    </LoginContainer>
  );
}
