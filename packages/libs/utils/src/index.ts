export const isDevelopment = () => {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "develop" ||
    process.env.NODE_ENV === "dev" ||
    process.env.NODE_ENV === "d" ||
    process.env.NODE_ENV === "" ||
    process.env.NODE_ENV === undefined ||
    process.env.NODE_ENV === null
  );
};

export const isTesting = () => {
  return (
    process.env.NODE_ENV === "testing" ||
    process.env.NODE_ENV === "tested" ||
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "t"
  );
};

export const isStaging = () => {
  return (
    process.env.NODE_ENV === "staging" ||
    process.env.NODE_ENV === "stage" ||
    process.env.NODE_ENV === "stag" ||
    process.env.NODE_ENV === "s"
  );
};

export const isProduction = () => {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "product" ||
    process.env.NODE_ENV === "prod" ||
    process.env.NODE_ENV === "p"
  );
};

export const isCI = () => {
  return process.env.CI === "true";
};
