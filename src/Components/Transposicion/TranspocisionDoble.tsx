import React, { useState } from 'react';

export const TranspocisionDoble = () => {
  const [inputText, setInputText] = useState<string>('');
  const [key1, setKey1] = useState<string>(''); // Primer clave
  const [key2, setKey2] = useState<string>(''); // Segunda clave
  const [encryptedText, setEncryptedText] = useState<string>('');
  const [decryptedText, setDecryptedText] = useState<string>('');

  const encrypt = (text: string, key1: string, key2: string): string => {
    const key1Lower = key1.toLowerCase();
    const key2Lower = key2.toLowerCase();
    
    // Cifrado con la primera clave
    const numCols1 = key1.length;
    const numRows1 = Math.ceil(text.length / numCols1);
    const paddedText1 = text.padEnd(numRows1 * numCols1, ' ');
    const matrix1: string[][] = [];

    for (let i = 0; i < numRows1; i++) {
      matrix1.push(paddedText1.slice(i * numCols1, (i + 1) * numCols1).split(''));
    }

    const keyOrder1 = key1Lower
      .split('')
      .map((char, index) => ({ char, index }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map(item => item.index);

    let intermediateText = '';
    for (const index of keyOrder1) {
      for (let j = 0; j < numRows1; j++) {
        intermediateText += matrix1[j][index] || '';
      }
    }

    console.log('Texto intermedio tras el primer cifrado:', intermediateText);

    // Cifrado con la segunda clave
    const numCols2 = key2.length;
    const numRows2 = Math.ceil(intermediateText.length / numCols2);
    const paddedText2 = intermediateText.padEnd(numRows2 * numCols2, ' ');
    const matrix2: string[][] = [];

    for (let i = 0; i < numRows2; i++) {
      matrix2.push(paddedText2.slice(i * numCols2, (i + 1) * numCols2).split(''));
    }

    const keyOrder2 = key2Lower
      .split('')
      .map((char, index) => ({ char, index }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map(item => item.index);

    let encrypted = '';
    for (const index of keyOrder2) {
      for (let j = 0; j < numRows2; j++) {
        encrypted += matrix2[j][index] || '';
      }
    }

    console.log('Texto cifrado final tras el segundo cifrado:', encrypted);
    return encrypted.trim(); // Return trimmed string
  };

  const decrypt = (text: string, key1: string, key2: string): string => {
    const key1Lower = key1.toLowerCase();
    const key2Lower = key2.toLowerCase();

    // Descifrado con la segunda clave
    const numCols2 = key2.length;
    const numRows2 = Math.ceil(text.length / numCols2);
    const keyOrder2 = key2Lower
      .split('')
      .map((char, index) => ({ char, index }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map(item => item.index);

    const decryptedMatrix2: string[][] = Array.from({ length: numRows2 }, () => Array(numCols2).fill(''));
    
    let index = 0;
    for (const col of keyOrder2) {
      for (let j = 0; j < numRows2; j++) {
        if (index < text.length) {
          decryptedMatrix2[j][col] = text[index];
          index++;
        }
      }
    }

    let intermediateText = '';
    for (let i = 0; i < numRows2; i++) {
      intermediateText += decryptedMatrix2[i].join('');
    }

    // Descifrado con la primera clave
    const numCols1 = key1.length;
    const numRows1 = Math.ceil(intermediateText.length / numCols1);
    const keyOrder1 = key1Lower
      .split('')
      .map((char, index) => ({ char, index }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map(item => item.index);

    const decryptedMatrix1: string[][] = Array.from({ length: numRows1 }, () => Array(numCols1).fill(''));
    
    index = 0;
    for (const col of keyOrder1) {
      for (let j = 0; j < numRows1; j++) {
        if (index < intermediateText.length) {
          decryptedMatrix1[j][col] = intermediateText[index];
          index++;
        }
      }
    }

    let decrypted = '';
    for (let i = 0; i < numRows1; i++) {
      decrypted += decryptedMatrix1[i].join('');
    }

    return decrypted.trim(); // Devuelve la cadena recortada
  };

  const handleEncrypt = () => {
    const result = encrypt(inputText, key1, key2); // Remueve los espacios en blanco
    setEncryptedText(result);
  };

  const handleDecrypt = () => {
    const result = decrypt(encryptedText, key1, key2);
    setDecryptedText(result);
  };

  return (
    <div className='bg-blue-100'>
      <h1>Transposición Doble Columnar</h1>
      <div>
        <label>Texto: </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        <label>Clave 1: </label>
        <input
          type="text"
          value={key1}
          onChange={(e) => setKey1(e.target.value)}
        />
      </div>
      <div>
        <label>Clave 2: </label>
        <input
          type="text"
          value={key2}
          onChange={(e) => setKey2(e.target.value)}
        />
      </div>
      <button onClick={handleEncrypt}>Cifrar</button>
      <button onClick={handleDecrypt}>Descifrar</button>
      <div>
        <h3>Texto Cifrado:</h3>
        <p>{encryptedText}</p>
        <h3>Texto Descifrado:</h3>
        <p>{decryptedText}</p>
      </div>
    </div>
  );
};
