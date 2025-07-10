import { useState } from "react";

interface Mapping {
  [key: string]: number; // Allows any string key, but value must be number
}

const map: Mapping = {
  ["a"]: 1,
  ["b"]: 2,
  ["c"]: 3,
  ["d"]: 4,
  ["e"]: 5,
  ["u"]: 6,
  ["o"]: 7,
  ["f"]: 8,

  ["i"]: 1,
  ["k"]: 2,
  ["g"]: 3,
  ["m"]: 4,
  ["h"]: 5,
  ["v"]: 6,
  ["z"]: 7,
  ["p"]: 8,

  ["q"]: 1,
  ["r"]: 2,
  ["l"]: 3,
  ["t"]: 4,
  ["n"]: 5,
  ["w"]: 6,

  ["j"]: 1,
  ["s"]: 3,
  ["x"]: 6,
  ["y"]: 1,
  ["ç"]: 6,

  ["â"]: 8,
  ["ê"]: 12,
  ["ô"]: 14,

  ["á"]: 3,
  ["é"]: 7,
  ["í"]: 3,
  ["ó"]: 9,
  ["ú"]: 8,

  ["ã"]: 4,
  ["õ"]: 10,
};

const vogais = [
  "a",
  "e",
  "i",
  "o",
  "u",
  "á",
  "é",
  "í",
  "ó",
  "ú",
  "â",
  "ê",
  "ô",
  "ã",
  "õ",
];

const recursiveReduce = (values: number[], type?: string) => {
  const value = values.reduce((p, c) => p + c, 0);

  if (type === "m" && (value === 11 || value === 22)) {
    return value;
  }

  if (value > 9) {
    return recursiveReduce(
      value
        .toString()
        .split("")
        .map((v) => Number(v), type)
    );
  }

  return value;
};

const numeroMotivacao = (letter: string[]) => {
  const arr = letter.filter((l) => vogais.includes(l));
  const result = recursiveReduce(
    arr.map((v) => map[v]),
    "m"
  );
  return result;
};

const numeroImpressao = (letter: string[]) => {
  const arr = letter.filter((l) => !vogais.includes(l));
  const result = recursiveReduce(arr.map((v) => map[v]));
  return result;
};

const numeroExpressao = (letter: string[]) => {
  const result = recursiveReduce(letter.map((v) => map[v]));
  return result;
};

const numeroDestino = (letter: string[], niver: number[]) => {
  const result = recursiveReduce(letter.map((v) => map[v]).concat(niver), "m");
  return result;
};

const numeroMissao = (base:number) => {
  const result = recursiveReduce(String(base).split('').map(n => Number(n)), "m");
  return result;
};

function App() {
  const [motiv, setMotiv] = useState(0);
  const [imp, setImp] = useState(0);
  const [exp, setExp] = useState(0);
  const [dest, setDest] = useState(0);
  const [miss, setMiss] = useState(0);

  const [name, setName] = useState("");
  const [niver, setNiver] = useState("");

  const setValues = (thisname: string, thisniver: string) => {
    const oName = thisname?.toLowerCase().split("") || [];
    const oNiver =
      thisniver
        ?.toLowerCase()
        .split("")
        .map((n) => Number(n)) || [];

    const nExp = numeroExpressao(oName);
    const nDest = numeroDestino(oName, oNiver)

    setMotiv(numeroMotivacao(oName));
    setImp(numeroImpressao(oName));
    setExp(nExp);
    setDest(nDest);
    setMiss(numeroMissao(nExp + nDest));
  };

  return (
    <>
      <p>Motivação: {motiv}</p>
      <p>Impressão: {imp}</p>
      <p>Expressão: {exp}</p>
      <p>Destino: {dest}</p>
      <p>Missão: {miss}</p>

      <div>
        Nome sem espaços:
        <input
          onChange={(txt) => {
            setName(txt.target.value ?? "");
            setValues(txt.target.value, niver);
          }}
        />
      </div>
      <div>
        Data somente números:
        <input
          onChange={(txt) => {
            setNiver(txt.target.value ?? "");
            setValues(name, txt.target.value);
          }}
        />
      </div>
    </>
  );
}

export default App;
