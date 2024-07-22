import { useState, useEffect } from "react";
import Modal from "react-modal";
import ApiService from "../../services/ApiService";
import ToastService from "../../services/ToastService";
import styles from "./ModalEditarUsuario.module.css";
import "@schedule-x/theme-default/dist/index.css";

export default function ModalEditarUsuario({
  modalAberto,
  setModalAberto,
  refresh,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      border: "none",
    },
  };
  Modal.setAppElement("#root");

  const [usuario, setUsuario] = useState();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [imageSrc, setImageSrc] = useState("img.png"); // Adicionando estado para imagem

  async function Editar() {
    try {
      const body = {
        id,
        nome,
        email: "",
        senha: "",
        projetos: [],
      };

      await ApiService.put("/Usuario/EditarUsuario", body);

      setModalAberto(false);
      ToastService.Success("Usuario Editado com Sucesso");
      FecharModal();
      refresh();
    } catch (error) {
    }
  }

  async function BuscarUsuario() {
    try {
      const response = await ApiService.get("/Usuario/getuserdata");
      setNome(response.data.nome);
      setEmail(response.data.email);
      setId(response.data.id);
    } catch (error) {
      ToastService.Error("Erro ao Listar Usuarios");
    }
  }

  useEffect(() => {
    BuscarUsuario();
  }, []);

  function FecharModal() {
    setModalAberto(false);
  }

  function handleInputChange(event) {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file)); 
    }
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
      <div className={styles.container}>
        <h2 className={styles.title}>Editar Usuario</h2>
        <div className={styles.profile}>
          <img src={imageSrc} className={styles.foto} alt="Profile" /> {}
        </div>
        <input type="file" onChange={handleInputChange} />
        <div>
        <input
          className={styles.inputs}
          placeholder="Nome"
          value={email}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className={styles.inputs}
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        </div>

        <div className={styles.botaoDiv}>
          <center>
            <button className={styles.button} onClick={Editar}>Editar</button>
          </center>
        </div>
      </div>
    </Modal>
  );
}
