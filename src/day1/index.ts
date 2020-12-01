export const part1 = (input: number[]) => () => {
  const desiredResult = 2020;
  let actualResult = 0;

  input.forEach((primary) =>
    input
      .filter((v) => v !== primary)
      .forEach((secondary) => {
        if (primary + secondary === desiredResult)
          actualResult = primary * secondary;
      })
  );

  return actualResult;
};

export const part2 = (input: number[]) => () => {
  const desiredResult = 2020;
  let actualResult = 0;

  input.forEach((primary) =>
    input
      .filter((v) => v !== primary)
      .forEach((secondary) =>
        input
          .filter((v) => v !== secondary)
          .forEach((tertiary) => {
            if (primary + secondary + tertiary === desiredResult)
              actualResult = primary * secondary * tertiary;
          })
      )
  );

  return actualResult;
};
