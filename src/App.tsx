import { useState } from 'react';
import './App.css'
import TranspocisionDoble from './Components/Transposicion/TranspocisionDoble';
import TranspocisionSimple from './Components/Transposicion/TranspocisionSimple';
import CryptographicGrid from './Components/Puermutacion/CryptographicGrid';
import { Button } from './Components/Button/Button';
import PermutationCipher from './Components/Puermutacion/PermutacionCipher';

function App() {
  const [selectedMethod, setSelectedMethod] = useState<'simple' | 'doble' | 'permutacion' | 'grid'>('simple'); // Estado para controlar el método seleccionado

  const renderSelectedComponent = () => {
    switch (selectedMethod) {
      case 'simple':
        return <TranspocisionSimple />;
      case 'doble':
        return <TranspocisionDoble />
      case 'grid':
        return <CryptographicGrid />
      case 'permutacion':
        return <PermutationCipher />
      default:
        return null;
    }
  };
  return (
    <div className='min-h-screen  bg-gray-800 flex items-center flex-col'>
      <div className='flex flex-col justify-center items-center h-[20%]'>
        <h2 className="text-4xl font-bold text-gray-100 sm:text-5xl md:text-4xl tracking-wide leading-tight p-6">
          Algoritmos de Cifrado y Descifrado
        </h2>
        <div>
          <Button opciones={[
            { label: 'Transposición Simple', value: 'simple' },
            { label: 'Transposición Doble', value: 'doble' },
            { label: 'Permutación en Series', value: 'permutacion' },
            { label: 'Rejilla Criptográfica', value: 'grid' }
          ]}
            onClick={(value) => setSelectedMethod(value as "simple")}
            selectedValue={selectedMethod} />
        </div>
      </div>

      <div className='bg-gray-300 px-10 min-w-[51em] border-r-2 rounded-md mt-4 min-h-[80%] flex-grow'>

        {renderSelectedComponent()} {/* Renderiza el componente seleccionado */}
      </div>
    </div>
  )
}

export default App
