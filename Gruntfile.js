  /**
   * 配置Grunt
   */
  module.exports = function(grunt)
  {
      /**
       * 定义压缩合并
       */
      grunt.initConfig(
      {
          /**
           * 合并任务
           */
          concat: 
          {
              /**
               * 将js文件内所有js，合并为all.js
               */
              dist: 
              {
                  src : ['core/*/*.js'],
                  dest: 'tools.js'
              }
          },

          /**
           * 压缩JS
           */
          uglify:
          {
              /**
               * 将all.js,压缩为all.min.js
               */
              build:
              {
                  src : 'tools.js', 
                  dest: 'tools.min.js' 
              }
          }
      })

      /**
       * 加载必要插件
       */
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-concat'); 

      /**
       * 注册必要插件
       */
     grunt.registerTask('default', ['concat','uglify']); 
}