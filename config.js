var config = {};

config.mongo = {};
config.cloudinary = {};

config.mongo.user = 'user';
config.mongo.password = 'ati4200hd';
config.mongo.url = 'mongodb://'+config.mongo.user+':' + config.mongo.password + '@ds121980.mlab.com:21980/votacion';

config.cloudinary.name = 'djcz6kgyg';
config.cloudinary.key = '317478723738766';
config.cloudinary.secret = 'SvDprEWjQD55BkIBfLMuuS8ItTs';

module.exports = config;