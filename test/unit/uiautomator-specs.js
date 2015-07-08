// transpile :mocha

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mochawait';
import UiAutomator from '../../lib/uiautomator.js';
import path from 'path';
import ADB from 'appium-adb';
import { withSandbox } from 'appium-test-support';
import * as teen_process from 'teen_process';
import events from 'events';

chai.should();
chai.use(chaiAsPromised);

describe('UiAutomator', function () {
  let uiAutomator, adb= new ADB();
  let rootDir = path.resolve(__dirname,
                             process.env.NO_PRECOMPILE ? '../..' : '../../..');
  const bootstrapJar = path.resolve(rootDir, 'test', 'fixtures', 'AppiumBootstrap.jar'),
        bootstrapClassName = 'io.appium.android.bootstrap.Bootstrap';
  before(async () => {
    uiAutomator = new UiAutomator(adb);
  });
  it("parseJarNameFromPath should parse jarName from path", async () => {
    uiAutomator.parseJarNameFromPath(bootstrapJar).should.equal('AppiumBootstrap.jar');
    let windowsJarName = `C:\\\\appium\\bar.jar`;
    uiAutomator.parseJarNameFromPath(windowsJarName).should.equal('bar.jar');
  });
  it("parseJarNameFromPath should throw error for invalid path", async () => {
    () => { uiAutomator.parseJarNameFromPath('foo/bar'); }.should.throw();
  });
  describe("start", withSandbox({mocks: {adb, teen_process}}, (S) => {
    it("should return a subProcess", async function () {
      let conn = new events.EventEmitter();
      conn.start = () => { };
      let args = ["shell", "uiautomator", "runtest", 'AppiumBootstrap.jar',
                  "-c", bootstrapClassName];
      S.mocks.adb.expects('push').once()
        .withExactArgs(bootstrapJar,"/data/local/tmp/")
        .returns('');
      S.mocks.adb.expects('getAdbPath').once()
        .returns('adbPath');
      S.mocks.teen_process.expects("SubProcess")
        .once().withExactArgs('adbPath', args)
        .returns(conn);
      await uiAutomator.start(bootstrapJar, bootstrapClassName);
      uiAutomator.state.should.equal('online');
      S.verify();
    });
  }));
});
