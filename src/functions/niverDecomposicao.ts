const niverDecomposicao = (niver: string) => {
  const reduxNiver = niver.replace(/\D/g, "");
  const dia = reduxNiver.substring(0, 2);
  const mes = reduxNiver.substring(2, 4);
  const ano = reduxNiver.substring(4);
  return { dia, mes, ano };
};

export default niverDecomposicao;
