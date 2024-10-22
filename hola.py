import math
def convert_abecedario(index):
    return chr(index + 65)  # Convierte 0 → 'A', 1 → 'B', ..., 25 → 'Z'


def keynumbers(key):
    k = []
    for i in range(len(key)):
        k.append('')
    a = 1
    for i in range(27):
        for j in range(len(key)):
            if key[j] == convert_abecedario(i):
                k[j] = a
                a += 1
    return k

def cifrado_permutaciones(text, key):
    ptext = text.upper()
    keyn = keynumbers(key.upper())
    m = math.ceil(len(ptext) / len(key))
    mainArray = []
    for i in range(m):
        mainArray.append([])
        for j in range(len(key)):
            mainArray[i].append('')
    q = 0
    for i in range(m):
        for j in range(len(key)):
            if q < len(ptext):
                mainArray[i][j] = ptext[q]
                q += 1

    cArray = []

    for i in range(m):
        cArray.append([])
        for j in range(len(key)):
            cArray[i].append('')

    for i in range(m):
        for j in range(len(keyn)):
            cArray[i][keyn[j] - 1] = mainArray[i][j]

    encrypted = ""

    for i in range(len(cArray)):
        for j in range(len(cArray[i])):
            encrypted = encrypted + cArray[i][j]

    return encrypted

def descifrado_permutaciones(text, key):
    ptext = text.upper()
    keyn = keynumbers(key.upper())
    m = math.ceil(len(ptext) / len(key))
    mainArray = []
    for i in range(m):
        mainArray.append([])
        for j in range(len(key)):
            mainArray[i].append('')
    q = 0
    for i in range(m):
        for j in range(len(key)):
            if q < len(ptext):
                mainArray[i][j] = ptext[q]
                q += 1

    dArray = []

    for i in range(m):
        dArray.append([])
        for j in range(len(key)):
            dArray[i].append('')

    for i in range(m):
        for j in range(len(keyn)):
            dArray[i][j] = mainArray[i][keyn[j] - 1]

    decrypted = ""

    for i in range(len(dArray)):
        for j in range(len(dArray[i])):
            decrypted = decrypted + dArray[i][j]

    return decrypted


def main():
    text = input("Introduce el texto a encriptar: ")
    key = input("Introduce la clave de encriptación: ")

    # Cifrado
    encrypted_text = cifrado_permutaciones(text, key)
    print(f"\nTexto encriptado: {encrypted_text}")

    # Descifrado
    decrypted_text = descifrado_permutaciones(text, key)
    print(f"Texto descifrado: {decrypted_text}")

if __name__ == "__main__":
    main()