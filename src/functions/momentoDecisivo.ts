import type IMomentoDecisivo from "../interface/momentoDecisivo";
import reduzNiver from "./niverDecomposicao";
import redutor from "./redutor";

const momentoDecisivoFn = (niver: string): IMomentoDecisivo => {
  const { dia, mes, ano } = reduzNiver(niver);

  const m1 = `${dia}${mes}`.split("").map((x) => Number(x));
  const momento1 = redutor(m1);

  const m2 = `${dia}${ano}`.split("").map((x) => Number(x));
  const momento2 = redutor(m2);

  const m3 = `${momento1 + momento2}`.split("").map((x) => Number(x));
  const momento3 = redutor(m3);

  const m4 = `${mes}${ano}`.split("").map((x) => Number(x));
  const momento4 = redutor(m4);

  return { momento1, momento2, momento3, momento4 };
};

export default momentoDecisivoFn;
