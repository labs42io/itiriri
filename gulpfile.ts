import { Gulpclass, MergedTask, SequenceTask, Task } from 'gulpclass';

import * as gulp from 'gulp';
import * as del from 'del';
import * as replace from 'gulp-replace';
import * as shell from 'gulp-shell';
import * as mocha from 'gulp-mocha';
import * as ts from 'gulp-typescript';
import * as sourcemaps from 'gulp-sourcemaps';
const tslint = require('gulp-tslint');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');

@Gulpclass()
export class Gulpfile {

  /**
   * Cleans build folder.
   */
  @Task()
  clean(cb: Function) {
    return del(['./build/**', './coverage/**'], cb);
  }

  /**
   * Runs typescript files compilation.
   */
  @Task()
  compile() {
    return gulp.src('./package.json', { read: false })
      .pipe(shell(['tsc']));
  }

  /**
   * Runs unit-tests.
   */
  @Task()
  unit() {
    return gulp.src('./build/compiled/test/**/*.js')
      .pipe(mocha());
  }

  /**
   * Compiles the code and runs tests.
   */
  @SequenceTask()
  test() {
    return ['clean', 'compile', 'unit'];
  }

  /**
   * Runs the tslint.
   */
  @Task()
  tslint() {
    return gulp.src(['./lib/**/*.ts', './test/**/*.ts', './examples/**/*.ts'])
      .pipe(tslint({ formatter: 'stylish' }))
      .pipe(tslint.report({
        emitError: true,
        summarizeFailureOutput: true,
        sort: true,
        bell: true,
      }));
  }

  /**
   * Copies all sources to the package directory.
   */
  @MergedTask()
  packageCompile() {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult = gulp.src(['lib/**/*.ts'])
      .pipe(sourcemaps.init())
      .pipe(tsProject());

    return [
      tsResult.dts.pipe(gulp.dest('build/package')),
      tsResult.js
        .pipe(sourcemaps.write('.', { sourceRoot: '', includeContent: true }))
        .pipe(gulp.dest('build/package')),
    ];
  }

  /**
   * Moves all compiled files to the final package directory.
   */
  @Task()
  packageMoveCompiledFiles() {
    return gulp.src('./build/package/lib/**/*')
      .pipe(gulp.dest('./build/package'));
  }

  /**
   * Clears the directory with compiled files.
   */
  @Task()
  packageClearCompileDirectory(cb: Function) {
    return del(['build/package/lib/**'], cb);
  }

  /**
   * Change the "private" state of the packaged package.json file to public.
   */
  @Task()
  packagePreparePackageFile() {
    return gulp.src('./package.json')
      .pipe(replace('\"private\": true,', '\"private\": false,'))
      .pipe(gulp.dest('./build/package'));
  }

  /**
   * This task will replace all typescript code blocks in the README
   * (since npm does not support typescript syntax highlighting)
   * and copy this README file into the package folder.
   */
  @Task()
  packageReadmeFile() {
    return gulp.src('./readme.md')
      .pipe(replace(/```ts([\s\S]*?)```/g, '```javascript$1```'))
      .pipe(gulp.dest('./build/package'));
  }

  /**
   * Creates a package that can be published to npm.
   */
  @SequenceTask()
  package() {
    return [
      'clean',
      'packageCompile',
      'packageMoveCompiledFiles',
      'packageClearCompileDirectory',
      ['packagePreparePackageFile', 'packageReadmeFile'],
    ];
  }

  /**
   * Publishes a package to npm from ./build/package directory.
   */
  @Task()
  npmPublish() {
    return gulp.src('./package.json', { read: false })
      .pipe(shell(['cd ./build/package && npm publish --access public']));
  }

  /**
   * Creates a package and publishes it to npm.
   */
  @SequenceTask()
  publish() {
    return ['test', 'tslint', 'package', 'npmPublish'];
  }

  @Task('browserify', ['clean', 'compile'])
  browserify() {
    return browserify({
      standalone: 'ArrayQuery',
    }).add('./build/compiled/lib/index.js')
      .bundle()
      .on('error', e => console.error(e))
      .pipe(source('bundle.min.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
  }
}
