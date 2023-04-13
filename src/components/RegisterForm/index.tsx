import { Button } from "../Button/styles";
import Input from "../Input";
import { FormContainer } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { api } from "../../services/api";
import { toast } from "react-toastify";

export interface IUserRegister {
    nome: string,
    cpf: string,
    registroProfissional: string,
    email: string,
    password: string,
    confirmPassword: string,
    areaDeAtuacao: string,
    endereco: string,
    bairro: string,
    cidade: string,
    isOng?: boolean,
}

interface IRegisterFormProps {
    isOng: boolean,
    setIsOng: (newValue: boolean) => void
}



const RegisterForm = ({isOng, setIsOng}: IRegisterFormProps) => {
    const navigate = useNavigate()

    const userSchema = yup.object().shape({
        nome: yup.string().required("Nome obrigatório"),
        CPF: yup.string().required("CPF obrigatório").min(11,"CPF inválido"),
        registroProfissional: yup.string().required("Registro profissional obrigatório"),
        email: yup.string().required("Email obrigatório"),
        password: yup.string().required("Senha obrigatória").matches(/[A-Z]/, "deve conter ao menos 1 letra maiúscula").matches(/([a-z])/, "deve conter ao menos 1 letra minúscula").matches(/(\d)/, "deve conter ao menos 1 número").matches(/.{8,}/, "deve conter ao menos 8 dígitos"),
        confirmPassword: yup.string().required("Confirmação de senha obrigatória").oneOf([yup.ref("password")], "As senhas devem ser iguais"),
        areaDeAtuacao: yup.string().required("Área de atuação obrigatória")
    })

    const ongSchema = yup.object().shape({
        nome: yup.string().required("Nome obrigatório"),
        email: yup.string().required("Email obrigatório"),
        password: yup.string().required("Senha obrigatória").matches(/[A-Z]/, "deve conter ao menos 1 letra maiúscula").matches(/([a-z])/, "deve conter ao menos 1 letra minúscula").matches(/(\d)/, "deve conter ao menos 1 número").matches(/.{8,}/, "deve conter ao menos 8 dígitos"),
        confirmPassword: yup.string().required("Confirmação de senha obrigatória").oneOf([yup.ref("password")], "As senhas devem ser iguais"),
        endereco: yup.string().required("Endereço obrigatório"),
        bairro: yup.string().required("Bairro obrigatório"),
        cidade : yup.string().required("Cidade obrigatória")
    })
    

    const {register, handleSubmit, formState: { errors }} = useForm<IUserRegister>({
       resolver: yupResolver(isOng ? ongSchema  : userSchema )
    })


    function handleRegister(data: IUserRegister){ 
        data.isOng = isOng
        
        toast.promise(api.post("/register", data),{
            error: "Usuário ja cadastrado",
            pending: "Carregando, aguarde!",
            success: "Conta criada com sucesso!"
        }, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined, 
        })

        navigate("/login")
    }

    return (
        <FormContainer onSubmit={handleSubmit(handleRegister)}>
            <h1>Inscrição</h1>
            {
            isOng ?
                <>
                    <Input type="text" id="nome" label="Nome da instituição:" register={register} error={errors.nome?.message} />
                    <Input type="email" id="email" label="E-mail institucional:" register={register} error={errors.email?.message} />
                    <Input type="password" id="password" label="Senha:" register={register} error={errors.password?.message} /> 
                    <Input type="password" id="confirmPassword" label="Confirmar senha:" register={register} error={errors.confirmPassword?.message} />
                    <Input type="text" id="endereco" label="Endereço:" register={register} error={errors.endereco?.message} />
                    <Input type="text" id="bairro" label="Bairro:" register={register} error={errors.bairro?.message} />
                    <Input type="text" id="cidade" label="Cidade:" register={register} error={errors.cidade?.message} />
                </>
                :
                <>
                    <Input type="text" id="nome" label="Nome Completo:" register={register} error={errors.nome?.message}/>
                    <Input type="text" id="CPF" label="CPF:" register={register} error={errors.cpf?.message}/>
                    <Input type="text" id="registroProfissional" label="Registro Profissional:" register={register} error={errors.registroProfissional?.message}/>
                    <Input type="email" id="email" label="Email:" register={register} error={errors.email?.message}/>
                    <Input type="password" id="password" label="Senha:" register={register} error={errors.password?.message}/>
                    <Input type="password" id="confirmPassword" label="Confirmar senha:" register={register} error={errors.confirmPassword?.message}/>
                    <Input type="text" id="areaDeAtuacao" label="Área de atuação:" register={register} error={errors.areaDeAtuacao?.message}/>
                    <p>Você é uma instituição? <button className="redirect_btn" onClick={(e) => {
                        e.preventDefault()
                        setIsOng(true)
                    }}>Clique aqui.</button></p>
                </>

            }
            <p>Já tem login ? <Link to="/login">Clique aqui.</Link></p>
            
            <Button type="submit">CADASTRAR</Button>
        </FormContainer>
    )
};

export default RegisterForm;
