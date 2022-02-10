import IosDevice from "appium-ios-device";
import { getSimulator as _getSimulator } from "appium-ios-simulator";
async function isRealDevice(deviceUUID: string) {
  try {
    await IosDevice.getDeviceVersion(deviceUUID);
    return true;
  } catch (err) {
    return false;
  }
}

async function getSimulator(deviceUUID: string) {
  return await _getSimulator(deviceUUID);
}

export { isRealDevice, getSimulator };
