import { Protocal, StrictProtocal } from "./Protocal";
import { User, StrictUser } from "./User";
import { Parameter } from "../Parameter";

export interface UniversalOptions {
  protocal?: Protocal;
  user?: User;
  custom?: Parameter;
}

export interface StrictUniversalOptions {
  tid: string;
  protocal: StrictProtocal;
  user: StrictUser;
  custom: Parameter;
}
