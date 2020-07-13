type Data = string | undefined | null;

const check = (...d: Data[]) => {
  if (process.env.ENV !== undefined && process.env.ENV !== "" && process.env.ENV !== null) {
    return d.some(data => process.env.ENV ?? "" === data ?? "");
  } else {
    return d.some(data => process.env.NODE_ENV ?? "" === data ?? "");
  }
};

export const isDevelopment = () => {
  return check("development", "develop", "dev", "d", "");
};

export const isTesting = () => {
  return check("testing", "tested", "test", "t");
};

export const isStaging = () => {
  return check("staging", "stage", "stag", "s");
};

export const isProduction = () => {
  return check("production", "product", "prod", "p");
};

export const isCI = () => {
  return process.env.CI === "true";
};
