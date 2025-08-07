import data from "../data/numerosHarmonicos";
import redutor from "./redutor";

const numeroHarmonicoFn = (niver: string) => {
  const dia = niver.substring(0, 2);
  const numeroHarmonico = redutor(dia.split("").map((n) => Number(n)));

  return { numeroHarmonico, grupo: data[numeroHarmonico] };
};

export default numeroHarmonicoFn;
