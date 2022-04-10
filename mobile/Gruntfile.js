module.exports = (grunt) => {
    grunt.initConfig({
        jsdoc : {
            dist : {
                src: ['src/components/**/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-jsdoc');
    
    grunt.registerTask('default', ['jsdoc']);
}

