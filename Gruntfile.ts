module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: 'src/*.ts',
                out: 'dist/index.js',
                watch: '.',
                options: {
                    rootDir: 'src'
                },
            }
        },
        clean: 'dist/*'
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean' ,'ts']);
};