import { useState } from "react";
import { Button } from "../Button/Button"; // Asumiendo que Button ya está estilizado con Tailwind

const TranspocisionSimple = () => {
  const [inputText, setInputText] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [encryptedText, setEncryptedText] = useState<string>("");
  const [decryptedText, setDecryptedText] = useState<string>("");
  const [matrix, setMatrix] = useState<string[][]>([]); // Estado para la matriz

  const encrypt = (text: string, key: string): string => {
    const keyLower = key.toLowerCase();
    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);
    const remainingChars = numRows * numCols - text.length;
    
    // Llenar con guiones si la última fila no se completa
    const paddedText = text.padEnd(text.length + remainingChars, "-");
    const matrix: string[][] = [];

    // Llenar la matriz fila por fila
    for (let i = 0; i < numRows; i++) {
        matrix.push(paddedText.slice(i * numCols, (i + 1) * numCols).split(""));
    }

    // Guardar la matriz en el estado
    setMatrix(matrix);

    // Crear un arreglo de orden de clave
    const keyOrder = keyLower
      .split("")
      .map((char, index) => ({ char, index }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map((item) => item.index);

    // Leer la matriz columna por columna basada en el orden de clave
    let encrypted = "";
    for (const index of keyOrder) {
      for (let j = 0; j < numRows; j++) {
        encrypted += matrix[j][index] || ""; // Usa '' si el índice está fuera de rango
      }
    }
    return encrypted.trim(); // Retornar cadena sin espacios al final
  };

  const decrypt = (text: string, key: string): string => {
    const keyLower = key.toLowerCase();
    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);
    const keyOrder = keyLower
      .split("")
      .map((char, index) => ({ char, index }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map((item) => item.index);

    const decryptedMatrix: string[][] = Array.from({ length: numRows }, () =>
      Array(numCols).fill("")
    );

    // Llenar la matriz descifrada columna por columna basada en el orden de clave
    let index = 0;
    for (const col of keyOrder) {
      for (let j = 0; j < numRows; j++) {
        if (index < text.length) {
          decryptedMatrix[j][col] = text[index];
          index++;
        }
      }
    }

    // Leer la matriz fila por fila
    let decrypted = "";
    for (let i = 0; i < numRows; i++) {
      decrypted += decryptedMatrix[i].join("");
    }
    return decrypted.trim(); // Retornar cadena sin espacios al final
  };

  const handleAction = (method: "cifrar" | "descifrar") => {
    if (method === "cifrar") {
      //let inputTexts = inputText.replace(/\s+/g, ''); // Eliminar todos los espacios
      const result = encrypt(inputText, key);
      setEncryptedText(result);
      setDecryptedText(""); // Limpiar el texto descifrado
    } else if (method === "descifrar") {
      const result = decrypt(encryptedText, key);
      setDecryptedText(result);
    }
  };
  const getAlphabetOrder = (char: string): number => {
    return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  };


  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-md max-w-lg mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Transposición Columnar Simple
      </h1>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Clave:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Texto:</label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>

      

      {/* Botones para Cifrar/Descifrar */}
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

       {/* Matriz Encriptada */}
      <div className="flex-1 border p-2 rounded bg-white mt-6">
        <h4 className="font-semibold">Matriz Encriptada</h4>
        {matrix.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
            <tr>
        {/* Encabezado de la clave */}
        {key.split("").map((char, index) => (
          <th key={index} className="border border-gray-300 p-2 bg-blue-100">
            {char}
          </th>
        ))}
      </tr>
      <tr>
        {/* Encabezado del orden alfabético */}
        {key.split("").map((char, index) => (
          <th key={index} className="border border-gray-300 p-2 bg-blue-100">
            {getAlphabetOrder(char)}
          </th>
        ))}
      </tr>
            </thead>
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`border border-gray-300 px-2 ${cell !== ' ' ? 'bg-green-200' : 'bg-white'}`} // Color de fondo al seleccionar
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

      <div className="mt-4">
        <h3 className="font-semibold">Texto Cifrado:</h3>
        <p className="p-2 bg-gray-200 rounded whitespace-pre">{encryptedText || "..."}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Texto Descifrado:</h3>
        <p className="p-2 bg-gray-200 rounded whitespace-pre">{decryptedText || "..."}</p>
      </div>
    </div>
  );
};

export default TranspocisionSimple