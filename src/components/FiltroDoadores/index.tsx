import { useContext, useState } from "react"
import { ProfissionalContext } from "../../Providers/contextProfissional"
import { Form } from "./styles"

const FiltroDoadores = () => {
    const [value, setValue] = useState("")
    const {filtrar} = useContext(ProfissionalContext)

    return (
        <Form onSubmit={(e) => {
            e.preventDefault()
            filtrar(value)
        }}>
            <input type="text" placeholder="Filtre por especialidade" onChange={(e) => setValue(e.target.value.toLowerCase()) }/>
            <button type="submit">Pesquisar</button>
        </Form>
    )
}

export default FiltroDoadores