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
  onUserLoginSubmit: (data: FieldValues) => void;
  user: IUser | null;
  loading: boolean;
  functionVoltar: () => void;
  setUser: (newValue: any) => void;
  professionalDataJSONToEditorFormat: (res: any) => any[];
}

export const Context = createContext({} as ContextProviderData);

export const ContextProvider = ({ children }: ProviderChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const request = async () => {
      const token = localStorage.getItem("@cinimaDb:Token");
      const userId = localStorage.getItem("@cinimaDb:Id");
      setLoading(false);
    };
    if (localStorage.getItem("@cinimaDb:Token") === null) {
      navigate("/admin/login");
    } else {
      request();
    }
  }, []);

  const functionVoltar = () => {
    navigate("/", { replace: true });
  };

  const logout = () => {
    localStorage.removeItem("token-info");
  };

  const onUserLoginSubmit = (data: FieldValues) => {
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("@cinimaDb:Token", res.data.token);
        localStorage.setItem("authuser", JSON.stringify(res.data));
        toast.success("Loged in sucessfull!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (res.data) {
          navigate("/admin/user", { replace: true });
        } else {
          navigate("/admin/login", { replace: true });
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
  const professionalDataJSONToEditorFormat = (res: any) => {
    const extractedData = [];

    for (let index = 0; index <= 200; index++) {
      if (res.data[index] !== undefined) {
        extractedData.push(res.data[index]);
      } else {
        break;
      }
    }

    return extractedData;
  };
  return (
    <Context.Provider
      value={{
        onUserLoginSubmit,
        user,
        functionVoltar,
        loading,
        setUser,
        professionalDataJSONToEditorFormat,
      }}
    >
      {children}
    </Context.Provider>
  );
};
