import fs from "fs";
import yaml from "js-yaml";
import merge from "lodash.merge";

export function mergeWorkflowFiles(
  targetWorkflowPath: string,
  secondWorkflowPath: string
) {
  const existsTarget = fs.existsSync(targetWorkflowPath);
  const existsSecond = fs.existsSync(secondWorkflowPath);
  if (!existsTarget && !existsSecond) {
    return;
  }

  const targetWorkflow = existsTarget
    ? yaml.load(fs.readFileSync(targetWorkflowPath, "utf8"))
    : {};
  const secondWorkflow = existsSecond
    ? yaml.load(fs.readFileSync(secondWorkflowPath, "utf8"))
    : {};

  const mergedWorkflow = merge(targetWorkflow, secondWorkflow);

  fs.writeFileSync(targetWorkflowPath, yaml.dump(mergedWorkflow), "utf8");
}
