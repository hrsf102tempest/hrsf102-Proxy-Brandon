module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-s3');

  grunt.initConfig({
    s3: {
      options: {
        key: 'AKIAI77VGF4VGMUHBPGA',
        secret: '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',
        bucket: 'hrsf102header',
        access: 'public-read',
      },
      dev: {
        upload: [{
            src: 'server/index.js',
            dest: 'grunttest.js',
        }]
      }
    }
  }
)
}
