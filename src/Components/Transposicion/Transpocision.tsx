import React, { useState } from 'react';
import { TranspocisionSimple } from "./TranspocisionSimple";
import { TranspocisionDoble } from './TranspocisionDoble';
import { Button } from '../Button/Button';


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
      <h1 className="text-2xl font-bold mb-6">Transposición Columnar</h1>
      <div>   
        <Button opciones={[
          { label: 'Transposición Simple', value: 'simple' },
          { label: 'Transposición Doble', value: 'doble' }
        ]}
        onClick={(value) => setSelectedMethod(value as 'simple' | 'doble')}
        selectedValue={selectedMethod} />
      </div>
      {renderSelectedComponent()} {/* Renderiza el componente seleccionado */}
    </div>
  );
};
