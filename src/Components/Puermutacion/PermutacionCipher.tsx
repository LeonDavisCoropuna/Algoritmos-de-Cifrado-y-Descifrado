import { useState } from 'react';
import { Button } from '../Button/Button';

const PermutationCipher = () => {
    const [text, setText] = useState('');
    const [key, setKey] = useState('');
    const [encryptedText, setEncryptedText] = useState<string>("");
    const [decryptedText, setDecryptedText] = useState<string>("");
    const [alphabet, setAlphabet] = useState<string>("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    const keyNumbers = (key: string) => {
        let k = Array(key.length);
        let a = 1;

        for (let i = 0; i < alphabet.length; i++) {
            for (let j = 0; j < key.length; j++) {
                if (key[j] === alphabet[i]) {
                    k[j] = a++;
                }
            }
        }
        return k;
    };

    const permuteEncrypt = (ptext: string, key: string) => {
        ptext = ptext.toUpperCase();
        const keyn = keyNumbers(key.toUpperCase());
        const m = Math.ceil(ptext.length / key.length);
        let mainArray = Array.from({ length: m }, () => Array(key.length).fill(''));

        let q = 0;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < key.length; j++) {
                if (q < ptext.length) {
                    mainArray[i][j] = ptext[q++];
                }
            }
        }

        let cArray = Array.from({ length: m }, () => Array(key.length).fill(''));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < keyn.length; j++) {
                cArray[i][keyn[j] - 1] = mainArray[i][j];
            }
        }

        return cArray.flat().join('');
    };

    const permuteDecrypt = (ctext: string, key: string) => {
        ctext = ctext.toUpperCase();
        const keyn = keyNumbers(key.toUpperCase());
        const m = Math.ceil(ctext.length / key.length);
        let mainArray = Array.from({ length: m }, () => Array(key.length).fill(''));

        let q = 0;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < key.length; j++) {
                if (q < ctext.length) {
                    mainArray[i][keyn[j] - 1] = ctext[q++];
                }
            }
        }

        return mainArray.flat().join('').trim();
    };

    const handleAction = (method: "cifrar" | "descifrar") => {
        if (method === "cifrar") {
            const result = permuteEncrypt(text, key);
            setEncryptedText(result);
            setDecryptedText(""); // Limpiar el texto descifrado
        } else if (method === "descifrar") {
            const result = permuteDecrypt(text, key);
            setDecryptedText(result);
            setEncryptedText(""); // Limpiar el texto descifrado
        }
    };

    return (
        <div className='bg-blue-100 p-6 rounded-lg shadow-md max-w-lg mx-auto mt-6'>
            <h1 className="text-2xl font-bold mb-4 text-center">
                Permutación en Series
            </h1>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Alfabeto:</label>
                <input
                    type="text"
                    value={alphabet}
                    onChange={(e) => setAlphabet(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Texto:</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Clave:</label>
                <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                />
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

            <div className="mt-4">
                <h3 className="font-semibold">Texto Cifrado:</h3>
                <p className="p-2 bg-gray-200 rounded">{encryptedText || "..."}</p>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold">Texto Descifrado:</h3>
                <p className="p-2 bg-gray-200 rounded">{decryptedText || "..."}</p>
            </div>
        </div>
    );
};

export default PermutationCipher;
