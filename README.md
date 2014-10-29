cfs-server-aggregation
==========================

Very simple implementation of some of **server-side** mongodb aggregation framework functions for cfs-collections Meteor.

**cfs-server-aggregation** is a fork of [meteor-mongo-server](https://github.com/zvictor/meteor-mongo-server) which is a fork of [mongodb-aggregation](https://github.com/jhoxray/meteor-mongo-extensions)

This version is just converted from zvictors coffescript version to javascript and was altered, so it works on `FS.Collections`.

It extends `FS.Collection` with 3 methods so far, **mapReduce**, **distinct** and **aggregate**, so that you can do:

```javascript
var col, result;

col = new Meteor.Collection("name");

if (Meteor.isServer) {
  map = function() {emit(this.Region, this.Amount);}
  reduce = function(reg, am) { return Array.sum(am);};
  col.mapReduce(map, reduce, {
    out: "out_collection_name",
    verbose: true
  }, function(err, res) {
    return console.dir(res.stats);
  });
  result = col.distinct("Field Name");
  console.dir(result);
  result = col.aggregate(pipeline);
  console.dir(result);
}

```

To install it, run:
```bash
$ meteor add phosphoros:cfs-server-aggregation
```

This package is MIT Licensed. Do whatever you like with it but any responsibility for doing so is your own.
