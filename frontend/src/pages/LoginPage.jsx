import React from "react";
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
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <LoginContainer>
      <FormSection>
        <Form>
          <Title>Bem-vindo ao LexIA</Title>
          <Subtitle>Entre com seu e-mail e senha para continuar.</Subtitle>

          <Input type="email" placeholder="Seu e-mail" />
          <Input type="password" placeholder="Sua senha" />

          <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <StyledLink to="/esqueci-senha">Esqueceu a senha?</StyledLink>
          </div>

          <Button type="submit">Entrar</Button>

          <OAuthContainer>
            <OAuthButton>Google</OAuthButton>
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
