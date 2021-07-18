export const asyncwaite = (miliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, miliseconds);
  });
};

export const asyncLog = (...args: any) => {
  return new Promise((resolve) => {
    console.log(args);
    resolve("");
  });
};
