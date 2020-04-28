export enum DependencyType {
  APP = "app", // main application or huge frameworks
  LIB = "lib", // small utils or libraries
  TST = "test", // testing utils
  DEV = "dev", // development process for developer
}

export enum DependencyFrom {
  EX = "external",
  IN = "internal",
}

export interface Dependency {
  type: DependencyType;
  from: DependencyFrom;
  name: string;

  readonly fullname: string;
}

export const internalBuilder = (type: DependencyType, name: string): Dependency => {
  return {
    type,
    from: DependencyFrom.IN,
    name,
    fullname: `@nmsys/${type === DependencyType.APP ? "" : type + "-"}${name}`,
  };
};

export const externalBuilder = (type: DependencyType, name: string): Dependency => {
  return {
    type,
    from: DependencyFrom.EX,
    name,
    fullname: name,
  };
};
