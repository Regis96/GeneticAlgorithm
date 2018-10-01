module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: 'src/*.ts',
                out: 'dist/index.js',
                watch: '.'
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", ["ts"]);
};