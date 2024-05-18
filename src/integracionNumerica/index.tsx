"use client"
// import { MathComponent } from "mathjax-react";

interface result{
    steps?: {
        titulo: string,
        descripcion: any,
        resultado: any,
    }[],
    error?: any,
    graphOptions?: any,
}


function linSpace(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      arr.push(startValue + (step * i));
    }
    return arr;
  }


const maxIter = 100;
export function euler(a:GLfloat, b:GLfloat, f_a:GLfloat,  h:GLfloat,  func:Function, expression:String ):result{
    try{
        
    
        const x_0 = a;
        const y_0 = f_a;
        const b_0 = b;
        let error:any, iteraciones=0, x_n:any, y_n:any, y_n_nueva:any;

        x_n = x_0;
        y_n = y_0;

        if(h==0 ){ // TODO
            const f_b = 0;
            return {
                error: <p> La función ingresada no tiene una raiz en 
                    {/* <MathComponent tex={ `[${a}, ${b} ]` } display={false}/>, ya que 
                <MathComponent tex={ `f(${a})=${f_a}` } display={false}/> y <MathComponent tex={ ` f(${b}) = ${f_b} ` } display={false}/>  */}
                </p> 
            };
        }
        const result = {
            steps:[],
            graphOptions: {}
        };

        while(x_n < b_0){
            
            iteraciones+=1;

            y_n_nueva = y_n + h*func(x_n, y_n);
        
            error = Math.abs(y_n - y_n_nueva);
            y_n = y_n_nueva;

            
            x_n = x_0 + iteraciones*h;

            result.steps.push({
                titulo: `Iteración ${iteraciones}`,
                descripcion: <div>
                        <p>  Realizamos la iteración 
                            {/* <MathComponent tex={ `y_${iteraciones} = y_${iteraciones-1} + h \\cdot f(x_${iteraciones-1}, y_${iteraciones-1}) \\ = \\ ${y_n}` } display={false}/> </p>
                        
                        <p>  Obtenemos <MathComponent tex={ `x_${iteraciones} = x_${iteraciones-1} + n \\cdot h \\ = \\ ${x_n}` } display={false}/> </p> */}
                        </p> 
                    </div>,
                resultado: <p> No hay resultado</p>,
            });

        }

        result.steps.unshift(
            {
                titulo: 'Resumen',
                descripcion: <>
                        
                        {/* <div id='graph' className="w-full flex justify-center "></div> */}
                        En {iteraciones} iteraciones del algoritmo de Euler con una tolerancia de blablabla
                    </>,
                resultado: <></>,
            }
        );


        result.graphOptions = {
                target: '#graph',
                yAxis: {domain: [f_a, y_n]},
                xAxis: {domain: [x_0, b_0]},
                width: 1000,
                height: 500,
                data: [
                    {
                        fn: expression
                    },
                    // {
                    //     points: c_points,
                    //     fnType: 'points',
                    //     graphType: 'scatter'
                    // }
                ]
              };

        return result;
    }catch(e){
        return {
            error: e.message
        };
    }
}