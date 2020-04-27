export enum DependencyType {
  APP = "",
  LIB = "lib",
  DEV = "dev",
}

export interface Dependency {
  type: DependencyType;
  name: string;

  readonly fullname: string;
}

export const internalBuilder = (type: DependencyType, name: string): Dependency => {
  return {
    type,
    name,
    fullname: `@nmsys/${type === DependencyType.APP ? "" : type + "-"}${name}`,
  };
};

export const externalBuilder = (type: DependencyType, name: string): Dependency => {
  return {
    type,
    name,
    fullname: name,
  };
};
