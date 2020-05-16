import { Protocal, StrictProtocal } from "./Protocal";
import { User, StrictUser } from "./User";
import { Option } from "./Option";
import { Parameter } from "../Parameter";

export interface UniversalOptions {
  protocal?: Protocal;
  user?: User;
  custom?: Parameter;
  option?: Option;
}

export interface StrictUniversalOptions {
  tid: string;
  protocal: StrictProtocal;
  user: StrictUser;
  custom: Parameter;
}
