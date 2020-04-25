import { NodePlopAPI } from "plop";
import {} from "./constants";

export default (plop: NodePlopAPI) => {
  plop.addHelper("to_module", (category, name) => {
    if (category === "apps") return name;
    else if (category === "libs") return `lib-${name}`;
    else return `${category}-${name}`;
  });

  plop.addHelper("to_review", (category) => {
    switch (category) {
      case "apps":
        return "productions";
        break;
      case "libs":
        return "libraries";
        break;
      case "dev":
        return "developments";
        break;
      default:
        return "prototypes";
    }
  });
};
