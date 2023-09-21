import React, { useState } from "react";
import Dropdown from "react-dropdown";

function Area() {
    const [calType, setCalType] = useState("Area");
    const [shape, setShape] = useState("square");
    const [dimensions, setDimensions] = useState({});
    const [ans, setAns] = useState("");

    const areaShapes = ["square", "rectangle", "circle", "Triangle","parallelogram" , "trapezium" , "Ellipse" ,
    "cylinder", "cone", "sphere", "Cube" , "Cuboid"];
    const volumeShapes = ["cylinder", "cone", "sphere", "Cube" , "Cuboid" ,  "Pyramid" , "Ellipsoid" , 
"Tetrahedron" , "Hemisphere"];

    const shapesWithOptions = {
        square: { numInputs: 1, labels: ['Side Length'] },
        rectangle: { numInputs: 2, labels: ['Length', 'Width'] },
        circle: { numInputs: 1, labels: ['Radius'] },
        triangle: { numInputs: 2, labels: ['Base', 'Height'] },
        cylinder: { numInputs: 2, labels: ['Radius', 'Height'] },
        cone: { numInputs: 2, labels: ['Radius', 'Height'] },
        sphere: { numInputs: 1, labels: ['Radius'] },
        cube: { numInputs: 1, labels: ['Side Length'] },
        parallelogram : {numInputs : 2 , labels : ['Base' , 'Height']} , 
        trapezium : {numInputs : 3 , labels : ['Side A' ,'Side B' ,  'Height']} , 
        ellipse : {numInputs : 2 , labels : ['Side A' , 'Side B']} , 
        cuboid : {numInputs : 3 , labels : ['Length', 'Width' ,  'Height']} , 
        pyramid : {numInputs : 3 , labels : ['Length', 'Width' ,  'Height']} , 
        ellipsoid : {numInputs : 3 , labels : ['Length', 'Width' ,  'Height']} , 
        tetrahedron : {numInputs : 1 , labels : ['Length']} ,
        hemisphere: { numInputs: 1, labels: ['Radius'] },
        
    };

    const handleCalculate = () => {
        let result = 0;
        if (calType === "Area") {
            result = calculateArea();
        } else if (calType === "Volume") {
            result = calculateVolume();
        }
        setAns(result);
    };

    const calculateArea = () => {
        switch (shape) {
            case "square":
                return parseFloat(dimensions[0]) ** 2;
            case "rectangle":
                return parseFloat(dimensions[0]) * parseFloat(dimensions[1]);
            case "circle":
                return Math.PI * parseFloat(dimensions[0]) ** 2;
            case "triangle" :
                return (0.5* parseFloat(dimensions[0])* parseFloat([dimensions[1]]));
            case "parallelogram" :
                return (parseFloat(dimensions[0]) * parseFloat(dimensions[1]));
            case "trapezium" :
                return (((parseFloat(dimensions[0]) + parseFloat(dimensions[1]))/2)*parseFloat(dimensions[2])) ; 
            case "ellipse" :
                return Math.PI * parseFloat(dimensions[0]) * parseFloat(dimensions[1]) ;
            case "cube" :
                return 6 * parseFloat(dimensions[0]) ** 2;
            case "cuboid" : 
                return 2 * ((parseFloat(dimensions[0]) * parseFloat(dimensions[1])) +
                 (parseFloat(dimensions[0]) * parseFloat(dimensions[2])) +
                 ( parseFloat(dimensions[1]) * parseFloat(dimensions[2]))) ;
            case "cylinder" :
                return 2 * (Math.PI * parseFloat(dimensions[0]) * 
                (parseFloat(dimensions[0]) + parseFloat(dimensions[2]))) ;
            case 'cone' :
                return (Math.PI * parseFloat(dimensions[0]) * 
                (parseFloat(dimensions[0]) + parseFloat(dimensions[0]))) ;
            case "sphere" :
                return 4 * Math.PI * (parseFloat(dimensions[0]) ** 2)    ;
            default:
                return 0;
        }
    };

    const calculateVolume = () => {
        switch (shape) {
            case "cylinder":
                return Math.PI * parseFloat(dimensions[0]) ** 2 * parseFloat(dimensions[1]);
            case "cone":
                return (1 / 3) * Math.PI * parseFloat(dimensions[0]) ** 2 * parseFloat(dimensions[1]);
            case "sphere":
                return (4 / 3) * Math.PI * parseFloat(dimensions[0]) ** 3;
            case "cuboid" : 
                return parseFloat(dimensions[0]) * parseFloat(dimensions[1]) * parseFloat(dimensions[2]) ; 
            case "pyramid" :
                return 1/3 * ( parseFloat(dimensions[0]) * parseFloat(dimensions[1]) * parseFloat(dimensions[2])) ; 
            case "ellipsoid" : 
                return 4/3 * Math.PI * ( parseFloat(dimensions[0]) * parseFloat(dimensions[1]) * parseFloat(dimensions[2])) ; 
            case "tetrahedron":
                return  (parseFloat(dimensions[0]) ** 3)/(6*Math.SQRT2) ;
            case "hemisphere":
                return (2 / 3) * Math.PI * parseFloat(dimensions[0]) ** 3;
            default:
                return 0;
        }
    };

    return (
        <div className="area">
            <h2>Area and Volume Calculator</h2>
            <div className="accent-line"></div>
            <div div className="input-area-container">
                <p>What do you want to Calculate ? </p>
                <Dropdown
                    options={["Area", "Volume"]}
                    value={calType}
                    onChange={(option) => setCalType(option.value)}
                />
                <div className="area-lol">
                    <><p>Shape ? </p></>
                    <Dropdown
                        options={calType === "Area" ? areaShapes : volumeShapes}
                        value={shape}
                        onChange={(option) => {
                            setShape(option.value.toLowerCase());
                            setDimensions({});
                        }}
                    />
                </div>
                {shapesWithOptions[shape] &&
                    Array(shapesWithOptions[shape].numInputs)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i}>
                                <label className="area-label">{shapesWithOptions[shape].labels[i]}</label>
                                <input
                                    className="area-input-d"
                                    type="number"
                                    value={dimensions[i] || ''}
                                    onChange={(e) => setDimensions({ ...dimensions, [i]: e.target.value })}
                                />
                            </div>))}</div>
                            <div>
                <button className="are-buttonC" onClick={handleCalculate}>
                    Calculate
                </button>
                <div className="area-lol">
  <h3 style={{ display: "inline" }}>{calType}</h3> of the <h3 style={{ display: "inline" }}>{shape}</h3> is:

</div><h2>{ans} units </h2>
            </div></div>
       
    );
}

export default Area;
