import React, { useState } from 'react';

export const TranspocisionSimple = () => {
  const [inputText, setInputText] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [encryptedText, setEncryptedText] = useState<string>('');
  const [decryptedText, setDecryptedText] = useState<string>('');

  const encrypt = (text: string, key: string): string => {
    const keyLower = key.toLowerCase();
    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);
    const paddedText = text.padEnd(numRows * numCols, ' '); // Padding with spaces if necessary
    const matrix: string[][] = [];

    
    // Fill the matrix row by row
    for (let i = 0; i < numRows; i++) {
      matrix.push(paddedText.slice(i * numCols, (i + 1) * numCols).split(''));
    }

    // Create a key order array
    const keyOrder = keyLower
      .split('')
      .map((char, index) => ({ char, index }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map(item => item.index);

    // Read the matrix column by column based on key order
    let encrypted = '';
    for (const index of keyOrder) {
      for (let j = 0; j < numRows; j++) {
        encrypted += matrix[j][index] || ''; // Use '' if the index is out of range
      }
    }
    return encrypted.trim(); // Return trimmed string
  };

  const decrypt = (text: string, key: string): string => {
    const keyLower = key.toLowerCase();
    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);
    const keyOrder = keyLower
      .split('')
      .map((char, index) => ({ char, index }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map(item => item.index);

    const decryptedMatrix: string[][] = Array.from({ length: numRows }, () => Array(numCols).fill(''));

    // Fill the decrypted matrix column by column based on key order
    let index = 0;
    for (const col of keyOrder) {
      for (let j = 0; j < numRows; j++) {
        if (index < text.length) {
          decryptedMatrix[j][col] = text[index];
          index++;
        }
      }
    }

    // Read the matrix row by row
    let decrypted = '';
    for (let i = 0; i < numRows; i++) {
      decrypted += decryptedMatrix[i].join('');
    }
    return decrypted.trim(); // Return trimmed string
  };

  const handleEncrypt = () => {
    //const cleanedText = inputText.replace(/\s+/g, ''); // Remove all white spaces
    const result = encrypt(inputText, key);
    setEncryptedText(result);
  };

  const handleDecrypt = () => {
    const result = decrypt(encryptedText, key);
    setDecryptedText(result);
  };

  return (
    <div className='bg-blue-100'>
      <h1>Transposición Columnar</h1>
      <div>
        <label>Texto: </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        <label>Clave: </label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
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
