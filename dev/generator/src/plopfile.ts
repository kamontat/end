import { NodePlopAPI } from "plop";

import GenerateModules from "./modules/plopfile";

export default function (plop: NodePlopAPI) {
  GenerateModules(plop);
}
