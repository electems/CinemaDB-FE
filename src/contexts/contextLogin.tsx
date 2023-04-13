import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";


interface ProviderChildren {
  children: ReactNode;
}

interface IUser {
  email: string;
  id: number;
  name: string;
  cpf: string;
  registroProfissional: string;
  areaDeAtuacao: string;
  isOng: boolean;
  localidade?: string;
  contato?: string;
  disponivel?: string;
  img?: string;
  description?: string;
}
interface ContextProviderData {
  onSubmitFunction: (data: FieldValues) => void;
  user: IUser | null;
  loading: boolean;
  functionVoltar: () => void;
  setUser: (newValue: any) => void
}

export const Context = createContext({} as ContextProviderData);

export const ContextProvider = ({ children }: ProviderChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const request = async () => {

      const token = localStorage.getItem("@HorasDeVida:Token")  
      const userId = localStorage.getItem("@HorasDeVida:Id")
      
      if(token){
        
        api.get("isLogged", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async () => {

          const { data } = await api.get<IUser>(`users/${userId}`)

          setUser(data)
          setLoading(false)

          if(data.isOng){
            navigate("/dashboard", { replace: true })
          }else {
            navigate("/perfil", { replace: true })
          }
        })
        .catch((err) => {
          console.log(err)
          navigate("/login", { replace: true })
          setLoading(false)
        })
      }
      setLoading(false)
    }

    request()
  },[])


  const functionVoltar = () => {
    navigate("/", { replace: true });
  };

  const onSubmitFunction = (data: FieldValues) => {
    axios
      .post("https://horasvitais.herokuapp.com/login", data)
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("@HorasDeVida:Token", res.data.accessToken);
        localStorage.setItem("@HorasDeVida:Id", res.data.user.id);
        toast.success("Logado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (res.data.user.isOng) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/perfil", { replace: true });
        }
      })
      .catch((err) =>
        toast.error("Ops! Algo deu errado.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };
  return (
    <Context.Provider value={{ onSubmitFunction, user, functionVoltar, loading, setUser }}>
      {children}
    </Context.Provider>
  );
};
