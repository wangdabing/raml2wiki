var should = require('chai').should(),
    raml2wiki = require('../lib/raml2wiki');

describe('#handlebarsHelpers', function() {

  var helpers = raml2wiki.handlebars.helpers; 
  
  it('escapes { ', function() {
    helpers.wikisafe('{').should.equal('\\{');
  });

  it('escapes } ', function() {
    helpers.wikisafe('}').should.equal('\\}');
  });

  
});