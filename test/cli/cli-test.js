/* =========================================================================
 * Dependencies
 * ========================================================================= */
var argv = require('yargs').usage('Usage: $0 -fields [string]').argv;
var fields = argv.fields;
var parser = require('../../lib/partialResponseParser');

if (!fields) throw new Error('fields is required');

parser.expand(fields, function(err, results) {
  if (err) {
    console.log(err);
  } else {
    console.log('RESULTS = ');
    console.log(JSON.stringify(results));
  }
});
