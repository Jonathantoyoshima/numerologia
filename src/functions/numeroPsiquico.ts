import data from "../data/numerosPsiquicos";

const numeroPsiquicoFn = (niver: string) => {
  const dia = niver.substring(0, 2);
  return { dia: dia, numeroPsiquico: data[dia] };
};

export default numeroPsiquicoFn;
