"use client";
import React, { useState, useEffect } from 'react'
import './Integracion.Component.css'

import MathExpression from 'math-expressions';
import { evaluate } from 'mathjs';
import { useRouter, useSearchParams   } from 'next/navigation';
import { Accordion } from 'flowbite-react';

import functionPlot from 'function-plot';
import MainInput from '../../components/MainInput';
import Steps from '../../components/Steps';
import { euler } from '../../src/integracionNumerica/index';

export default function(){

    useEffect(() => {
        import("react-mathquill").then((mq) => {
        mq.addStyles();
        });
    }, []);

    
    const router = useRouter()
    const searchParams = useSearchParams();
    const eq = searchParams.get('eq') || '';
    console.log(eq); // TODO
    const [latex, setLatex] = useState(eq);
    const [steps, setSteps] = useState([]);
    const [error, setError] = useState(<></>);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState({});

    const inputSetLatex = (latex_input) => {
        router.push('/IntegracionNumerica?method=Euler&eq=' + latex_input.latex());
    }

    useEffect(() => {
        functionPlot((result as any).graphOptions || {});
    }, [steps])

    function resolveEuler(mathField){
        setLoading(true);

        const expression = MathExpression.fromLatex(mathField.latex()).toString();

        const result = euler(1, 1.5, 1, 0.1, (x, y) => evaluate(expression, {x: x, y:y}) , expression);
        if('error' in result){
            setError(
                <div id="alert-border-2" className="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200" role="alert">
                    <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div className="ml-3 text-sm font-medium text-red-700">
                     {result.error}
                    </div>
                </div>
            );
            mathField.focus();
        }else{
            setError(<></>);
        }
        setSteps(result.steps || []);
        setLoading(false);
        setResult(result);
    }

    return (
        <>
        <div className="input-principal-div relative top-[-90px]">
            <div className="flex  md:pt-[130px] justify-center pb-[300px] ">

                <div className=" py-4 px-6  max-w-6xl  w-full">
                    
                    <h1 className="text-3xl pb-5 text-slate-700">Integración Numérica</h1>
                    <div className="sm:hidden">
                        <select id="tabs" className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500">
                            <option>Euler</option>
                            <option>Heun</option>
                            <option>Rk-3</option>
                            <option>RK-4</option>
                        </select>
                    </div>

                    <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400 mb-6">
                        <li className="w-full">
                            <button className="inline-block p-4 w-full text-gray-900 bg-gray-200 rounded-l-lg  active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Euler<nav></nav></button>
                        </li>
                        <li className="w-full">
                            <button className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50  focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Heun</button>
                        </li>
                        <li className="w-full">
                            <button  className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">RK-3</button>
                        </li>
                        <li className="w-full">
                            <button className="inline-block p-4 w-full bg-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">RK-4</button>
                        </li>
                    </ul>

                    <div>
                    <h2 className="text-2xl font-bold mb-4">Método de Euler para integración numérica</h2>
                        <p className="mb-4">El método de Euler es un algoritmo de integración numérica utilizado para aproximar la solución de ecuaciones diferenciales ordinarias (EDOs) de primer orden. El método se basa en la idea de aproximar la curva solución mediante una serie de segmentos de recta.</p>
                        <p className="mb-4">El método de Euler es muy fácil de implementar y se puede utilizar para aproximar la solución de una EDO en cualquier punto dado. El algoritmo se describe a continuación:</p>
                        <ol className="list-decimal list-inside mb-4">
                        <li className="mb-2">Dada una EDO de primer orden dy/dx = f(x,y) y un punto inicial (x<sub>0</sub>,y<sub>0</sub>), el objetivo es aproximar la solución en un punto x<sub>1</sub> = x<sub>0</sub> + h, donde h es el tamaño del paso.</li>
                        <li className="mb-2">Utilizando la EDO, se calcula la pendiente de la curva en el punto (x<sub>0</sub>,y<sub>0</sub>): m = f(x<sub>0</sub>,y<sub>0</sub>).</li>
                        <li className="mb-2">Se utiliza la pendiente m para aproximar la solución en el punto x<sub>1</sub>: y<sub>1</sub> = y<sub>0</sub> + m*h.</li>
                        <li className="mb-2">El proceso se repite para encontrar la solución en el punto x<sub>2</sub> = x<sub>1</sub> + h: m = f(x<sub>1</sub>,y<sub>1</sub>), y<sub>2</sub> = y<sub>1</sub> + m*h.</li>
                        <li className="mb-2">El proceso se repite hasta que se alcanza el punto deseado.</li>
                        </ol>
                        <p className="mb-4">El método de Euler es una aproximación de primer orden y puede ser inexacto para ciertos tipos de ecuaciones diferenciales. Además, el tamaño del paso h debe ser lo suficientemente pequeño para garantizar una aproximación precisa de la solución.</p>
                        <p className="mb-4">En resumen, el método de Euler es un algoritmo de integración numérica simple y fácil de implementar que se utiliza para aproximar la solución de ecuaciones diferenciales ordinarias de primer orden. El método se basa en la idea de aproximar la curva solución mediante una serie de segmentos de recta, y puede ser inexacto para ciertos tipos de ecuaciones diferenciales.</p>
                    </div>
                    <MainInput latex={latex} inputSetLatex={inputSetLatex}  enter={resolveEuler} edit={inputSetLatex}></MainInput>
                    <div className="text-center" style={{display: loading? 'block':'none'}}>
                        <div role="status">
                            <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-amber-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>

                    {error}
                    
                    <Steps steps={steps} />
                </div>
            </div>
        </div>
        </>
    )
}