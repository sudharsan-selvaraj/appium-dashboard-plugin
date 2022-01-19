<p align="center">
<img src="./assets/logo.png" height=150/>
</p>

<p align="center">
   <i><strong>Appium plugin that provides complete test logs, video recording of test and device logs(logcat and syslogs) for easy debugging of tests.</strong></i>
<p>

## Sample Preview

Check the sample video [here](https://gfycat.com/sharpincompletehorsechestnutleafminer)

### Screenshot

<p align="center">
<a href="https://gfycat.com/sharpincompletehorsechestnutleafminer">
<img src="./assets/preview.png"/>
</a></p>

## Installation

This plugin requires Appium version 2.0. Once appium 2.0 is installed, run the bellow command to install the plugin

```sh
appium plugin install --source=npm appium-dashboard
```

## Plugin Activation

Once the installion is done, the plugin needs to be activated each time when the appium server is started using below command

```sh
appium --use-plugin=appium-dashboard
```

Now navigate to `http://localhost:4723/dashboard` to open the client web app which will show the complete list of tests and its details that are being executed.

NOTE: This plugin is still in beta phase and heavy testing is being done to eliminate all possible issues along with lot other new features.

## Troubleshooting

### Migrating from 1.x to 2.0

If you are migrating from 1.0 to 2.0 to try out this plugin, be aware that 2.0 has breaking changes as listed below.

> https://appiumpro.com/editions/123-migrating-to-appium-20-part-1-capability-prefixes

If your tests stop working, you may think that it has got something to do with this plugin, but maybe it is not.

To fix/rule out the breaking changes due to 2.0; you have to make the below two minor changes in your code, for it to continue working on both 1.x and 2.0.

- Run this command `appium --base-path /wd/hub` to start the server (assuming your baseURL in 1.2 has /wd/hub as a part of hostURl)
  - Reference: https://github.com/appium/appium/issues/15261
- A quote From appium 2.0 `With Appium 2.0, the Appium server will enforce strict compability with the W3C WebDriver specification when it comes to Capabilities`
  . Which means the existing appium capabilities are not supported in 2.0 and there are a couple of "easy" workarounds that users can do
  to make tests run in both 2.0 and 1.x. For example, if you run your tests and you get an error similar to below.
  `org.openqa.selenium.SessionNotCreatedException: Unable to create a new remote session. Please check the server log for more details. Original error: All non-standard capabilities should have a vendor prefix. The following capabilities did not have one: systemPort `.
  You can prefix `appium:` in front of the capability and your tests should work fine. For example, in above case adding appium in front of systemPort `capabilities.setCapability("appium:systemPort ", 8200);`, fixes
  the issue and tests run fine.

Once you have ruled out issues due to 1.0 to 2.0 migration, you can then:

- Close the server that you started without loading plugin above `appium --base-path /wd/hub`.
- Now run the server with plugin loaded as `appium --base-path /wd/hub --plugins=appium-dashboard`
- Open the dashboard `http://localhost:4723/dashboard`
- Run the tests again and if you now get any errors, there is now a high probability that you have found an issue with the dashboard-plugin.
- In that case, report it on the issues page of this repository: https://github.com/sudharsan-selvaraj/appium-dashboard-plugin/issues
