var fs = require('fs-extra');
var writeFileAtomic = require('write-file-atomic');
var path = require('path');
var retry = require('retry');

var helpers = {

  get: function (sessionId, pathname, callback) {
    var sessionPath = path.join(pathname, sessionId + '.json');
      fs.readFile(sessionPath,  'utf8', function readCallback(err, data) {
        if (!err) {
          var json;
          try {
            json = JSON.parse(data);
          } catch (parseError) {
            return fs.remove(sessionPath, function (removeError) {
              if (removeError) {
                return callback(removeError);
              }
              callback(parseError);
            });
          }
          if (!err) {
            return callback(null,  json);
          }
        }
      });
  },

  set: function (sessionId, session, pathname, callback) {
    try {
      var sessionPath = path.join(pathname, sessionId + '.json');
      var json = JSON.stringify(session);
      console.log(json);
      writeFileAtomic(sessionPath, json, function (err) {
        if (callback) {
          err ? callback(err) : callback(null, session);
        }
      });
    } catch (err) {
      if (callback) callback(err);
    }
  },

  destroy: function (sessionId, pathname, callback) {
    var sessionPath = path.join(pathname, sessionId + '.json');
    fs.remove(sessionPath, callback);
  }

};

module.exports = function (session) {
  var Store = session.Store;

  function MyFileStore(dir) {
    var self = this;

    Store.call(self, {path: dir});

    self.pathname = path.normalize(dir || './sessions');
    fs.mkdirsSync(self.pathname);
  }

  MyFileStore.prototype.__proto__ = Store.prototype;

  MyFileStore.prototype.get = function (sessionId, callback) {
    helpers.get(sessionId, this.pathname, callback);
  };

  MyFileStore.prototype.set = function (sessionId, session, callback) {
    helpers.set(sessionId, session, this.pathname, callback);
  };

  MyFileStore.prototype.destroy = function (sessionId, callback) {
    helpers.destroy(sessionId, this.pathname, callback);
  };

  return MyFileStore;
};
