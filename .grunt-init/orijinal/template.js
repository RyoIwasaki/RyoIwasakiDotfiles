/*
 * grunt-init-jquery
 * https://gruntjs.com/
 *
 * Copyright (c) 2014 Ryo Iwasaki
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Generate a web project';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'オリジナル環境生成';

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
                'grunt-contrib-sass': '^0.7.3', // sass task
                'grunt-contrib-compass': '^0.9.0', // compass task
                'grunt-contrib-watch': '^0.6.1', // watch task
                'grunt-autoprefixer': '^0.7.2', // ベンダープリフェックス調整
                "grunt-csscomb": "^3.0.0", // CSSのプロパティを揃える
                "grunt-contrib-cssmin": "^0.10.0", //CSS圧縮
                'grunt-contrib-concat': '^0.4.0', // 無名関数でファイル結合
                'grunt-contrib-uglify': '^0.5.0', // 縮小
                'grunt-contrib-jshint': '^0.10.0', // jsのエラーチェック
                'jshint-stylish': '^0.4.0', // jshintの補助
                'grunt-contrib-connect': '^0.7.1', // 仮想サーバー立ち上げ
                'load-grunt-tasks': '^0.4.0', // loadNpmTasksの省略
                'grunt-bower-install': '~1.0.0' // bowerインストール
            },
        });

        done();
    });

};