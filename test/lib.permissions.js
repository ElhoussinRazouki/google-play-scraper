import gplay from '../index.js';
import { assert } from 'chai';
import { proxy } from './loadEnvironmentVariables.js';

describe('Permissions method', () => {
  it('should return an array of permissions and descriptions', () =>
    gplay.permissions({ appId: 'com.vicman.toonmeapp' })
      .then((results) => {
        assert(results.length);
        results.forEach((perm) => {
          assert.isString(perm.permission);
          assert.isString(perm.type);
        });
      }));

  it('should return an array of permissions and descriptions for different response format', () =>
    gplay.permissions({ appId: 'com.vicman.toonmeapp' })
      .then((results) => {
        assert(results.length);
        results.forEach((perm) => {
          assert.isString(perm.permission);
          assert.isString(perm.type);
        });
      }));

  it('should return an array of permissions and descriptions for different response format using proxy', () =>
    gplay.permissions({ appId: 'com.vicman.toonmeapp', proxy })
      .then((results) => {
        assert(results.length);
        results.forEach((perm) => {
          assert.isString(perm.permission);
          assert.isString(perm.type);
        });
      }));

  it('should return skip descriptions if short option is passed', () =>
    gplay.permissions({ appId: 'com.vicman.toonmeapp', short: true })
      .then((results) => {
        assert(results.length);
        results.map(assert.isString);
      }));

  it('should return skip descriptions if short option is passed for different response format', () =>
    gplay.permissions({ appId: 'com.vicman.toonmeapp', short: true })
      .then((results) => {
        assert(results.length);
        results.map(assert.isString);
      }));

  it('should return even if app have no common permissions', () =>
    gplay.permissions({ appId: 'com.vicman.toonmeapp' })
      .then((results) => {
        assert(results.length);
        results.forEach((perm) => {
          assert.isString(perm.permission);
          assert.isString(perm.type);
        });
      }));

  it('should return empty if app have no common permissions and short option is passed', () =>
    gplay.permissions({ appId: 'com.skybornegames.battlepop', short: true })
      .then((results) => {
        assert.equal(0, results.length);
      }));
});
