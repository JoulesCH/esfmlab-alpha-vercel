import { EditableMathField } from 'react-mathquill';
import {
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

interface InputProps {
    latex: string;
    inputSetLatex: (latex_input) => void;
    enter: any;
    edit: any;
}

export default function MainInput(props: InputProps){
    const {latex, inputSetLatex, enter, edit} = props;
    
    return (
        <>
        <EditableMathField
                    latex={latex}
                    onChange={inputSetLatex}
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
                <div>
                    <p className="text-amber-600 text-right pb-5" >
                        Presiona enter <ArrowLeftOnRectangleIcon className="h-6 w-6 inline"/>   para calcular
                    </p>
                </div>
        </>
    )
}