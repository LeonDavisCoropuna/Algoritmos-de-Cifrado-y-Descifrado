import React, { useState } from 'react';
import { TranspocisionSimple } from "./TranspocisionSimple";
import { TranspocisionDoble } from './TranspocisionDoble';


export const Transpocision = () => {

  const [selectedMethod, setSelectedMethod] = useState<'simple' | 'doble'>(); // Estado para controlar el método seleccionado

  const renderSelectedComponent = () => {
    switch (selectedMethod) {
      case 'simple':
        return <TranspocisionSimple />;
      case 'doble':
        return <TranspocisionDoble />
      default:
        return null;
    }
  };
  
  return (
    <div className='bg-blue-100'>
      <h1>Transposición Columnar</h1>
      <div>
        <button onClick={() => setSelectedMethod('simple')}>Transposición Simple</button>
        <button onClick={() => setSelectedMethod('doble')}>Transposición Doble</button>
      </div>
      {renderSelectedComponent()} {/* Renderiza el componente seleccionado */}
    </div>
  );
};
