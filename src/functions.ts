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

  if (type === "ciclo" && value === 11) {
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

export const numeroMotivacao = (letter: string[]) => {
  const arr = letter.filter((l) => vogais.includes(l));
  const result = recursiveReduce(
    arr.map((v) => map[v]),
    "m"
  );
  return result;
};

export const numeroImpressao = (letter: string[]) => {
  const arr = letter.filter((l) => !vogais.includes(l));
  const result = recursiveReduce(arr.map((v) => map[v]));
  return result;
};

export const numeroExpressao = (letter: string[]) => {
  const result = recursiveReduce(letter.map((v) => map[v]));
  return result;
};

export const numeroDestino = (niver: number[]) => {
  const result = recursiveReduce(niver, "m");
  return result;
};

export const numeroMissao = (base: number) => {
  const result = recursiveReduce(
    String(base)
      .split("")
      .map((n) => Number(n)),
    "m"
  );
  return result;
};

export const numerosDividaCarmica = (
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

export const numerosLicaoCarmica = (letter: string[]) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const mapping = letter.map((v) => map[v]);
  return arr.filter((n) => !mapping.includes(n));
};

export const numerosTendCarmica = (letter: string[]) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const mapping = letter.map((v) => map[v]);
  return arr
    .filter((n) => mapping.filter((l) => l === n).length >= 3)
    .join(", ");
};

const validoAnoPessoal = (niver: string) => {
  const dia = niver.substring(0, 2);
  const mes = niver.substring(2, 4);

  const hoje = new Date();
  const niverDate = new Date(hoje.getFullYear(), Number(mes) - 1, Number(dia));
  return hoje > niverDate ? hoje.getFullYear() : hoje.getFullYear() - 1;
};

export const numerosAnoPessoal = (niver: string) => {
  const dia = niver.substring(0, 2);
  const mes = niver.substring(2, 4);
  const ano = validoAnoPessoal(niver);

  const valido: string = `${dia}${mes}${ano}`;

  return recursiveReduce(
    valido
      .toLowerCase()
      .split("")
      .map((x) => Number(x))
  );
};

export const numerosMesPessoal = (niver: string, mes: number) => {
  const ano = validoAnoPessoal(niver);
  const valido = `${mes}${ano}`;
  return recursiveReduce(
    valido
      .toLowerCase()
      .split("")
      .map((x) => Number(x))
  );
};

export const numerosDiaPessoal = (mp: number, dia: number) => {
  const valido = `${mp + dia}`;
  return recursiveReduce(
    valido
      .toLowerCase()
      .split("")
      .map((x) => Number(x))
  );
};

export const numeroRespostaSubconsciente = (nLicaoCarmica: number[]) => {
  return nLicaoCarmica.map((n) => 9 - n).join(", ");
  // 9 - o número de lições cármicas
};

export const numeroCicloVida = (nDest: number, niver: string) => {
  const dia = niver.substring(0, 2);
  const mes = niver.substring(2, 4);
  const ano = niver.substring(4);
  const duracaoCiclo = 37 - nDest;

  const ciclo1 = {
    start: `${ano}`,
    end: `${Number(ano) + duracaoCiclo}`,
    energia: recursiveReduce(
      mes.split("").map((n) => Number(n)),
      "ciclo"
    ),
  };

  const ciclo2 = {
    start: `${Number(ano) + duracaoCiclo}`,
    end: `${Number(ano) + duracaoCiclo + 27}`,
    energia: recursiveReduce(dia.split("").map((n) => Number(n))),
  };

  const ciclo3 = {
    start: `${Number(ano) + duracaoCiclo + 27}`,
    end: "final da vida",
    energia: recursiveReduce(ano.split("").map((n) => Number(n))),
  };

  return { ciclo1, ciclo2, ciclo3 };
};

const somarConsecutivos = (array: number[]) => {
  return array.reduce((resultados, valorAtual, indice, arrayOriginal) => {
    if (indice < arrayOriginal.length - 1) {
      const sum = `${valorAtual + arrayOriginal[indice + 1]}`
        .split("")
        .map((n) => Number(n));
      const v = recursiveReduce(sum);
      resultados.push(v);
    }
    return resultados;
  }, [] as number[]);
};

let result: number[][] = [];

const lines = (arr: number[]) => {
  result.push(arr);
  if (result[result.length - 1].length > 1) {
    const ln = somarConsecutivos(arr);
    return lines(ln);
  }

  return result;
};

const mapearSequencias = (array: number[]) => {
  if (array.length === 0) return [];

  const resultado = [];
  let contagem = 1;

  for (let i = 0; i < array.length; i++) {
    // Se o próximo elemento é igual ao atual, incrementa a contagem
    if (i < array.length - 1 && array[i] === array[i + 1]) {
      contagem++;
    } else {
      // Adiciona objetos ao resultado para cada elemento da sequência atual
      for (let j = 0; j < contagem; j++) {
        resultado.push({ valor: array[i], tamanho: contagem });
      }
      contagem = 1; // Reseta a contagem para a próxima sequência
    }
  }

  return resultado;
};

export const piramideDaVida = (nome: string) => {
  result = [];

  const n = lines(nome.split("").map((v) => map[v]));

  return n.map((seq) => mapearSequencias(seq));
};
