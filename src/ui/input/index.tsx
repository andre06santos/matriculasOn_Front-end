import Select from "react-select"
import "./styles.css"
import { Fragment } from "react/jsx-runtime"

const Input = ({label, type, select=false, selectOptions, ...rest}:any) => {
    const inputClasses:any = {
        text: 'input-text',
        password: "input-text",
        reset: "input-button reset",
        submit: 'input-button submit'
    }

    const inputClass = `input ${inputClasses[type]}`

  return (
    <div className="input-component">
        {label && <label>{label}</label>}

        {
            select ? 
            <Fragment>

            <Select 
                defaultValue={selectOptions[0]}
                isClearable
                isSearchable
                options={selectOptions}
                getOptionValue={(option:any) => `${option['id']}`}
                getOptionLabel={(option:any) => `${option["text"]}`}
                className="input-select"
                />
            </Fragment>
            // <select>
            //     {
            //         selectOptions.map((option:any) => (
            //             <option key={option.id} {...rest}>{option.text}</option>

            //         ))
            //     }
            // </select>

            :

            <input type={type} {...rest} className={inputClass}/>

        }
    </div>
  )
}

export {Input}