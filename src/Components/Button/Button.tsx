import React from 'react'

interface BotonesProps {
    opciones: { label: string; value: string }[];  // Array de opciones con label y value
    onClick: (value: string) => void;  // Función para manejar el clic
    selectedValue: string;  // Valor actualmente seleccionado
  }

export const Button: React.FC<BotonesProps> = ({ opciones, onClick, selectedValue }) => {
    return (
        <div className="flex space-x-4">
          {opciones.map((opcion) => (
            <button
              key={opcion.value}
              onClick={() => onClick(opcion.value)}
              className={`px-4 py-2 rounded-md font-semibold 
                ${selectedValue === opcion.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
            >
              {opcion.label}
            </button>
          ))}
        </div>
    );
}


