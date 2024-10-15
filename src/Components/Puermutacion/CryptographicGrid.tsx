import React, { useState } from 'react';
import { Button } from '../Button/Button';

const EditableMatrix: React.FC = () => {
  const [matrix, setMatrix] = useState<number[][]>([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ]);

  const [textMatrix, setTextMatrix] = useState<string[][]>(
    Array.from({ length: 4 }, () => Array(4).fill(''))
  );

  const [inputText, setInputText] = useState<string>('HELLOWORLD123456'); // Texto de 16 letras
  const [encryptedText, setEncryptedText] = useState<string>('');
  const [decryptedText, setDecryptedText] = useState<string>('');

  const toggleCell = (row: number, col: number): void => {
    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (cell === 0 ? 1 : 0) : cell))
    );
    setMatrix(newMatrix);
  };

  const rotateMatrix = (mat: number[][]): number[][] => {
    // Transponer la matriz
    const transposed = mat[0].map((_, index) =>
      mat.map(row => row[index])
    );

    // Invertir cada fila de la matriz transpuesta
    const rotated = transposed.map(row => row.reverse());

    return rotated;
  };

  const handleConvertTextToMatrix = (): void => {
    // Rellena con 'X' hasta 16 caracteres
    const paddedText = inputText.padEnd(16, '-');
    setInputText(paddedText)
    const newTextMatrix = Array.from({ length: 4 }, (_, rowIndex) =>
      Array.from({ length: 4 }, (_, colIndex) =>
        paddedText[rowIndex * 4 + colIndex] // Obtiene el carácter correspondiente
      )
    );
    setTextMatrix(newTextMatrix);
  };


  const encryptText = (): void => {
    let currentMatrix = matrix;
    let encrypted = '';

    while (true) { // Intentar hasta 2 veces: una vez original y otra rota
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (currentMatrix[row][col] === 1) {
            encrypted += textMatrix[row][col] !== ' ' ? textMatrix[row][col] : ""; // Añadir el carácter correspondiente
          }
        }
      }

      if (encrypted.length >= 16) {
        break;
      }

      // Rota la matriz para la próxima iteración
      currentMatrix = rotateMatrix(currentMatrix);
      console.log(currentMatrix);
    }

    setEncryptedText(encrypted);
  };

  const decryptText = (): void => {
    let currentMatrix = matrix;
    const decryptedMatrix = Array.from({ length: 4 }, () => Array(4).fill('')); // Matriz para almacenar el texto decriptado
    let index = 0; // Índice para el texto encriptado

    while (true) { // Intentar hasta 2 veces: una vez original y otra rota
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (currentMatrix[row][col] === 1) {
            // Solo agregar si hay texto encriptado disponible
            if (index < inputText.length) {
              decryptedMatrix[row][col] = inputText[index]; // Almacenar en la matriz de decriptación
              index++; // Incrementar el índice del texto encriptado
            }
          }
        }
      }

      // Si ya se decriptó todo el texto, salir del bucle
      if (index >= inputText.length) {
        break;
      }

      // Rota la matriz para la próxima iteración
      currentMatrix = rotateMatrix(currentMatrix);
    }

    // Leer el texto de la matriz de decriptación en el orden correcto
    let decrypted = '';
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        decrypted += decryptedMatrix[row][col]; // Concatenar el texto de la matriz de decriptación
      }
    }

    setDecryptedText(decrypted.trim()); // Quitar espacios en blanco al final
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    if (newValue.length <= 16) {
      setInputText(newValue);
    }
  };

  const handleTextMatrixCellChange = (row: number, col: number, newValue: string): void => {
    const newTextMatrix = textMatrix.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? newValue : cell))
    );
    setTextMatrix(newTextMatrix);
  };

  const handleAction = (method: "cifrar" | "descifrar") => {
    if (method === "cifrar") {
      handleConvertTextToMatrix()
      encryptText()
    } else if (method === "descifrar") {
      decryptText()
    }
  };

  return (
    <div className='bg-blue-100 p-6 rounded-lg shadow-md max-w-lg mx-auto mt-6 justify-center items-center flex flex-col'>
      <h1 className="text-2xl font-bold text-center">
        Permutación en Series
      </h1>
      <button
        onClick={() => setMatrix(rotateMatrix(matrix))}
        className={`px-4 py-2 rounded-md font-semibold 
                ${'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
      >
        Rotar Matriz
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', gap: '5px' }}>
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => toggleCell(rowIndex, colIndex)}
              style={{
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid black',
                cursor: 'pointer',
                backgroundColor: cell === 1 ? 'lightgreen' : 'lightcoral',
              }}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <h1 className="text-md font-bold mb-4 text-center">
        Convertir Texto a Matriz 4x4      </h1>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Texto:</label>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <button
        onClick={handleConvertTextToMatrix}
        className={`px-4 py-2 rounded-md font-semibold 
                ${'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
      >
        Convertir a Matriz
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', gap: '5px' }}>
        {textMatrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`text-${rowIndex}-${colIndex}`}
              value={cell}
              onChange={(e) => handleTextMatrixCellChange(rowIndex, colIndex, e.target.value)}
              style={{
                width: '50px',
                height: '50px',
                textAlign: 'center',
                border: '1px solid black',
                backgroundColor: 'lightblue',
              }}
            />
          ))
        )}
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          opciones={[
            { label: "Cifrar", value: "cifrar" },
            { label: "Descifrar", value: "descifrar" },
          ]}
          onClick={(value) => handleAction(value as "cifrar" | "descifrar")} // Ejecuta directamente la acción seleccionada
          selectedValue={"undefined"} // No es necesario mantener un estado de selección aquí
        />
      </div>
      <h3>Texto Encriptado:</h3>
      <div style={{ border: '1px solid black', padding: '10px', width: 'fit-content', backgroundColor: 'lightyellow' }}>
        {encryptedText}
      </div>

      <h3>Texto Decriptado:</h3>
      <div style={{ border: '1px solid black', padding: '10px', width: 'fit-content', backgroundColor: 'lightgreen' }}>
        {decryptedText}
      </div>
    </div>
  );
};

export default EditableMatrix;
