import { useState } from "react"
import "./styles.css"

const Button = ({text, onClick, type, select=false, selectOptions}:any) => {
    const [isSelected, setIsSelected] = useState(false)

    const buttonClasses:any = {
        "success": "btn-success",
        "cancel": "btn-cancel",
        "danger": "btn-danger"
    }
    

    const buttonClass = `button ${buttonClasses[type]}`

    const handleChangeSelect = () => {
        setIsSelected(prevState => !prevState)
    }

  return (
    <div className="button-component">
        <button onClick={select ? handleChangeSelect : onClick} className={buttonClass}>
            {text} 
            {select && <i className={`fa-solid fa-caret-up ${isSelected && "selected"}`}></i>}
        </button>

        {select && isSelected &&
        
        <ul className="button-select">
            {
                selectOptions.map((option:any) => (
                    <li>{option}</li>
                ))
            }
        </ul>
        }
    </div>
  )
}

export {Button}