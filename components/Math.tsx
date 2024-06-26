import React from "react";
import { MathComponent } from "mathjax-react"


const Math = ({ block = false, children }) => {
    return <MathComponent display={false} tex={String.raw`${children}`}  />;
};

export default Math;