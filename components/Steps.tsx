"use client";
import {Accordion} from 'flowbite-react';

interface InputProps {
    steps: Array<any>;
}

export default function Steps(props: InputProps){
    const {steps} = props;
    
    return (
        <>
        <Accordion alwaysOpen={true} className="shadow">

        {
            steps.map((step, index) => {
                return (
                    
            <Accordion.Panel>
                <Accordion.Title className="bg-white hover:bg-gray-50">
                
                
                {step.titulo}
                </Accordion.Title>
                <Accordion.Content className="bg-slate-200">
                    {step.descripcion}
                </Accordion.Content>
            </Accordion.Panel>
                )
            })
        }

        </Accordion>
        </>
    )
}