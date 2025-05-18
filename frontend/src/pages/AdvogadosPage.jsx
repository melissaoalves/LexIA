import React, { useState,  useEffect  } from "react";
import axios from "axios";

import {
  Container,
  Header,
  HeaderContentWrapper,
  Title,
  HeaderLeftGroup,
  NavMenu,
  UsuarioWrapper,
  NomeUsuario,
  AvatarMenuWrapper,
  AvatarCirculo,
  DropdownMenu,
  Subtitulo,
  WrapperCentralizado,
  CreateButton,
  Tabela,
  TabelaHeader,
  TabelaRow,
  TabelaCelula,
  ModalBackdrop,
  ModalContent,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  TituloComAcoes
} from "./AdvogadosStyles";

export default function Advogados() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaOAB, setNovaOAB] = useState("");
  const [advogados, setAdvogados] = useState([
    {
      id: 1,
      nome: "Beatriz Correia da Silva Siqueira",
      email: "beatrizsiquiera@hotmail.com",
      oab: "12345/SP",
    },
    {
      id: 2,
      nome: "Fernando Oliveira Veres da Luz",
      email: "fernandooliveiraveres@gmail.com",
      oab: "67890/RJ",
    },
  ]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const adicionarAdvogado = () => {
    const novo = {
      id: Date.now(),
      nome: novoNome,
      email: novoEmail,
      oab: novaOAB,
    };
    setAdvogados((prev) => [...prev, novo]);
    setNovoNome("");
    setNovoEmail("");
    setNovaOAB("");
    setModalOpen(false);
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
            setNomeUsuario(response.data.nome);
        }
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                // token expirado ou inválido
                localStorage.clear();
                window.location.href = "/login";
            } else {
                console.log("Erro ao buscar escritório:", error);
            }
            });

    }, []);


  return (
    <Container>
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

      <WrapperCentralizado>
        <TituloComAcoes>
            <Subtitulo>Gestão de Advogados</Subtitulo>
            <CreateButton onClick={() => setModalOpen(true)}>Adicionar Advogado</CreateButton>
        </TituloComAcoes>
      </WrapperCentralizado>

    <WrapperCentralizado>
        <Tabela>
          <TabelaHeader>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>OAB</th>
            </tr>
          </TabelaHeader>
          <tbody>
            {advogados.map((adv) => (
              <TabelaRow key={adv.id}>
                <TabelaCelula>
                  <strong>{adv.nome}</strong>
                </TabelaCelula>
                <TabelaCelula>{adv.email}</TabelaCelula>
                <TabelaCelula>{adv.oab}</TabelaCelula>
              </TabelaRow>
            ))}
          </tbody>
        </Tabela>
      </WrapperCentralizado>

      {modalOpen && (
        <ModalBackdrop>
          <ModalContent>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                fontSize: "1.5rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <h2 style={{ marginBottom: "1.5rem" }}>
              Cadastrar Novo Advogado
            </h2>
            <FormGroup>
              <Label>Nome</Label>
              <Input
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>OAB</Label>
              <Input
                value={novaOAB}
                onChange={(e) => setNovaOAB(e.target.value)}
              />
            </FormGroup>
            <SubmitButton onClick={adicionarAdvogado}>Cadastrar</SubmitButton>
          </ModalContent>
        </ModalBackdrop>
      )}
    </Container>
  );
}
