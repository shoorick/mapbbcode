var fs = require('fs'),
    jshint = require('jshint'),
    UglifyJS = require('uglify-js'),

    deps = require('./deps.js').deps,
    hintrc = require('./hintrc.js').config;

function lintFiles(files) {

	var errorsFound = 0,
	    i, j, len, len2, src, errors, e;

	for (i = 0, len = files.length; i < len; i++) {

		jshint.JSHINT(fs.readFileSync(files[i], 'utf8'), hintrc, i ? {L: true} : null);
		errors = jshint.JSHINT.errors;

		for (j = 0, len2 = errors.length; j < len2; j++) {
			e = errors[j];
			console.log(files[i] + '\tline ' + e.line + '\tcol ' + e.character + '\t ' + e.reason);
		}

		errorsFound += len2;
	}

	return errorsFound;
}

function getFiles(options) {
	var memo = {},
	    opt = options || {},
	    comps;

	if (opt.compsBase32) {
		comps = parseInt(opt.compsBase32, 32).toString(2).split('');
		console.log('Managing dependencies...');
	}

	function addFiles(srcs) {
		for (var j = 0, len = srcs.length; j < len; j++) {
			memo[srcs[j]] = true;
		}
	}

	for (var i in deps) {
                if( !opt.allFiles && !comps ) {
			if( deps[i].noInclude )
				continue;
			if( (opt.configOnly && !deps[i].config) || (!opt.configOnly && deps[i].config) )
				continue;
                }

		if (comps) {
                        if (parseInt(comps.pop(), 2) === 1) {
                                console.log('\t* ' + i);
                                addFiles(deps[i].src);
                        } else {
                                console.log('\t  ' + i);
                        }
		} else {
			addFiles(deps[i].src);
		}
	}

	var files = [];

	for (var src in memo) {
		files.push('src/' + src);
	}

	return files;
}

exports.getFiles = getFiles;

exports.lint = function () {

	var files = getFiles({ allFiles: true });

	console.log('Checking for JS errors...');

	var errorsFound = lintFiles(files);

	if (errorsFound > 0) {
		console.log(errorsFound + ' error(s) found.\n');
		fail();
	} else {
		console.log('\tCheck passed');
	}
};


function getSizeDelta(newContent, oldContent) {
	if (!oldContent) {
		return 'new';
	}
	var newLen = newContent.replace(/\r\n?/g, '\n').length,
		oldLen = oldContent.replace(/\r\n?/g, '\n').length,
		delta = newLen - oldLen;

	return (delta >= 0 ? '+' : '') + delta;
}

function loadSilently(path) {
	try {
		return fs.readFileSync(path, 'utf8');
	} catch (e) {
		return null;
	}
}

function combineFiles(files) {
	var content = '';
	for (var i = 0, len = files.length; i < len; i++) {
		content += fs.readFileSync(files[i], 'utf8') + '\n\n';
	}
	return content;
}

exports.build = function (compsBase32, buildName) {

	var files = getFiles({ compsBase32: compsBase32, configOnly: buildName === 'config' });

	console.log('Concatenating ' + files.length + ' files...');

	var copy = fs.readFileSync('src/copyright.js', 'utf8'),
	    intro = '(function (window, document, undefined) {\nL = window.L;\n',
	    outro = '}(window, document));',
	    newSrc = copy + intro + combineFiles(files) + outro,
	    newSrc = newSrc.replace(/\$\$VERSION\$\$/g, exports.version || 'dev'),

	    pathPart = 'dist/mapbbcode' + (buildName ? '-' + buildName : ''),
	    srcPath = pathPart + '-src.js',

	    oldSrc = loadSilently(srcPath),
	    srcDelta = getSizeDelta(newSrc, oldSrc);

	console.log('\tUncompressed size: ' + newSrc.length + ' bytes (' + srcDelta + ')');

	if (newSrc === oldSrc) {
		console.log('\tNo changes');
	} else {
		fs.writeFileSync(srcPath, newSrc);
		console.log('\tSaved to ' + srcPath);
	}

	console.log('Compressing...');

	var path = pathPart + '.js',
	    oldCompressed = loadSilently(path),
	    newCompressed = copy + UglifyJS.minify(newSrc, {
	        warnings: true,
	        fromString: true
	    }).code,
	    newCompressed = newCompressed.replace(/\$\$VERSION\$\$/g, exports.version || 'dev'),
	    delta = getSizeDelta(newCompressed, oldCompressed);

	console.log('\tCompressed size: ' + newCompressed.length + ' bytes (' + delta + ')');

	if (newCompressed === oldCompressed) {
		console.log('\tNo changes');
	} else {
		fs.writeFileSync(path, newCompressed);
		console.log('\tSaved to ' + path);
	}
};

exports.cfg = function (compsBase32, buildName) {
    exports.build(compsBase32, 'config');
};

exports.pack = function() {
    var jake = require('jake'),
        target = 'dist/target/',
        archive = 'mapbbcode-'+(exports.version||'dev')+'.zip';
    var commands = [
        'mkdir -p ' + target + 'docs',
        'cp *.md ' + target + 'docs',
        'cp -r dist/lib ' + target + 'mapbbcode',
        'cp dist/mapbbcode.js ' + target + 'mapbbcode/',
        'cp dist/mapbbcode-config.js ' + target + 'mapbbcode/',
        'cp dist/mapbbcode-window.html ' + target + 'mapbbcode/',
        'rm -f dist/' + archive,
        'cd ' + target + '; zip -r ../' + archive + ' *',
        'rm -r ' + target
    ];
    jake.exec(commands);
};
