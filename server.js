var Future, MongoDB, path, tl, _callMapReduce, _dummyCollection_, _futureWrapper;

tl = typeof TLog !== "undefined" && TLog !== null ? TLog.getLogger() : void 0;

path = Npm.require("path");

MongoDB = Npm.require("mongodb");

Future = Npm.require(path.join("fibers", "future"));

_dummyCollection_ = new Meteor.Collection('__dummy__');

_futureWrapper = function(collection, commandName, args) {
  var cb, col, coll1, collectionName, future, result;
  col = (typeof collection) === "string" ? _dummyCollection_ : collection;
  collectionName = (typeof collection) === "string" ? collection : collection._name;
  coll1 = col.find()._mongo.db.collection(collectionName);
  future = new Future;
  cb = future.resolver();
  args = args.slice();
  args.push(cb);
  coll1[commandName].apply(coll1, args);
  return result = future.wait();
};

_callMapReduce = function(collection, map, reduce, options) {
  var col, coll1, collectionName, future, result;
  col = (typeof collection) === "string" ? _dummyCollection_ : collection;
  collectionName = (typeof collection) === "string" ? collection : collection._name;
  if (tl != null) {
    tl.debug("callMapReduce called for collection " + collectionName + " map: " + map + " reduce: " + reduce + (" options: " + (JSON.stringify(options))));
  }
  coll1 = col.find()._mongo.db.collection(collectionName);
  future = new Future;
  coll1.mapReduce(map, reduce, options, function(err, result, stats) {
    var res;
    if (err) {
      future["throw"](err);
    }
    res = {
      collectionName: result.collectionName,
      stats: stats
    };
    return future["return"]([true, res]);
  });
  result = future.wait();
  if (!result[0]) {
    throw result[1];
  }
  return result[1];
};

_.extend(FS.Collection.prototype, {
  distinct: function(key, query, options) {
    return _futureWrapper(this.files._name, "distinct", [key, query, options]);
  },
  aggregate: function(pipeline) {
    return _futureWrapper(this.files._name, "aggregate", [pipeline]);
  },
  mapReduce: function(map, reduce, options) {
    options = options || {};
    options.readPreference = "primary";
    return _callMapReduce(this.files._name, map, reduce, options);
  }
});
