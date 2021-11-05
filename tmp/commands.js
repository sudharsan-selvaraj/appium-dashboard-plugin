module.exports.commands = {
  "/status": {
    GET: { command: "getStatus" },
  },
  "/session": {
    POST: {
      command: "createSession",
      payloadParams: {
        validate: (jsonObj) =>
          !jsonObj.capabilities &&
          !jsonObj.desiredCapabilities &&
          'we require one of "desiredCapabilities" or "capabilities" object',
        optional: ["desiredCapabilities", "requiredCapabilities", "capabilities"],
      },
    },
  },
  "/sessions": {
    GET: { command: "getSessions" },
  },
  "/session/:sessionId": {
    GET: { command: "getSession" },
    DELETE: { command: "deleteSession" },
  },
  "/session/:sessionId/timeouts": {
    GET: { command: "getTimeouts" }, // W3C route
    POST: {
      command: "timeouts",
      payloadParams: {
        validate: (jsonObj, protocolName) => {
          if (protocolName === PROTOCOLS.W3C) {
            if (
              !util.hasValue(jsonObj.script) &&
              !util.hasValue(jsonObj.pageLoad) &&
              !util.hasValue(jsonObj.implicit)
            ) {
              return "W3C protocol expects any of script, pageLoad or implicit to be set";
            }
          } else {
            if (!util.hasValue(jsonObj.type) || !util.hasValue(jsonObj.ms)) {
              return "MJSONWP protocol requires type and ms";
            }
          }
        },
        optional: ["type", "ms", "script", "pageLoad", "implicit"],
      },
    },
  },
  "/session/:sessionId/timeouts/async_script": {
    POST: { command: "asyncScriptTimeout", payloadParams: { required: ["ms"] } },
  },
  "/session/:sessionId/timeouts/implicit_wait": {
    POST: { command: "implicitWait", payloadParams: { required: ["ms"] } },
  },
  // JSONWP
  "/session/:sessionId/window_handle": {
    GET: { command: "getWindowHandle" },
  },
  // W3C
  "/session/:sessionId/window/handle": {
    GET: { command: "getWindowHandle" },
  },
  // JSONWP
  "/session/:sessionId/window_handles": {
    GET: { command: "getWindowHandles" },
  },
  // W3C
  "/session/:sessionId/window/handles": {
    GET: { command: "getWindowHandles" },
  },
  "/session/:sessionId/url": {
    GET: { command: "getUrl" },
    POST: { command: "setUrl", payloadParams: { required: ["url"] } },
  },
  "/session/:sessionId/forward": {
    POST: { command: "forward" },
  },
  "/session/:sessionId/back": {
    POST: { command: "back" },
  },
  "/session/:sessionId/refresh": {
    POST: { command: "refresh" },
  },
  "/session/:sessionId/execute": {
    POST: { command: "execute", payloadParams: { required: ["script", "args"] } },
  },
  "/session/:sessionId/execute_async": {
    POST: { command: "executeAsync", payloadParams: { required: ["script", "args"] } },
  },
  "/session/:sessionId/screenshot": {
    GET: { command: "getScreenshot" },
  },
  "/session/:sessionId/ime/available_engines": {
    GET: { command: "availableIMEEngines" },
  },
  "/session/:sessionId/ime/active_engine": {
    GET: { command: "getActiveIMEEngine" },
  },
  "/session/:sessionId/ime/activated": {
    GET: { command: "isIMEActivated" },
  },
  "/session/:sessionId/ime/deactivate": {
    POST: { command: "deactivateIMEEngine" },
  },
  "/session/:sessionId/ime/activate": {
    POST: { command: "activateIMEEngine", payloadParams: { required: ["engine"] } },
  },
  "/session/:sessionId/frame": {
    POST: { command: "setFrame", payloadParams: { required: ["id"] } },
  },
  "/session/:sessionId/frame/parent": {
    POST: {},
  },
  "/session/:sessionId/window": {
    GET: { command: "getWindowHandle" },
    POST: {
      command: "setWindow",
    },
    DELETE: { command: "closeWindow" },
  },
  "/session/:sessionId/window/:windowhandle/size": {
    GET: { command: "getWindowSize" },
    POST: {},
  },
  "/session/:sessionId/window/:windowhandle/position": {
    POST: {},
    GET: {},
  },
  "/session/:sessionId/window/:windowhandle/maximize": {
    POST: { command: "maximizeWindow" },
  },
  "/session/:sessionId/cookie": {
    GET: { command: "getCookies" },
    POST: { command: "setCookie", payloadParams: { required: ["cookie"] } },
    DELETE: { command: "deleteCookies" },
  },
  "/session/:sessionId/cookie/:name": {
    GET: { command: "getCookie" },
    DELETE: { command: "deleteCookie" },
  },
  "/session/:sessionId/source": {
    GET: { command: "getPageSource" },
  },
  "/session/:sessionId/title": {
    GET: { command: "title" },
  },
  "/session/:sessionId/element": {
    POST: { command: "findElement", payloadParams: { required: ["using", "value"] } },
  },
  "/session/:sessionId/elements": {
    POST: { command: "findElements", payloadParams: { required: ["using", "value"] } },
  },
  "/session/:sessionId/element/active": {
    GET: { command: "active" }, // W3C: https://w3c.github.io/webdriver/webdriver-spec.html#dfn-get-active-element
    POST: { command: "active" },
  },
  "/session/:sessionId/element/:elementId": {
    GET: {},
  },
  "/session/:sessionId/element/:elementId/element": {
    POST: { command: "findElementFromElement", payloadParams: { required: ["using", "value"] } },
  },
  "/session/:sessionId/element/:elementId/elements": {
    POST: { command: "findElementsFromElement", payloadParams: { required: ["using", "value"] } },
  },
  "/session/:sessionId/element/:elementId/click": {
    POST: { command: "click" },
  },
  "/session/:sessionId/element/:elementId/submit": {
    POST: { command: "submit" },
  },
  "/session/:sessionId/element/:elementId/text": {
    GET: { command: "getText" },
  },
  "/session/:sessionId/element/:elementId/value": {
    POST: {
      command: "setValue",
    },
  },
  "/session/:sessionId/keys": {
    POST: { command: "keys", payloadParams: { required: ["value"] } },
  },
  "/session/:sessionId/element/:elementId/name": {
    GET: { command: "getName" },
  },
  "/session/:sessionId/element/:elementId/clear": {
    POST: { command: "clear" },
  },
  "/session/:sessionId/element/:elementId/selected": {
    GET: { command: "elementSelected" },
  },
  "/session/:sessionId/element/:elementId/enabled": {
    GET: { command: "elementEnabled" },
  },
  "/session/:sessionId/element/:elementId/attribute/:name": {
    GET: { command: "getAttribute" },
  },
  "/session/:sessionId/element/:elementId/equals/:otherId": {
    GET: { command: "equalsElement" },
  },
  "/session/:sessionId/element/:elementId/displayed": {
    GET: { command: "elementDisplayed" },
  },
  "/session/:sessionId/element/:elementId/location": {
    GET: { command: "getLocation" },
  },
  "/session/:sessionId/element/:elementId/location_in_view": {
    GET: { command: "getLocationInView" },
  },
  "/session/:sessionId/element/:elementId/size": {
    GET: { command: "getSize" },
  },
  "/session/:sessionId/element/:elementId/css/:propertyName": {
    GET: { command: "getCssProperty" },
  },
  "/session/:sessionId/orientation": {
    GET: { command: "getOrientation" },
    POST: { command: "setOrientation", payloadParams: { required: ["orientation"] } },
  },
  "/session/:sessionId/rotation": {
    GET: { command: "getRotation" },
    POST: { command: "setRotation", payloadParams: { required: ["x", "y", "z"] } },
  },
  "/session/:sessionId/moveto": {
    POST: { command: "moveTo", payloadParams: { optional: ["element", "xoffset", "yoffset"] } },
  },
  "/session/:sessionId/click": {
    POST: { command: "clickCurrent", payloadParams: { optional: ["button"] } },
  },
  "/session/:sessionId/buttondown": {
    POST: { command: "buttonDown", payloadParams: { optional: ["button"] } },
  },
  "/session/:sessionId/buttonup": {
    POST: { command: "buttonUp", payloadParams: { optional: ["button"] } },
  },
  "/session/:sessionId/doubleclick": {
    POST: { command: "doubleClick" },
  },
  "/session/:sessionId/touch/click": {
    POST: { command: "click", payloadParams: { required: ["element"] } },
  },
  "/session/:sessionId/touch/down": {
    POST: { command: "touchDown", payloadParams: { required: ["x", "y"] } },
  },
  "/session/:sessionId/touch/up": {
    POST: { command: "touchUp", payloadParams: { required: ["x", "y"] } },
  },
  "/session/:sessionId/touch/move": {
    POST: { command: "touchMove", payloadParams: { required: ["x", "y"] } },
  },
  "/session/:sessionId/touch/scroll": {
    POST: {},
  },
  "/session/:sessionId/touch/doubleclick": {
    POST: {},
  },
  "/session/:sessionId/actions": {
    POST: { command: "performActions", payloadParams: { required: ["actions"] } },
    DELETE: { command: "releaseActions" },
  },
  "/session/:sessionId/touch/longclick": {
    POST: { command: "touchLongClick", payloadParams: { required: ["elements"] } },
  },
  "/session/:sessionId/touch/flick": {
    POST: {
      command: "flick",
      payloadParams: { optional: ["element", "xspeed", "yspeed", "xoffset", "yoffset", "speed"] },
    },
  },
  "/session/:sessionId/location": {
    GET: { command: "getGeoLocation" },
    POST: { command: "setGeoLocation", payloadParams: { required: ["location"] } },
  },
  "/session/:sessionId/local_storage": {
    GET: {},
    POST: {},
    DELETE: {},
  },
  "/session/:sessionId/local_storage/key/:key": {
    GET: {},
    DELETE: {},
  },
  "/session/:sessionId/local_storage/size": {
    GET: {},
  },
  "/session/:sessionId/session_storage": {
    GET: {},
    POST: {},
    DELETE: {},
  },
  "/session/:sessionId/session_storage/key/:key": {
    GET: {},
    DELETE: {},
  },
  "/session/:sessionId/session_storage/size": {
    GET: {},
  },
  // Selenium 4 clients
  "/session/:sessionId/se/log": {
    POST: { command: "getLog", payloadParams: { required: ["type"] } },
  },
  // Selenium 4 clients
  "/session/:sessionId/se/log/types": {
    GET: { command: "getLogTypes" },
  },
  // mjsonwire, appium clients
  "/session/:sessionId/log": {
    POST: { command: "getLog", payloadParams: { required: ["type"] } },
  },
  // mjsonwire, appium clients
  "/session/:sessionId/log/types": {
    GET: { command: "getLogTypes" },
  },
  "/session/:sessionId/application_cache/status": {
    GET: {},
  },

  //
  // mjsonwire
  //
  "/session/:sessionId/context": {
    GET: { command: "getCurrentContext" },
    POST: { command: "setContext", payloadParams: { required: ["name"] } },
  },
  "/session/:sessionId/contexts": {
    GET: { command: "getContexts" },
  },
  "/session/:sessionId/element/:elementId/pageIndex": {
    GET: { command: "getPageIndex" },
  },
  "/session/:sessionId/network_connection": {
    GET: { command: "getNetworkConnection" },
    POST: { command: "setNetworkConnection", payloadParams: { unwrap: "parameters", required: ["type"] } },
  },
  "/session/:sessionId/touch/perform": {
    POST: { command: "performTouch", payloadParams: { wrap: "actions", required: ["actions"] } },
  },
  "/session/:sessionId/touch/multi/perform": {
    POST: { command: "performMultiAction", payloadParams: { required: ["actions"], optional: ["elementId"] } },
  },
  "/session/:sessionId/receive_async_response": {
    POST: { command: "receiveAsyncResponse", payloadParams: { required: ["status", "value"] } },
  },
  "/session/:sessionId/appium/device/shake": {
    POST: { command: "mobileShake" },
  },
  "/session/:sessionId/appium/device/system_time": {
    GET: { command: "getDeviceTime", payloadParams: { optional: ["format"] } },
    POST: { command: "getDeviceTime", payloadParams: { optional: ["format"] } },
  },
  "/session/:sessionId/appium/device/lock": {
    POST: { command: "lock", payloadParams: { optional: ["seconds"] } },
  },
  "/session/:sessionId/appium/device/unlock": {
    POST: { command: "unlock" },
  },
  "/session/:sessionId/appium/device/is_locked": {
    POST: { command: "isLocked" },
  },
  "/session/:sessionId/appium/start_recording_screen": {
    POST: { command: "startRecordingScreen", payloadParams: { optional: ["options"] } },
  },
  "/session/:sessionId/appium/stop_recording_screen": {
    POST: { command: "stopRecordingScreen", payloadParams: { optional: ["options"] } },
  },
  "/session/:sessionId/appium/performanceData/types": {
    POST: { command: "getPerformanceDataTypes" },
  },
  "/session/:sessionId/appium/getPerformanceData": {
    POST: {
      command: "getPerformanceData",
      payloadParams: { required: ["packageName", "dataType"], optional: ["dataReadTimeout"] },
    },
  },
  "/session/:sessionId/appium/device/press_keycode": {
    POST: { command: "pressKeyCode", payloadParams: { required: ["keycode"], optional: ["metastate", "flags"] } },
  },
  "/session/:sessionId/appium/device/long_press_keycode": {
    POST: { command: "longPressKeyCode", payloadParams: { required: ["keycode"], optional: ["metastate", "flags"] } },
  },
  "/session/:sessionId/appium/device/finger_print": {
    POST: { command: "fingerprint", payloadParams: { required: ["fingerprintId"] } },
  },
  "/session/:sessionId/appium/device/send_sms": {
    POST: { command: "sendSMS", payloadParams: { required: ["phoneNumber", "message"] } },
  },
  "/session/:sessionId/appium/device/gsm_call": {
    POST: { command: "gsmCall", payloadParams: { required: ["phoneNumber", "action"] } },
  },
  "/session/:sessionId/appium/device/gsm_signal": {
    POST: {
      command: "gsmSignal",
    },
  },
  "/session/:sessionId/appium/device/gsm_voice": {
    POST: { command: "gsmVoice", payloadParams: { required: ["state"] } },
  },
  "/session/:sessionId/appium/device/power_capacity": {
    POST: { command: "powerCapacity", payloadParams: { required: ["percent"] } },
  },
  "/session/:sessionId/appium/device/power_ac": {
    POST: { command: "powerAC", payloadParams: { required: ["state"] } },
  },
  "/session/:sessionId/appium/device/network_speed": {
    POST: { command: "networkSpeed", payloadParams: { required: ["netspeed"] } },
  },
  "/session/:sessionId/appium/device/keyevent": {
    POST: { command: "keyevent", payloadParams: { required: ["keycode"], optional: ["metastate"] } },
  },
  "/session/:sessionId/appium/device/rotate": {
    POST: {
      command: "mobileRotation",
      payloadParams: {
        required: ["x", "y", "radius", "rotation", "touchCount", "duration"],
        optional: ["element"],
      },
    },
  },
  "/session/:sessionId/appium/device/current_activity": {
    GET: { command: "getCurrentActivity" },
  },
  "/session/:sessionId/appium/device/current_package": {
    GET: { command: "getCurrentPackage" },
  },
  //region Applications Management
  "/session/:sessionId/appium/device/install_app": {
    POST: {
      command: "installApp",
      payloadParams: {
        required: ["appPath"],
        optional: ["options"],
      },
    },
  },
  "/session/:sessionId/appium/device/activate_app": {
    POST: {
      command: "activateApp",
      payloadParams: {
        required: [["appId"], ["bundleId"]],
        optional: ["options"],
      },
    },
  },
  "/session/:sessionId/appium/device/remove_app": {
    POST: {
      command: "removeApp",
      payloadParams: {
        required: [["appId"], ["bundleId"]],
        optional: ["options"],
      },
    },
  },
  "/session/:sessionId/appium/device/terminate_app": {
    POST: {
      command: "terminateApp",
      payloadParams: {
        required: [["appId"], ["bundleId"]],
        optional: ["options"],
      },
    },
  },
  "/session/:sessionId/appium/device/app_installed": {
    POST: {
      command: "isAppInstalled",
      payloadParams: {
        required: [["appId"], ["bundleId"]],
      },
    },
  },
  "/session/:sessionId/appium/device/app_state": {
    GET: {
      command: "queryAppState",
      payloadParams: {
        required: [["appId"], ["bundleId"]],
      },
    },
    POST: {
      command: "queryAppState",
      payloadParams: {
        required: [["appId"], ["bundleId"]],
      },
    },
  },
  //endregion
  "/session/:sessionId/appium/device/hide_keyboard": {
    POST: { command: "hideKeyboard", payloadParams: { optional: ["strategy", "key", "keyCode", "keyName"] } },
  },
  "/session/:sessionId/appium/device/is_keyboard_shown": {
    GET: { command: "isKeyboardShown" },
  },
  "/session/:sessionId/appium/device/push_file": {
    POST: { command: "pushFile", payloadParams: { required: ["path", "data"] } },
  },
  "/session/:sessionId/appium/device/pull_file": {
    POST: { command: "pullFile", payloadParams: { required: ["path"] } },
  },
  "/session/:sessionId/appium/device/pull_folder": {
    POST: { command: "pullFolder", payloadParams: { required: ["path"] } },
  },
  "/session/:sessionId/appium/device/toggle_airplane_mode": {
    POST: { command: "toggleFlightMode" },
  },
  "/session/:sessionId/appium/device/toggle_data": {
    POST: { command: "toggleData" },
  },
  "/session/:sessionId/appium/device/toggle_wifi": {
    POST: { command: "toggleWiFi" },
  },
  "/session/:sessionId/appium/device/toggle_location_services": {
    POST: { command: "toggleLocationServices" },
  },
  "/session/:sessionId/appium/device/open_notifications": {
    POST: { command: "openNotifications" },
  },
  "/session/:sessionId/appium/device/start_activity": {
    POST: {
      command: "startActivity",
      payloadParams: {
        required: ["appPackage", "appActivity"],
        optional: [
          "appWaitPackage",
          "appWaitActivity",
          "intentAction",
          "intentCategory",
          "intentFlags",
          "optionalIntentArguments",
          "dontStopAppOnReset",
        ],
      },
    },
  },
  "/session/:sessionId/appium/device/system_bars": {
    GET: { command: "getSystemBars" },
  },
  "/session/:sessionId/appium/device/display_density": {
    GET: { command: "getDisplayDensity" },
  },
  "/session/:sessionId/appium/simulator/touch_id": {
    POST: { command: "touchId", payloadParams: { required: ["match"] } },
  },
  "/session/:sessionId/appium/simulator/toggle_touch_id_enrollment": {
    POST: { command: "toggleEnrollTouchId", payloadParams: { optional: ["enabled"] } },
  },
  "/session/:sessionId/appium/app/launch": {
    POST: { command: "launchApp" },
  },
  "/session/:sessionId/appium/app/close": {
    POST: { command: "closeApp" },
  },
  "/session/:sessionId/appium/app/reset": {
    POST: { command: "reset" },
  },
  "/session/:sessionId/appium/app/background": {
    POST: { command: "background", payloadParams: { required: ["seconds"] } },
  },
  "/session/:sessionId/appium/app/end_test_coverage": {
    POST: { command: "endCoverage", payloadParams: { required: ["intent", "path"] } },
  },
  "/session/:sessionId/appium/app/strings": {
    POST: { command: "getStrings", payloadParams: { optional: ["language", "stringFile"] } },
  },
  "/session/:sessionId/appium/element/:elementId/value": {
    POST: {
      command: "setValueImmediate",
    },
  },
  "/session/:sessionId/appium/element/:elementId/replace_value": {
    POST: {
      command: "replaceValue",
    },
  },
  "/session/:sessionId/appium/settings": {
    POST: { command: "updateSettings", payloadParams: { required: ["settings"] } },
    GET: { command: "getSettings" },
  },
  "/session/:sessionId/appium/receive_async_response": {
    POST: { command: "receiveAsyncResponse", payloadParams: { required: ["response"] } },
  },
  "/session/:sessionId/appium/execute_driver": {
    POST: { command: "executeDriverScript", payloadParams: { required: ["script"], optional: ["type", "timeout"] } },
  },
  "/session/:sessionId/appium/events": {
    POST: { command: "getLogEvents", payloadParams: { optional: ["type"] } },
  },
  "/session/:sessionId/appium/log_event": {
    POST: { command: "logCustomEvent", payloadParams: { required: ["vendor", "event"] } },
  },

  /*
   * The W3C spec has some changes to the wire protocol.
   * https://w3c.github.io/webdriver/webdriver-spec.html
   * Begin to add those changes here, keeping the old version
   * since clients still implement them.
   */
  // old alerts
  "/session/:sessionId/alert_text": {
    GET: { command: "getAlertText" },
    POST: {
      command: "setAlertText",
    },
  },
  "/session/:sessionId/accept_alert": {
    POST: { command: "postAcceptAlert" },
  },
  "/session/:sessionId/dismiss_alert": {
    POST: { command: "postDismissAlert" },
  },
  // https://w3c.github.io/webdriver/webdriver-spec.html#user-prompts
  "/session/:sessionId/alert/text": {
    GET: { command: "getAlertText" },
    POST: {
      command: "setAlertText",
    },
  },
  "/session/:sessionId/alert/accept": {
    POST: { command: "postAcceptAlert" },
  },
  "/session/:sessionId/alert/dismiss": {
    POST: { command: "postDismissAlert" },
  },
  // https://w3c.github.io/webdriver/webdriver-spec.html#get-element-rect
  "/session/:sessionId/element/:elementId/rect": {
    GET: { command: "getElementRect" },
  },
  "/session/:sessionId/execute/sync": {
    POST: { command: "execute", payloadParams: { required: ["script", "args"] } },
  },
  "/session/:sessionId/execute/async": {
    POST: { command: "executeAsync", payloadParams: { required: ["script", "args"] } },
  },
  // Pre-W3C endpoint for element screenshot
  "/session/:sessionId/screenshot/:elementId": {
    GET: { command: "getElementScreenshot" },
  },
  "/session/:sessionId/element/:elementId/screenshot": {
    GET: { command: "getElementScreenshot" },
  },
  "/session/:sessionId/window/rect": {
    GET: { command: "getWindowRect" },
    POST: { command: "setWindowRect", payloadParams: { required: ["x", "y", "width", "height"] } },
  },
  "/session/:sessionId/window/maximize": {
    POST: { command: "maximizeWindow" },
  },
  "/session/:sessionId/window/minimize": {
    POST: { command: "minimizeWindow" },
  },
  "/session/:sessionId/window/fullscreen": {
    POST: { command: "fullScreenWindow" },
  },
  "/session/:sessionId/element/:elementId/property/:name": {
    GET: { command: "getProperty" },
  },
  "/session/:sessionId/appium/device/set_clipboard": {
    POST: {
      command: "setClipboard",
      payloadParams: {
        required: ["content"],
        optional: ["contentType", "label"],
      },
    },
  },
  "/session/:sessionId/appium/device/get_clipboard": {
    POST: {
      command: "getClipboard",
      payloadParams: {
        optional: ["contentType"],
      },
    },
  },
  "/session/:sessionId/appium/compare_images": {
    POST: {
      command: "compareImages",
      payloadParams: {
        required: ["mode", "firstImage", "secondImage"],
        optional: ["options"],
      },
    },
  },

  // chromium devtools
  // https://chromium.googlesource.com/chromium/src/+/master/chrome/test/chromedriver/server/http_handler.cc
  "/session/:sessionId/:vendor/cdp/execute": {
    POST: { command: "executeCdp", payloadParams: { required: ["cmd", "params"] } },
  },

  //region Webauthn
  // https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator

  "/session/:sessionId/webauthn/authenticator": {
    POST: {
      command: "addVirtualAuthenticator",
      payloadParams: {
        required: ["protocol", "transport"],
        optional: ["hasResidentKey", "hasUserVerification", "isUserConsenting", "isUserVerified"],
      },
    },
  },

  "/session/:sessionId/webauthn/authenticator/:authenticatorId": {
    DELETE: {
      command: "removeVirtualAuthenticator",
    },
  },

  "/session/:sessionId/webauthn/authenticator/:authenticatorId/credential": {
    POST: {
      command: "addAuthCredential",
      payloadParams: {
        required: ["credentialId", "isResidentCredential", "rpId", "privateKey"],
        optional: ["userHandle", "signCount"],
      },
    },
  },

  "/session/:sessionId/webauthn/authenticator/:authenticatorId/credentials": {
    GET: { command: "getAuthCredential" },
    DELETE: { command: "removeAllAuthCredentials" },
  },

  "/session/:sessionId/webauthn/authenticator/:authenticatorId/credentials/:credentialId": {
    DELETE: { command: "removeAuthCredential" },
  },

  "/session/:sessionId/webauthn/authenticator/:authenticatorId/uv": {
    POST: {
      command: "setUserAuthVerified",
      payloadParams: {
        required: ["isUserVerified"],
      },
    },
  },

  //endregion
};
