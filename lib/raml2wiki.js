#!/usr/bin/env node

'use strict';

var raml2obj = require('raml2obj');
var handlebars = require('handlebars');
var program = require('commander');
var ramljsonexpander = require('raml-jsonschema-expander');
var fs = require('fs');

// Escape curly braces
handlebars.registerHelper('wikisafe', function(origStr) {

	if(origStr === undefined) {
		return ''; 
	}
    var newStr = origStr.replace(/([*+?^=!${}])/g, "\\$1");
	
    //newStr = newStr.replace('}',"\\" + "}"); 
    return newStr; 
});

// Convert booleans into Tick and Cross emote
handlebars.registerHelper('emote', function(origBool) {
    var newStr; 
    if(origBool == true) {
        newStr = '(/)';
    }
    if(origBool == false) {
        newStr = '(x)';
    }


    return newStr; 
});

handlebars.registerHelper('upcase', function(origStr) {
    if (origStr && typeof origStr === 'string') {
	return origStr.toUpperCase();
    } else {
	return '';
    }
});

function _render(ramlObj, config, onSuccess) {

    


    // Register handlebar partials
    for (var partialName in config.partials) {
        if (config.partials.hasOwnProperty(partialName)) {
            handlebars.registerPartial(partialName, config.partials[partialName]);
        }
    }

    var result = config.template(ramlObj);
	
    onSuccess(result);
}

function parseWithConfig(source, config, onSuccess, onError) {

raml2obj.parse(source).then(function (ramlObj) {

	ramlObj.config = config;

	ramlObj = ramljsonexpander.expandJsonSchemas(ramlObj);

	_render(ramlObj, config, onSuccess);

}, onError)};


function parse(source, template, onSuccess, onError) {
    var config = {
        'template': require(template),
        'partials': {
            'resource': require('./resource.handlebars')
        }
    };

    parseWithConfig(source, config, onSuccess, onError);
}


if (require.main === module) {
    program
        .usage('[options] [RAML input file]')
        .option('-i, --input [input]', 'RAML input file')
        .option('-o, --output [output]', 'Wiki Markup output file')
	.option('-p, --panels', 'Add resource details to collapsed panels and remove TOC')
        .parse(process.argv);
    var input = program.input;

    if (!input) {
        if (program.args.length !== 1) {
            console.error('Error: You need to specify the RAML input file');
            program.help();
            process.exit(1);
        }
        input = program.args[0];


    }

    var templateFile = './template.handlebars';
    if(program.panels) {
	templateFile = './template2.handlebars'
    }
	

    // Start the parsing process
    parse(input, templateFile, function(result) {
		
	

        if (program.output) {
            fs.writeFileSync(program.output, result);
        } else {
            // Simply output to console
            process.stdout.write(result);
            process.exit(0);
        }
    }, function(error) {
        console.log('Error parsing: ' + error);
        process.exit(1);
    });
}


module.exports.parse = parse;
module.exports.parseWithConfig = parseWithConfig;
module.exports.handlebars = handlebars; 
