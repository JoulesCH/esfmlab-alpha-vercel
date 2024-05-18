"use client"
import dynamic from 'next/dynamic';

const MathComponent = dynamic(() => import('../../components/Math'), { ssr: false });


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
export function bisection(a:GLfloat, b:GLfloat, func:Function, EPSILON:GLfloat, expression:String ):result{
    
    try{
        
        const f_a = func(a);
        const f_b = func(b);
        const a_0 = a;
        const b_0 = b;

        if (f_a * f_b >= 0)
        {
            return {
                error: <p> La función ingresada no tiene una raiz en 
                    <MathComponent children={ `[${a}, ${b} ]` } />, ya que 
                <MathComponent children={ `f(${a})=${f_a}` } /> y <MathComponent children={ ` f(${b}) = ${f_b} ` } /> </p> 
            };
        }

        const result = {
            steps:[],
            graphOptions: {}
        };

        let c = a, i = 0;   
        let c_points = [];
        
        while ((b-a) >= EPSILON && i < maxIter )
        {
            console.log('resolviending');
            i++;
            c = (a+b)/2;
            
            result.steps.push({
                titulo: `Iteración ${i}`,
                descripcion: <p> Se calcula el punto medio 
                    <MathComponent children={ `c = \\frac{${a}+${b}}{2} = ${c}` } /> </p>,
                resultado: <p> Se calcula <MathComponent children={ `f(${c}) = ${func(c)}` } /> </p>,
            });
            // Check if middle point is root
            if (func(c) == 0.0)
                break;

            // Decide the side to repeat the steps
            else if (func(c)*func(a) < 0)
                b = c;
            else
                a = c;
            
            c_points.push([c, func(c)]);

        }

        if(i == maxIter && (b-a) >= EPSILON){
            return {
                error: `No se encontró una raiz en [${a}, ${b}] con un error menor a ${EPSILON} en ${maxIter} iteraciones.`,
                steps: result.steps
            };
        }else{
            result.steps.unshift(
                {
                    titulo: 'Resumen',
                    descripcion: <>
                            La ecuación ingresada tiene una raiz en 
                            <MathComponent children={ `[${a_0}, ${b_0} ]` } />, ya que <MathComponent children={ `f(${a_0})=${f_a}` } />; <MathComponent children={ ` f(${b_0}) = ${f_b} ` } /> y
                            existe cambio de signo. 
                            <div id='graph' className="w-full flex justify-center "></div>
                            En {i} iteraciones del algoritmo de bisección con una tolerancia de <MathComponent children={ `\\epsilon = ${EPSILON}` } /> se obtuvo la raiz <MathComponent children={ `x = ${c}` } />.
                        </>,
                    resultado: <></>,
                }
            );
        }

        result.graphOptions = {
                target: '#graph',
                yAxis: {domain: [f_a, f_b]},
                xAxis: {domain: [a_0, b_0]},
                width: 1000,
                height: 500,
                data: [
                    {
                        fn: expression
                    },
                    {
                        points: c_points,
                        fnType: 'points',
                        graphType: 'scatter'
                    }
                ]
              };

        return result;
    }catch(e){
        return {
            error: e.message
        };
    }
}
 