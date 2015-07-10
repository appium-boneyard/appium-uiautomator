appium-uiautomator
==========

Android uiautomator driver used by Appium

## Installing

```
npm install appium-uiautomator
```

## Usage

Appium-uiautomator has two methods `start` and `shutdown`.

`async start (uiAutomatorBinaryPath, className, startDetector, ...extraParams)`

`start` will push uiAutomatorBinary to device and start UiAutomator with className
and return the SubProcess. `startDetector` and `extraParams` are optional arguments.
`startDetector` will be used as condition to check against your output stream of test if any. `extraParams` will be passed along as command line arguments when starting the subProcess.

`shutdown` will kill UiAutomator process on the device and also kill the subProcess.


```
import UiAutomator from 'appium-uiautomator';
import ADB from 'appium-adb';

let adb = await ADB.createADB();
let uiAutomator = new UiAutomator(adb);

let startDetector = (s) => { return /Appium Socket Server Ready/.test(s); };
await uiAutomator.start('foo/bar.jar', 'io.appium.android.bootstrap.Bootstrap',
                        startDetector, '-e', 'disableAndroidWatchers', true);
await uiAutomator.shutdown();

```

## watch

`npm run watch`


## Publishing

```
npm version [patch|minor|major]
git push --tags origin master
npm publish
```
