"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocatorStrategy = exports.saveLocator = void 0;
const lokijs_1 = __importDefault(require("lokijs"));
const locatorCollection = new lokijs_1.default("locator.db").addCollection("locators");
function saveLocator(strategy, elementResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        elementResponse.forEach((e, i, arr) => {
            let obj = {
                using: strategy.using,
                value: strategy.value,
                id: e["ELEMENT"],
                index: null,
            };
            if (arr.length > 1) {
                obj.index = i;
            }
            locatorCollection.insert(obj);
        });
    });
}
exports.saveLocator = saveLocator;
function getLocatorStrategy(elementId) {
    return __awaiter(this, void 0, void 0, function* () {
        return locatorCollection.find({
            id: elementId,
        })[0];
    });
}
exports.getLocatorStrategy = getLocatorStrategy;
