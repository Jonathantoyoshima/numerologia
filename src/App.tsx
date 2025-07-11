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

const numeroDestino = (niver: number[]) => {
  const result = recursiveReduce(niver, "m");
  return result;
};

const numeroMissao = (base: number) => {
  const result = recursiveReduce(
    String(base)
      .split("")
      .map((n) => Number(n)),
    "m"
  );
  return result;
};

const numerosDividaCarmica = (
  niver: string,
  nExp: number,
  nMotiv: number,
  nDest: number
) => {
  const dia = Number(niver.substring(0, 2));

  let numeros = [];

  if (nExp === 4 || nMotiv === 4 || nDest === 4 || dia === 13) numeros.push(13);
  if (nExp === 5 || nMotiv === 5 || nDest === 5 || dia === 14) numeros.push(14);
  if (nExp === 7 || nMotiv === 7 || nDest === 7 || dia === 16) numeros.push(16);
  if (nExp === 9 || nMotiv === 9 || nDest === 9 || dia === 19) numeros.push(19);

  return numeros.join(", ");
};

const numerosLicaoCarmica = (letter:string[]) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const mapping = letter.map((v) => map[v]);
  const num = arr.filter(n => !mapping.includes(n))
  return num.join(', ')

}

const numerosTendCarmica = (letter:string[]) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const mapping = letter.map((v) => map[v]);
  return arr.filter(n => mapping.filter(l => l === n).length >= 3).join(', ');

}

const validoAnoPessoal = (niver:string) => {
  const dia = niver.substring(0,2);
  const mes = niver.substring(2,4);
  
  const hoje = new Date();
  const niverDate = new Date(hoje.getFullYear(), Number(mes)-1, Number(dia));
  return hoje > niverDate ? hoje.getFullYear() : hoje.getFullYear() - 1;
}

const numerosAnoPessoal = (niver:string) => {
  const dia = niver.substring(0,2);
  const mes = niver.substring(2,4);
  const ano = validoAnoPessoal(niver);

  const valido:string = `${dia}${mes}${ano}`;

  return recursiveReduce(valido.toLowerCase().split("").map(x => Number(x)));
}

const numerosMesPessoal = (niver:string, mes:number) => {
  const ano = validoAnoPessoal(niver);
  const valido = `${mes}${ano}`;
  return recursiveReduce(valido.toLowerCase().split("").map(x => Number(x)));
}

const numerosDiaPessoal = (mp:number, dia:number) => {
  const valido = `${mp + dia}`;
  return recursiveReduce(valido.toLowerCase().split("").map(x => Number(x)));
}

function App() {
  const [motiv, setMotiv] = useState(0);
  const [imp, setImp] = useState(0);
  const [exp, setExp] = useState(0);
  const [dest, setDest] = useState(0);
  const [miss, setMiss] = useState(0);

  const [divCarmica, setDividaCarmica] = useState("");
  const [licCarmica, setLicCarmica] = useState("");
  const [tendCarmica, setTendCarmica] = useState("");

  const [anoPessoal, setAnoPessoal] = useState(0);
  const [mesPessoal, setMesPessoal] = useState(0);
  const [diaPessoal, setDiaPessoal] = useState(0);

  const [name, setName] = useState("");
  const [niver, setNiver] = useState("");  

  const setValues = (thisname: string, thisniver: string) => {
    const oName = thisname?.toLowerCase().split("") || [];
    const oNiver =
      thisniver
        ?.split("")
        .map((n) => Number(n)) || [];

    const nMotiv = numeroMotivacao(oName);
    const nExp = numeroExpressao(oName);
    const nDest = numeroDestino(oNiver);

    setMotiv(nMotiv);
    setImp(numeroImpressao(oName));
    setExp(nExp);
    setDest(nDest);
    setMiss(numeroMissao(nExp + nDest));
    setDividaCarmica(numerosDividaCarmica(thisniver, nExp, nMotiv, nDest));
    setLicCarmica(numerosLicaoCarmica(oName));
    setTendCarmica(numerosTendCarmica(oName));
    
    const aPessoal = numerosAnoPessoal(thisniver);
    setAnoPessoal(aPessoal);    
  };

  return (
    <>
      <div>
        Nome sem espaços:<br/>
        <input
          onChange={(txt) => {
            setName(txt.target.value ?? "");
            setValues(txt.target.value, niver);
          }}
        />
      </div>
      <div>
        Data somente números (ddmmyyyy):<br/>
        <input
          onChange={(txt) => {
            setNiver(txt.target.value ?? "");
            setValues(name, txt.target.value);
          }}
        />
      </div>
      ---
      <p>Motivação: {motiv}</p>
      <p>Impressão: {imp}</p>
      <p>Expressão: {exp}</p>
      <p>Destino: {dest}</p>
      <p>Missão: {miss}</p>
      ---
      <p>Dívidas cármicas: {divCarmica}</p>
      <p>Lições cármicas: {licCarmica}</p>
      <p>Tendências ocultas: {tendCarmica}</p>
      ---
      <p>Ano pessoal: {anoPessoal}</p>
      <p>Mês pessoal para <input onChange={(v) => {
        const mes = Number(v.target.value) ?? 1;
        setMesPessoal(numerosMesPessoal(niver,mes));
      }}/>: {mesPessoal}</p>
      <p>Dia pessoal para <input onChange={(v) => {
        const dia = Number(v.target.value) ?? 1;
        const mp = numerosMesPessoal(niver,mesPessoal)
        setDiaPessoal(numerosDiaPessoal(mp, dia));
      }}/>: {diaPessoal}</p>
      

    </>
  );
}

export default App;
