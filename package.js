Package.describe({
    summary: "Expose mongodb aggregation framework (mapReduce, aggregate and distinct), to a FS.Collection SERVER side only.",
    version: '1.0.0',
    name: 'phosphoros:cfs-server-aggregation',
    git: 'https://github.com/sclausen/meteor-mongo-server.git'
});

Npm.depends({mongodb: "1.4.19"});

Package.on_use(function (api, where) {
    if(api.versionsFrom !== undefined) api.versionsFrom('METEOR@1.0');

    api.use('underscore', ['server']);

    api.add_files('server.js', 'server');
});
