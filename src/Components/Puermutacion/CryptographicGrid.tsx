import { useState } from 'react';
import { Button } from '../Button/Button';

const DEFAULT_GRID = [
  [1, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1]
];

const rotateGrid = (grid: number[][]): number[][] => {
  return grid[0].map((_, index) => grid.map(row => row[index])).reverse();
};


// Función para cifrar el texto y devolverlo en una matriz cuadrada
const cipher = (grid: number[][], n: number, text: string): string[][] => {
  const square: string[][] = Array.from({ length: n }, () => Array(n).fill("0"));
  let letter = 0;
  const listText = text.split(''); // Convertir el texto en una lista de caracteres
  let rotationsNb = 0;

  // Ejecutar mientras haya rotaciones disponibles (4 rotaciones) o queden letras por insertar
  while (rotationsNb < 4 || letter < listText.length) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        if (grid[j][k] === 1 && letter < listText.length) {
          square[j][k] = listText[letter];
          letter++;
        }
      }
    }
    grid = rotateGrid(grid);  // Rotar la cuadrícula en sentido horario
    rotationsNb++;
  }

  // Si el tamaño es impar, limpiar la celda central
  if (n % 2 === 1) {
    square[Math.floor(n / 2)][Math.floor(n / 2)] = "";
  }

  return square;
};
// Función para convertir el texto en una matriz cuadrada
const textToSquare = (text: string, n: number): string[][] => {
  const listText = text.split('');
  let square: string[][] = Array.from({ length: n }, () => Array(n).fill("0"));
  let letter = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (n % 2 === 1 && i === Math.floor(n / 2) && j === Math.floor(n / 2)) {
        square[i][j] = "";
      } else if (letter < listText.length) {
        square[i][j] = listText[letter];
        letter++;
      }
    }
  }
  return square;
};

// Función para descifrar el texto (desencriptación)
const decipher = (grid: number[][], n: number, square: string[][]): string => {
  let decrypted = '';
  let rotationsNb = 0;

  while (rotationsNb < 1) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 1) {
          if (square[i][j] !== "") { // Solo agregar caracteres no vacíos
            decrypted += square[i][j] !== '0' ? square[i][j] : '';
          }
        }
      }
    }
    grid = rotateGrid(grid); // Rotar la cuadrícula
    rotationsNb++;
  }

  return decrypted;
};

// Función para aplanar la matriz en un texto secuencial
const flattenSquare = (square: string[][]): string => {
  let flattenedText = '';
  for (let row of square) {
    flattenedText += row.join('');  // Concatenar cada fila en una cadena
  }
  return flattenedText;
};

// Componente principal
const CryptographicGrid = () => {
  const [text, setText] = useState("");
  const [encryptedSquare, setEncryptedSquare] = useState<string[][]>([]);
  const [flattenedText, setFlattenedText] = useState<string>("");
  const [decryptedText, setDecryptedText] = useState("");
  const [editableGrid, setEditableGrid] = useState<number[][]>(DEFAULT_GRID);

  const handleCellClick = (row: number, col: number) => {
    const newGrid = editableGrid.map((r, rowIndex) => {
      return r.map((cell, colIndex) => {
        // Cambiar de 0 a 1 y viceversa, además cambiar color
        if (rowIndex === row && colIndex === col) {
          return cell === 0 ? 1 : 0;
        }
        return cell;
      });
    });
    setEditableGrid(newGrid);
  };

  const handleAction = (method: "cifrar" | "descifrar") => {
    if (method === "cifrar") {
      const cleanText = text.replace(/\s+/g, "").toLowerCase();  // Limpiar el texto
      const result = cipher(editableGrid, editableGrid.length, cleanText);
      setEncryptedSquare(result);

      // Aplanar la matriz en un solo string después de encriptar
      const flattened = flattenSquare(result);
      setFlattenedText(flattened);
    } else if (method === "descifrar") {
      const square = textToSquare(text, editableGrid.length);  // Convertir el texto en matriz
      const result = decipher(editableGrid, editableGrid.length, square);
      setDecryptedText(result);
    }
  };

  // Calcular la cantidad de caracteres posibles
  const countPossibleCharacters = (grid: number[][]): number => {
    return grid.flat().filter(cell => cell === 1).length;
  };

  return (
    <div className='bg-blue-100 p-6 rounded-lg shadow-md max-w-lg mx-auto mt-6'>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Rejilla Criptográfica
      </h1>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Texto:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>

      <h3 className="text-lg font-semibold">Matrices:</h3>
      <div className="flex justify-between space-x-4">
        {/* Matriz Editable (Grid) */}
        <div className="flex-1 border p-2 rounded bg-white">
          <h4 className="font-semibold">Matriz Editable</h4>
          <table className="w-full border-collapse">
            <tbody>
              {editableGrid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      onClick={() => handleCellClick(rowIndex, cellIndex)}
                      className={`border border-gray-300 px-2 cursor-pointer ${cell === 1 ? 'bg-green-200' : 'bg-white'}`} // Color de fondo al seleccionar
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Matriz Encriptada */}
        <div className="flex-1 border p-2 rounded bg-white">
          <h4 className="font-semibold">Matriz Encriptada</h4>
          {encryptedSquare.length > 0 ? (
            <table className="w-full border-collapse">
              <tbody>
                {encryptedSquare.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`border border-gray-300 px-2 ${cell !== '0' ? 'bg-green-200' : 'bg-white'}`} // Color de fondo al seleccionar
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay matriz encriptada para mostrar.</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Cantidad de Caracteres Posibles:</label>
        <input
          type="text"
          value={countPossibleCharacters(editableGrid).toString()}
          className="border border-gray-300 p-2 w-full rounded"
          readOnly
        />
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          opciones={[
            { label: "Cifrar", value: "cifrar" },
            { label: "Descifrar", value: "descifrar" },
          ]}
          onClick={(value) => handleAction(value as "cifrar" | "descifrar")}
          selectedValue={"undefined"}
        />
      </div>

      <div className="mt-4 mb-4">
        <label className="block mb-2 font-semibold">Texto Aplanado:</label>
        <input
          type="text"
          value={flattenedText}
          className="border border-gray-300 p-2 w-full rounded"
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Texto Desencriptado:</label>
        <input
          type="text"
          value={decryptedText}
          className="border border-gray-300 p-2 w-full rounded"
          readOnly
        />
      </div>
    </div>
  );
};

export default CryptographicGrid;
