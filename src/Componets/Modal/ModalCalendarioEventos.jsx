import { useState, useEffect } from "react";
import Modal from "react-modal";
import ApiService from "../../services/ApiService";
import ToastService from "../../services/ToastService";
import styles from "./ModalCadastroProjeto.module.css";
import Multiselect from "multiselect-react-dropdown";
import "@schedule-x/theme-default/dist/index.css";

export default function ModalCadastroEvento({
  modalAberto,
  setModalAberto,
  buscarEventos,
  dataHora
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  Modal.setAppElement("#root");

  const [usuarios, setUsuarios] = useState([])
  const [usuarioAtribuido, setUsuarioAtribuido] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [idProjetoSelecionado, setIdProjetoSelecionado] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
 
  async function Cadastrar() {
    try {

      const usuariosAtribuidos = usuarioAtribuido.map((usuario) => ( usuario.id ));

      const body = {
        titulo,
        descricao,
        dataHora,
        projetoID: idProjetoSelecionado,
        usuariosAtribuidos
      };

      await ApiService.post("/Eventos/CriarEvento", body);

      setModalAberto(false);
      ToastService.Success("Evento Criado com Sucesso");
      // await buscarEventos();
    } catch (error) {
      ToastService.Error("Erro ao Criar Evento");
    }
  }

  async function BuscarProjetos() {
    try {
      const response = await ApiService.get("/Projeto/listarProjeto");
      setProjetos(response.data);
    } catch (error) {
      ToastService.Error("Erro ao Listar Seus Projetos");
    }
  }

  async function BuscarUsuarios() {
    try {
      const response = await ApiService.get("/Usuario/listarUsuarios");
      setUsuarios(response.data);
    } catch (error) {
      ToastService.Error("Erro ao Listar Usuarios");
    }
  }

  useEffect(() => {
    BuscarProjetos();
    BuscarUsuarios();
  }, []);


  function FecharModal() {
    setModalAberto(false);
  }

  function quandoSelecionadoUsuario(selectedList, selectedItem) {
    setUsuarioAtribuido([...usuarioAtribuido, selectedItem]);
  }

  function selectAlterado(event) {
    setIdProjetoSelecionado(event.target.value);
  }

  function quandoRemoverUsuario(selectedList, removedItem) {
    setUsuarioAtribuido(
      usuarioAtribuido.filter((user) => user.id !== removedItem.id)
    );
  }

  return (
    <Modal
      isOpen={modalAberto}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={FecharModal}
    >
      <h2 className={styles.title}>Criar Evento</h2>
      <button onClick={FecharModal}>Fechar</button>
      <input
        className={styles.nomeDescProjeto}
        placeholder="Nome"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        className={styles.nomeDescProjeto}
        placeholder="Descricao"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />{/*
      <input
        placeholder="Data de Entrega"
        value={dataEntrega}
        type="date"
        onChange={(e) => setDataEntrega(dataHora)}
  />*/}
      <Multiselect
        options={usuarios}
        selectedValues={usuarioAtribuido}
        onSelect={quandoSelecionadoUsuario}
        onRemove={quandoRemoverUsuario}
        displayValue="nome"/>

        <select value={idProjetoSelecionado} onChange={selectAlterado}>
          <option value="" disabled>
            Selecione Um Projeto
          </option>
          {projetos.map((projeto) => (
            <option key={projeto.id} value={projeto.id}>
              {projeto.nome}
            </option>
          ))}
        </select>
      
      <button className={styles.button} onClick={Cadastrar}>Cadastrar</button>
    </Modal>
  );
}