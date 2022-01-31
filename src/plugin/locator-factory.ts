import { response } from "express";
import loki from "lokijs";

const locatorCollection = new loki("locator.db").addCollection("locators");

function getElementId(responseObj: any) {
  return (
    responseObj["ELEMENT"] || responseObj[Object.keys(responseObj).find((k: string) => k.startsWith("element")) || 0]
  );
}

async function saveLocator(strategy: any, elementResponse: any[]) {
  elementResponse.forEach((e, i, arr) => {
    let obj = {
      using: strategy.using,
      value: strategy.value,
      id: getElementId(e),
      index: null,
    } as any;

    if (arr.length > 1) {
      obj.index = i;
    }

    locatorCollection.insert(obj);
  });
}

async function getLocatorStrategy(elementId: string) {
  return locatorCollection.find({
    id: elementId,
  })[0];
}

export { saveLocator, getLocatorStrategy };
