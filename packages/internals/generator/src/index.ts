import { NodePlopAPI } from "plop";

import { PlopWrapper } from "./models/PlopWrapper";
import { ModulesGenerator } from "./generator/ModulesGenerator";

export default function (plop: NodePlopAPI) {
  const wrapper = new PlopWrapper(plop);

  wrapper.generate(new ModulesGenerator());
}
