import { createContext, ReactNode, useState, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

interface perfilProfissionalContextData{
    checked: boolean,
    setChecked: React.Dispatch<SetStateAction<boolean>>;
    usuario?: PerfilUsuario,
    setUsuario: React.Dispatch<SetStateAction<PerfilUsuario | undefined>>,
    modalDescription: boolean, 
    setModalDescription: React.Dispatch<SetStateAction<boolean>>,
    inputDescription: string, 
    setInputDescription: React.Dispatch<SetStateAction<string>>,
    modalFotoPerfil: boolean,
    setModalFotoPerfil: React.Dispatch<SetStateAction<boolean>>,
    inputFotoPerfil: string, 
    setInputFotoPerfil: React.Dispatch<SetStateAction<string>>,
    modalNomePerfil: boolean, 
    setModalNomePerfil: React.Dispatch<SetStateAction<boolean>>,
    inputNome: string, 
    setInputNome: React.Dispatch<SetStateAction<string>>,
    modalLocalidade: boolean, 
    setModalLocalidade: React.Dispatch<SetStateAction<boolean>>,
    inputLocalidade: string, 
    setInputLocalidade: React.Dispatch<SetStateAction<string>>,
    modalContato: boolean, 
    setModalContato: React.Dispatch<SetStateAction<boolean>>, 
    inputContato: string,
    setInputContato: React.Dispatch<SetStateAction<string>>,
    reaload: boolean,
    setReload: React.Dispatch<SetStateAction<boolean>>,
    trocarFotoDePerfil: () => void,
    trocarNome: () => void,
    trocarLocalidade: () => void,
    trocarDescricao: () => void,
    trocarContato: () => void,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    editarPerfil: boolean,
    setEditarPerfil: React.Dispatch<SetStateAction<boolean>>,
}

interface perfilProfissionalProviderProps{
    children: ReactNode
}

interface PerfilUsuario {
    CPF: number;
    areaDeAtuacao: string;
    email: string;
    id: number;
    isOng: boolean;
    nome: string;
    password: string;
    registroProfissional: string;
    img?: string;
    cidade?: string;
    contato?: string;
    disponivel: boolean;
    description: string;
    userId?: string;
  }
  

export const perfilProfissionalContext = createContext({} as perfilProfissionalContextData)

export const PerfilProfissionalProvider = ({ children, }: perfilProfissionalProviderProps) => {
    
    const [checked, setChecked] = useState<boolean>(true)

    const [usuario, setUsuario] = useState<PerfilUsuario>();

    const [modalDescription, setModalDescription] = useState<boolean>(false);
    const [inputDescription, setInputDescription] = useState<string>("");

    const [modalFotoPerfil, setModalFotoPerfil] = useState<boolean>(false);
    const [inputFotoPerfil, setInputFotoPerfil] = useState<string>("");

    const [modalNomePerfil, setModalNomePerfil] = useState<boolean>(false);
    const [inputNome, setInputNome] = useState<string>("");

    const [modalLocalidade, setModalLocalidade] = useState<boolean>(false);
    const [inputLocalidade, setInputLocalidade] = useState<string>("");

    const [modalContato, setModalContato] = useState<boolean>(false);
    const [inputContato, setInputContato] = useState<string>("");

    const [editarPerfil, setEditarPerfil] = useState(false);

    const [reaload, setReload] = useState<boolean>(false);

    useEffect(() => {
        const id = localStorage.getItem("@HorasDeVida:Id");
        api.get(`/users/${id}`).then((response) => setUsuario(response.data));
    }, [reaload]);

    function trocarFotoDePerfil() {
        const token = localStorage.getItem("@HorasDeVida:Token");

        api
        .patch(
            `/users/${usuario?.id}`,
            {
            img: `${inputFotoPerfil}`,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
        .then((res) => {
            toast.success("Foto alterada com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setModalFotoPerfil(!modalFotoPerfil);
            setReload(!reaload);
        })
        .catch((res) => {
            toast.error("Ops , algo deu errado!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setModalFotoPerfil(!modalFotoPerfil);
        });
    }

    function trocarNome() {
        const token = localStorage.getItem("@HorasDeVida:Token");

        api
        .patch(
            `/users/${usuario?.id}`,
            {
            nome: `${inputNome}`,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
        .then((res) => {
            toast.success("Nome alterado com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setModalNomePerfil(!modalNomePerfil);
            setReload(!reaload);
        })
        .catch((res) => {
            toast.error("Ops , algo deu errado!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setModalNomePerfil(!modalNomePerfil);
        });
    }

    function trocarLocalidade() {
        const token = localStorage.getItem("@HorasDeVida:Token");

        api
        .patch(
            `/users/${usuario?.id}`,
            {
            cidade: `${inputLocalidade}`,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
        .then((res) => {
            toast.success("Localidade alterada com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setModalLocalidade(!modalLocalidade);
            setReload(!reaload);
        })
        .catch((res) => {
            toast.error("Ops , algo deu errado!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setModalLocalidade(!modalLocalidade);
        });
    }

    function trocarDescricao() {
        const token = localStorage.getItem("@HorasDeVida:Token");

        api
        .patch(
            `/users/${usuario?.id}`,
            {
            description: `${inputDescription}`,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
        .then((res) => {
            toast.success("Descrição alterada com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setModalDescription(!modalDescription);
            setReload(!reaload);
        })
        .catch((err) => {
            toast.error("Ops , algo deu errado!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            console.log(err);
        });
    }

    function trocarContato() {
        const token = localStorage.getItem("@HorasDeVida:Token");

        api
        .patch(
            `/users/${usuario?.id}`,
            {
            contato: `${inputContato}`,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
        .then((res) => {
            toast.success("Contato alterada com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setModalContato(!modalContato);
            setReload(!reaload);
        })
        .catch((res) => {
            toast.error("Ops , algo deu errado!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setModalContato(!modalContato);
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);

        const token = localStorage.getItem("@HorasDeVida:Token");

        api
        .patch(
            `/users/${usuario?.id}`,
            {
            disponivel: `${checked}`,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
        .then((res) => {
            toast.success("Disponibilidade alterada com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        })
        .catch((res) => {
            toast.error("Ops , algo deu errado!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        });
    };
    
    return(
        <perfilProfissionalContext.Provider value={{
            checked,
            setChecked,
            usuario,
            setUsuario,
            modalDescription, 
            setModalDescription,
            inputDescription, 
            setInputDescription,
            modalFotoPerfil,
            setModalFotoPerfil,
            inputFotoPerfil, 
            setInputFotoPerfil,
            modalNomePerfil, 
            setModalNomePerfil,
            inputNome, 
            setInputNome,
            modalLocalidade, 
            setModalLocalidade,
            inputLocalidade, 
            setInputLocalidade,
            modalContato, 
            setModalContato, 
            inputContato,
            setInputContato,
            reaload,
            setReload,
            trocarFotoDePerfil,
            trocarNome,
            trocarLocalidade,
            trocarDescricao,
            trocarContato,
            handleChange,
            editarPerfil,
            setEditarPerfil,
        }}>
            {children}
        </perfilProfissionalContext.Provider>
    );
};