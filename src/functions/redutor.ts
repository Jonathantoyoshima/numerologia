const redutor = (values: number[], type?: string) => {
  const value = values.reduce((p, c) => p + c, 0);

  if (type === "m" && (value === 11 || value === 22)) {
    return value;
  }

  if (type === "ciclo" && value === 11) {
    return value;
  }

  if (value > 9) {
    return redutor(
      value
        .toString()
        .split("")
        .map((v) => Number(v), type)
    );
  }

  return value;
};

export default redutor;
