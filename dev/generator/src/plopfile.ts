import { NodePlopAPI } from "plop";

import GenerateModules from "./modules";

export default function (plop: NodePlopAPI) {
  GenerateModules(plop);
}
