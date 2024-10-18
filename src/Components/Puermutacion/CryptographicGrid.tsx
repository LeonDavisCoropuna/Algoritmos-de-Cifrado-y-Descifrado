import React, { useEffect, useState } from 'react';
import { Button } from '../Button/Button';

const EditableMatrix: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(4); // Tamaño dinámico de la matriz

  const [matrix, setMatrix] = useState<number[][]>([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ]);
  const [textMatrix, setTextMatrix] = useState<string[][]>(
    Array.from({ length: matrixSize }, () => Array(matrixSize).fill(''))
  );

  const [inputText, setInputText] = useState<string>('HELLOWORLD123456'); // Texto de 16 letras
  const [encryptedText, setEncryptedText] = useState<string>('');
  const [decryptedText, setDecryptedText] = useState<string>('');

  // Actualizar la matriz y textMatrix cuando cambie matrixSize
  useEffect(() => {
    setMatrix(Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0)));
    setTextMatrix(Array.from({ length: matrixSize }, () => Array(matrixSize).fill('')));
  }, [matrixSize]);

  const toggleCell = (row: number, col: number): void => {
    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (cell ? 0 : 1) : cell))
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

  const validateMatrixCoverage = (matrix: number[][]): boolean => {
    const n = matrix.length; // Suponemos que la matriz es cuadrada
    const coverage = Array.from({ length: n }, () => Array(n).fill(false)); // Matriz para llevar control de las posiciones cubiertas

    let currentMatrix = matrix;

    // Función para marcar las posiciones de valor 1 en la matriz de cobertura
    const markCoverage = (matrix: number[][]) => {
      for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
          if (matrix[row][col] === 1) {
            coverage[row][col] = true;
          }
        }
      }
    };

    // Realiza 4 rotaciones: 0°, 90°, 180° y 270°
    for (let i = 0; i < 4; i++) {
      markCoverage(currentMatrix);
      currentMatrix = rotateMatrix(currentMatrix);
    }

    // Verificar que todas las posiciones hayan sido cubiertas
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (!coverage[row][col]) {
          return false; // Si alguna posición no está cubierta, la matriz no es válida
        }
      }
    }

    return true; // Si todas las posiciones están cubiertas, la matriz es válida
  };

  const handleConvertTextToMatrix = (): void => {
    // Rellena con 'X' hasta 16 caracteres
    const paddedText = inputText.padEnd(matrixSize ** 2, '-');
    setInputText(paddedText)
    const newTextMatrix = Array.from({ length: matrixSize }, (_, rowIndex) =>
      Array.from({ length: matrixSize }, (_, colIndex) =>
        paddedText[rowIndex * matrixSize + colIndex] // Obtiene el carácter correspondiente
      )
    );
    setTextMatrix(newTextMatrix);
  };

  const markFull = (matrixMark: { value: number; marked: boolean; }[][]): boolean => {
    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        if (matrixMark[row][col].marked === false) return true; // Devuelve true si alguna celda no está marcada
      }
    }
    return false; // Devuelve false si todas las celdas están marcadas
  };
  const encryptText = (): void => {
    let currentMatrix = matrix;
    let matrixMark: { value: number; marked: boolean }[][] = Array.from({ length: matrixSize }, () =>
      Array(matrixSize).fill({ value: 0, marked: false })
    );

    // Inicializar matrixMark con los valores de la matriz original
    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        matrixMark[row][col] = {
          value: matrix[row][col],
          marked: false,
        };
      }
    }

    let encrypted = '';

    while (markFull(matrixMark)) { // Continuar mientras haya celdas sin marcar
      for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
          // Si el valor es 1 y la celda no ha sido marcada
          if (currentMatrix[row][col] === 1 && matrixMark[row][col].marked === false) {
            encrypted += textMatrix[row][col]
            matrixMark[row][col].marked = true; // Marcar la celda como usada
          }
        }
      }

      // Rotar la matriz para la próxima iteración
      currentMatrix = rotateMatrix(currentMatrix); // Rota solo la matriz `currentMatrix`
      console.log(currentMatrix);
    }

    setEncryptedText(encrypted); // Establecer el texto cifrado
  };

  const decryptText = (): void => {
    let currentMatrix = matrix;
    const decryptedMatrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill('')); // Matriz para almacenar el texto decriptado
    let matrixMark: { value: number; marked: boolean }[][] = Array.from({ length: matrixSize }, () =>
      Array(matrixSize).fill({ value: 0, marked: false })
    );

    // Inicializar matrixMark con los valores de la matriz original
    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        matrixMark[row][col] = {
          value: matrix[row][col],
          marked: false,
        };
      }
    }

    let index = 0; // Índice para el texto encriptado

    while (markFull(matrixMark)) { // Continuar mientras haya celdas sin marcar
      for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
          if (currentMatrix[row][col] === 1 && matrixMark[row][col].marked === false) {
            // Solo agregar si hay texto encriptado disponible
            if (index < inputText.length) {
              decryptedMatrix[row][col] = inputText[index]; // Almacenar en la matriz de decriptación
              matrixMark[row][col].marked = true; // Marcar la celda como procesada
              index++; // Incrementar el índice del texto encriptado
            }
          }
        }
      }

      // Rota la matriz para la próxima iteración
      currentMatrix = rotateMatrix(currentMatrix);
    }

    let decrypted = '';
    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        decrypted += decryptedMatrix[row][col]; // Concatenar los valores desencriptados
      }
    }

    setDecryptedText(decrypted.trim()); // Establecer el texto desencriptado
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    if (newValue.length <= matrixSize ** 2) {
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
      if (!validateMatrixCoverage(matrix)) {
        alert("Matriz no válida, las posiciones con uno al rotar deben cubrir todas las posiciones de la matriz");
        return;
      }
      handleConvertTextToMatrix()
      encryptText()
    } else if (method === "descifrar") {
      decryptText()
    }
  };

  return (
    <div className='p-6 justify-center items-center flex flex-col'>
      <h1 className="text-2xl font-bold text-center py-3">
        Rejilla Criptográfica
      </h1>
      <div className='flex gap-x-2 items-center'>
        <button
          onClick={() => setMatrix(rotateMatrix(matrix))}
          className={`px-4 py-2 rounded-md font-semibold 
                ${'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
        >
          Rotar Matriz
        </button>
        Tamaño Matriz: {matrixSize}

        <button className='w-8 h-8 bg-blue-300 ' onClick={() => {
          setMatrixSize(matrixSize + 1)
        }}>+</button>
        <button className='w-8 h-8 bg-red-300 ' onClick={() => {
          setMatrixSize(matrixSize - 1)
        }}>-</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${matrixSize}, 50px)`, gap: '2px' }}>
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
        Convertir Texto a Matriz {matrixSize}x{matrixSize}      </h1>
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

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${matrixSize}, 50px)`, gap: '2px' }}>
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
