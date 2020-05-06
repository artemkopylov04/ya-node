const gulp = require('gulp');
const workboxBuild = require('workbox-build');

gulp.task('generate-service-worker', function() {
  const rootDir = 'build';

  return workboxBuild.generateSW({
    globDirectory: rootDir,
    globPatterns: ['**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    swDest: `${rootDir}/service-worker.js`,
  });
});