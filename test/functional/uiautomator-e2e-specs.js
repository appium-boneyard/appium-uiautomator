// transpile :mocha

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mochawait';
import UiAutomator from '../../lib/uiautomator.js';
import path from 'path';
import ADB from 'appium-adb';

chai.should();
chai.use(chaiAsPromised);

describe('UiAutomator', function () {
  let uiAutomator, adb;
  let rootDir = path.resolve(__dirname,
                             process.env.NO_PRECOMPILE ? '../..' : '../../..');
  const bootstrapJar = path.resolve(rootDir, 'test', 'fixtures', 'AppiumBootstrap.jar');
  beforeEach(async () => {
    adb = await ADB.createADB();
    uiAutomator = new UiAutomator(adb);
  });
  it("should start and shutdown uiAutomator", async () => {
    let startDetector = (stdout) => {
      if (/Appium Socket Server Ready/.test(stdout)) {
           return true;
      }
    };
    await uiAutomator.start(bootstrapJar, 'io.appium.android.bootstrap.Bootstrap',
                            null, startDetector);
    uiAutomator.state.should.eql('online');
    await uiAutomator.shutdown();
    uiAutomator.state.should.eql('stopped');
  });
});
