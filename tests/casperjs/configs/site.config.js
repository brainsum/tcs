var baseURL = 'http://tcs-dev.gubo.brainsum.com/';
var nid = 272;

exports.siteURL = baseURL;
exports.loginURL = baseURL + 'user/login/';
exports.contentURL = baseURL + 'admin/content';

exports.contentEditTitle = 'Casper Test Node';
exports.contentEditURL = baseURL + 'node/' + nid + '/edit';
exports.contentRevisionsURL = baseURL + 'node/' + nid +'/revisions';
