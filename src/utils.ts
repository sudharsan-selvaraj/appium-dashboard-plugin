import { CustomColumnOption } from "./interfaces/custom-column-options";

export function customModelColumn(options: CustomColumnOption) {
  let result: any = {};
  result["set"] = function (value: any) {
    if (options.json) {
      if ((value != null || value != undefined) && typeof value === "object") {
        value = JSON.stringify(value);
      }
    }
    this.setDataValue(options.name, value);
  };

  result["get"] = function () {
    let value = this.getDataValue(options.name);
    if (value == null) {
      return value;
    }
    if (options.json) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        //ignore
      }
    }
    return value;
  };
  return result;
}
