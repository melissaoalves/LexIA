import React, { useState, useEffect } from "react";
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
  TituloComAcoes,
  CloseButton,
  ModalHeading,
} from "./AdvogadosStyles";
import { FaTrash } from "react-icons/fa";

export default function Advogados() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaOAB, setNovaOAB] = useState("");
  const [advogados, setAdvogados] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const isEmailValido = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const buscarAdvogados = () => {
    const token = localStorage.getItem("accessToken");

    axios
      .get("http://localhost:8000/advogados/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAdvogados(res.data);
      })
      .catch((err) => {
        console.log("Erro ao buscar advogados:", err);
      });
  };

  const adicionarAdvogado = async () => {
    const token = localStorage.getItem("accessToken");

    if (!novoNome || !novoEmail || !novaOAB) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!isEmailValido(novoEmail)) {
      alert("Digite um e-mail válido.");
      return;
    }

    try {
      const { data: escritorio } = await axios.get("http://localhost:8000/escritorio/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const payload = {
        nome: novoNome.trim(),
        email: novoEmail.trim(),
        oab: novaOAB.trim(),
        escritorio: escritorio.id,
      };

      const { data: advogadoCriado } = await axios.post(
        "http://localhost:8000/advogados/",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAdvogados((prev) => [...prev, advogadoCriado]);
      setNovoNome("");
      setNovoEmail("");
      setNovaOAB("");
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar advogado:", error);
      console.log("Detalhes:", error.response?.data);
    }
  };

  const deletarAdvogado = async (id) => {
    const confirmacao = window.confirm("Deseja mesmo excluir este advogado?");
    if (!confirmacao) return;

    const token = localStorage.getItem("accessToken");

    try {
      await axios.delete(`http://localhost:8000/advogados/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdvogados((prev) => prev.filter((adv) => adv.id !== id));
    } catch (error) {
      console.error("Erro ao deletar advogado:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axios
      .get("http://localhost:8000/escritorio/me/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { nome } = response.data;
        setNomeUsuario(nome);
        buscarAdvogados();
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
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
          <CreateButton onClick={() => setModalOpen(true)}>
            Adicionar Advogado
          </CreateButton>
        </TituloComAcoes>
      </WrapperCentralizado>

      <WrapperCentralizado>
        <Tabela>
          <TabelaHeader>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>OAB</th>
              <th>Ações</th>
            </tr>
          </TabelaHeader>
          <tbody>
            {advogados.map((adv) => (
              <TabelaRow key={adv.id}>
                <TabelaCelula><strong>{adv.nome}</strong></TabelaCelula>
                <TabelaCelula>{adv.email}</TabelaCelula>
                <TabelaCelula>{adv.oab}</TabelaCelula>
                <TabelaCelula>
                  <button
                    onClick={() => deletarAdvogado(adv.id)}
                    title="Excluir advogado"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#b00",
                      fontSize: "1.1rem",
                    }}
                  >
                    <FaTrash />
                  </button>
                </TabelaCelula>
              </TabelaRow>
            ))}
          </tbody>
        </Tabela>
      </WrapperCentralizado>

      {modalOpen && (
        <ModalBackdrop>
          <ModalContent>
            <CloseButton onClick={() => setModalOpen(false)}>&times;</CloseButton>
            <ModalHeading>Cadastrar Novo Advogado</ModalHeading>

            <FormGroup>
              <Label>Nome</Label>
              <Input
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Digite o nome"
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
                placeholder="exemplo@email.com"
              />
            </FormGroup>
            <FormGroup>
              <Label>OAB</Label>
              <Input
                value={novaOAB}
                onChange={(e) => setNovaOAB(e.target.value)}
                placeholder="12345/SP"
              />
            </FormGroup>
            <SubmitButton onClick={adicionarAdvogado}>Cadastrar</SubmitButton>
          </ModalContent>
        </ModalBackdrop>
      )}
    </Container>
  );
}
