/*
 * grunt-init-jquery
 * https://gruntjs.com/
 *
 * Copyright (c) 2014 Hirofumi Matamura
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Generate a web project';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Sassベースの授業の制作環境を構築します。';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

    init.process({
        type: 'webapp'
    }, [
        init.prompt('name'),
        init.prompt('title'),
        init.prompt('description', 'Input your project description.'),
        init.prompt('version'),
        init.prompt('author_name')
    ], function(err, props) {
        var files = init.filesToCopy(props);
        init.copyAndProcess(files, props, {noProcess: '**/*.{png,jpg,gif}'});

        // Generate package.json file, used by npm and grunt.
        init.writePackageJSON('package.json', {
            name: props.name,
            version: props.version,
            node_version: '>= 0.8.0',
            devDependencies: {
                'grunt': '~0.4.2',
                'grunt-contrib-sass': '~0.5.0',
                'grunt-contrib-watch': '^0.6.1',
                'grunt-autoprefixer': '^0.7.2',
                'grunt-contrib-connect': '^0.7.1',
                'load-grunt-tasks': '^0.4.0',
                'grunt-bower-install': '~1.0.0'
            },
        });

        done();
    });

};