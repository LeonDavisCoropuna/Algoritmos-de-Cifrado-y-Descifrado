import React, { useState } from "react";
import { Button } from "../Button/Button";

// Función para convertir un número en una letra del abecedario (0 → 'A', 1 → 'B', ..., 25 → 'Z')
const convertAbecedario = (index: number): string => {
    return String.fromCharCode(index + 65); // Convierte 0 → 'A', 1 → 'B', ..., 25 → 'Z'
};

// Función para generar los números clave
const keynumbers = (key: string): number[] => {
    const k: number[] = Array(key.length).fill(0);
    let a = 1;
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < key.length; j++) {
            if (key[j] === convertAbecedario(i)) {
                k[j] = a;
                a++;
            }
        }
    }
    return k;
};

// Función de cifrado por permutaciones
const cifradoPermutaciones = (text: string, key: string): string => {
    const ptext = text.toUpperCase();
    const keyn = keynumbers(key.toUpperCase());
    const m = Math.ceil(ptext.length / key.length);
    const mainArray: string[][] = Array.from({ length: m }, () => Array(key.length).fill(""));

    let q = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < key.length; j++) {
            if (q < ptext.length) {
                mainArray[i][j] = ptext[q];
                q++;
            }
        }
    }

    const cArray: string[][] = Array.from({ length: m }, () => Array(key.length).fill(""));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < keyn.length; j++) {
            cArray[i][keyn[j] - 1] = mainArray[i][j];
        }
    }

    let encrypted = "";
    for (const row of cArray) {
        for (const char of row) {
            encrypted += char;
        }
    }
    console.log(encrypted)
    return encrypted;
};

// Función de descifrado por permutaciones
const descifradoPermutaciones = (text: string, key: string): string => {
    const ptext = text.toUpperCase();
    const keyn = keynumbers(key.toUpperCase());
    const m = Math.ceil(ptext.length / key.length);
    const mainArray: string[][] = Array.from({ length: m }, () => Array(key.length).fill(""));

    let q = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < key.length; j++) {
            if (q < ptext.length) {
                mainArray[i][j] = ptext[q];
                q++;
            }
        }
    }

    const dArray: string[][] = Array.from({ length: m }, () => Array(key.length).fill(""));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < keyn.length; j++) {
            dArray[i][j] = mainArray[i][keyn[j] - 1];
        }
    }

    let decrypted = "";
    for (const row of dArray) {
        for (const char of row) {
            decrypted += char;
        }
    }
    return decrypted;
};

// Componente de React
const EncryptionComponent: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [encryptedText, setEncryptedText] = useState<string>("");
    const [decryptedText, setDecryptedText] = useState<string>("");

    const handleAction = (method: "cifrar" | "descifrar") => {
        if (method === "cifrar") {
            const result = cifradoPermutaciones(text, key)
            setEncryptedText(result)
            setDecryptedText(""); // Limpiar el texto descifrado
        } else if (method === "descifrar") {
            const result = descifradoPermutaciones(text, key);
            setDecryptedText(result);
            setEncryptedText("")
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold p-4 text-center">
                Cifrado por Permutaciones
            </h1>
            <div className="mb-4">
                <label className="block font-semibold">Texto:</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                />
            </div>
            <div>
                <label className="block font-semibold">Clave:</label>
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
                <h3 className="font-semibold whitespace-pre">Texto Cifrado:</h3>
                <p className="p-2 bg-gray-200 rounded whitespace-pre">{encryptedText || "..."}</p>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold whitespace-pre">Texto Descifrado:</h3>
                <p className="p-2 bg-gray-200 rounded whitespace-pre">{decryptedText || "..."}</p>
            </div>
        </div>
    );
};

export default EncryptionComponent;
