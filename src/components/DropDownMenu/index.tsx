import { Dropdown } from "./style"

interface DropDownMenuProps{
    description: string | undefined,
}

export const DropDownMenu = ({description}: DropDownMenuProps) => {
    return(
        <Dropdown>
            <p className="Dropdown-icon">?</p>
            <div className="dropdown-content">
                <p>Descrição do Profissional:</p>
                <p>{description}</p>
            </div>
        </Dropdown>
    )
}