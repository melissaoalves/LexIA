import React, { useState } from "react";
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
  PasswordWrapper,
  TogglePasswordButton
} from "./LoginStyles";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <LoginContainer>
      <FormSection>
        <Form>
          <Title>Criar conta do escritório</Title>
          <Subtitle>Cadastre-se para acessar a plataforma de petições.</Subtitle>

          <label>Nome do escritório</label>
          <Input
            type="text"
            placeholder="Digite o nome do escritório"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>Email</label>
          <Input
            type="email"
            placeholder="Digite o seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Senha</label>
          <PasswordWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <TogglePasswordButton
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePasswordButton>
          </PasswordWrapper>

          <label>Confirmar senha</label>
          <PasswordWrapper>
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Repita sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <TogglePasswordButton
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowConfirm(!showConfirm);
              }}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </TogglePasswordButton>
          </PasswordWrapper>

          <Button type="submit">Registrar</Button>

          <FooterText>
            Já tem uma conta?{" "}
            <Link to="/login">
              Entrar
            </Link>
          </FooterText>
        </Form>
      </FormSection>

      <VisualSection>
        <p>Transforme a advocacia com tecnologia.</p>
      </VisualSection>
    </LoginContainer>
  );
}
