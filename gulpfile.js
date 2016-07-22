'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jscs = require('gulp-jscs');
const stylishJscs = require('jscs-stylish');
const jsinspect = require('gulp-jsinspect');
const nsp = require('gulp-nsp');
const checkDeps = require('gulp-check-deps');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');
const mocha = require('gulp-mocha');
const coveralls = require('gulp-coveralls');

const libFiles = [
  'index.js',
  'lib/**/*.js'
];

const examples = [
  'examples/**/*.js'
]

const testFiles = [
  'tests/**/*.js'
];

const allFiles =
  libFiles
    .concat(examples)
    .concat(testFiles);

gulp.task('lint', () =>
  gulp
    .src(allFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('style', () =>
  gulp
    .src(allFiles)
    .pipe(jscs())
    .pipe(jscs.reporter(stylishJscs.path))
    .pipe(jscs.reporter('fail'))
);

gulp.task('cpd', () =>
  gulp
    .src(libFiles)
    .pipe(jsinspect({
      threshold: 45,
      identifiers: true,
      suppress: 0
    }))
);

gulp.task('security', done => {
  nsp({
    package: __dirname + '/package.json',
    stopOnError: true
  }, done)
});

gulp.task('check-deps', () =>
  gulp
    .src('package.json')
    .pipe(checkDeps())
);

gulp.task('pretest', () =>
  gulp
    .src(libFiles)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
);

gulp.task('test', ['pretest'], () =>
  gulp
    .src(testFiles)
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({thresholds: {global: 85}}))
);

gulp.task('submit-coverage', ['test'], () =>
  gulp
    .src('coverage/**/lcov.info')
    .pipe(coveralls())
);

gulp.task('check', ['lint', 'style', 'cpd', 'security', 'check-deps']);
gulp.task('default', ['check', 'test']);
gulp.task('travis', ['check', 'submit-coverage']);
