// Función para rotar la rejilla en sentido horario
const rotateGrid = (grid) => {
    return grid[0].map((_, index) => grid.map(row => row[index])).reverse();
};

// Función para cifrar el texto y devolverlo en una matriz cuadrada
const cipher = (grid, n, text) => {
    const square = Array.from({ length: n }, () => Array(n).fill("0"));
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

// Ejemplo de uso
const grid = [
    [1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 0],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1]
]
const text = "reto";
const n = 8;

const result = cipher(grid, n, text);
console.log(result);
