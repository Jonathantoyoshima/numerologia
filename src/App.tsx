import { useState } from "react";
import { Line, Cell } from "./App.style";
import * as f from "./functions/functions";
import numeroHarmonicoFn from "./functions/numeroHarmonico";

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
  const [subconsciente, setSubconsciente] = useState(0);

  const [ciclo1, setCiclo1] = useState({ start: "", end: "", energia: 0 });
  const [ciclo2, setCiclo2] = useState({ start: "", end: "", energia: 0 });
  const [ciclo3, setCiclo3] = useState({ start: "", end: "", energia: 0 });

  const [name, setName] = useState("");
  const [niver, setNiver] = useState("");

  const [piramide, setPiramide] = useState<any[]>();

  const [numHarm, setNumHarm] = useState<{
    numeroHarmonico: number;
    grupo: number[];
  }>();

  const setValues = (thisname: string, thisniver: string) => {
    const oName = thisname?.toLowerCase().split("") || [];
    const oNiver = thisniver?.split("").map((n) => Number(n)) || [];

    const nMotiv = f.numeroMotivacao(oName);
    const nExp = f.numeroExpressao(oName);
    const nDest = f.numeroDestino(oNiver);
    const nLicaoCarmica = f.numerosLicaoCarmica(oName);

    setMotiv(nMotiv);
    setImp(f.numeroImpressao(oName));
    setExp(nExp);
    setDest(nDest);
    setMiss(f.numeroMissao(nExp + nDest));
    setDividaCarmica(f.numerosDividaCarmica(thisniver, nExp, nMotiv, nDest));
    setLicCarmica(nLicaoCarmica.join(", "));
    setTendCarmica(f.numerosTendCarmica(oName));
    setSubconsciente(f.numeroRespostaSubconsciente(nLicaoCarmica));

    const ciclos = f.numeroCicloVida(nDest, thisniver);

    setCiclo1(ciclos.ciclo1);
    setCiclo2(ciclos.ciclo2);
    setCiclo3(ciclos.ciclo3);

    const aPessoal = f.numerosAnoPessoal(thisniver);
    setAnoPessoal(aPessoal);

    setPiramide(f.piramideDaVida(thisname));

    setNumHarm(numeroHarmonicoFn(thisniver));
  };

  return (
    <>
      <div>
        Nome sem espaços:
        <br />
        <input
          onChange={(txt) => {
            setName(txt.target.value ?? "");
            setValues(txt.target.value, niver);
          }}
        />
      </div>
      <div>
        Data somente números (ddmmyyyy):
        <br />
        <input
          onChange={(txt) => {
            setNiver(txt.target.value ?? "");
            setValues(name, txt.target.value);
          }}
        />
        -----
      </div>
      <div>
        Piramide da vida:
        {piramide?.map((n) => (
          <Line>
            {n.map((a: any) => (
              <Cell $val={a.tamanho}>{a.valor}</Cell>
            ))}
          </Line>
        ))}
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
      <p>
        Mês pessoal para{" "}
        <input
          onChange={(v) => {
            const mes = Number(v.target.value) ?? 1;
            setMesPessoal(f.numerosMesPessoal(niver, mes));
          }}
        />
        : {mesPessoal}
      </p>
      <p>
        Dia pessoal para{" "}
        <input
          onChange={(v) => {
            const dia = Number(v.target.value) ?? 1;
            const mp = f.numerosMesPessoal(niver, mesPessoal);
            setDiaPessoal(f.numerosDiaPessoal(mp, dia));
          }}
        />
        : {diaPessoal}
      </p>
      <p>Resposta subconsciente: {subconsciente}</p>
      <hr />
      <p>Ciclos de vida:</p>
      <p>Primeiro ciclo de vida: </p>
      <p>
        De {ciclo1.start} até {ciclo1.end}
      </p>
      <p>Energia: {ciclo1.energia}</p>
      <hr />
      <p>Segundo ciclo de vida: </p>
      <p>
        De {ciclo2.start} até {ciclo2.end}
      </p>
      <p>Energia: {ciclo2.energia}</p>
      <hr />
      <p>Primeiro ciclo de vida: </p>
      <p>
        De {ciclo3.start} até {ciclo3.end}
      </p>
      <p>Energia: {ciclo3.energia}</p>
      <hr />
      <p>Número Harmonico: {numHarm?.numeroHarmonico} </p>
      <p>Grupo: {numHarm?.grupo.join(",")}</p>
      <hr />
    </>
  );
}

export default App;
