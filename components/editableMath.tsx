import React from "react";
import { EditableMathField } from 'react-mathquill';

const editableMath = ({ block = false, latex, onChange, enter, edit, id }) => {
    return <EditableMathField
        latex={latex}
        onChange={onChange}
        id="raices-main-input"
        placeholder="Escribe tu ecuación"
        mathquillDidMount={(mathField) => {
            mathField.focus()   
            mathField.config(
                    {
                        handlers: {
                            enter: enter,
                            edit: edit

                        }
                    }
                
            )
        }}
/>
};

export default editableMath;