var basePath = './node_modules/';
var path = require(basePath + 'dgeni/node_modules/canonical-path');
var Package = require(basePath + "dgeni").Package;

// Create and export a new Dgeni package called dgeni-example. This package depends upon
// the jsdoc and nunjucks packages defined in the dgeni-packages npm module.
module.exports = new Package('ngeo', [
  require(basePath + 'dgeni-packages/ngdoc')
])

// Configure our dgeni-example package. We can ask the Dgeni dependency injector
// to provide us with access to services and processors that we wish to configure
.config(function(log, readFilesProcessor, templateFinder, computePathsProcessor, writeFilesProcessor) {

  // Set logging level
  log.level = 'info';

  // Specify the base path used when resolving relative paths to source and output files
  readFilesProcessor.basePath = path.resolve(__dirname, '.');

  // Specify collections of source files that should contain the documentation to extract
  readFilesProcessor.sourceFiles = [
    {
      // Process all js files in `src` and its subfolders ...
      include: 'src/**/*.js',
      // ... except for this one!
      exclude: ['src/ol-ext/**/*.js', 'src/d3-ext/**/*.js'],
      // When calculating the relative path to these files use this as the base path.
      // So `src/foo/bar.js` will have relative path of `foo/bar.js`
      basePath: 'src'
    }
  ];
  // Specify where the writeFilesProcessor will write our generated doc files
  writeFilesProcessor.outputFolder  = 'ngdoc';

  // key 'pathTemplate' is not currently used by ngeo. It seems useful to
  // specifie a specific template per file.
  computePathsProcessor.pathTemplates.push({
    docTypes: ['provider', 'directive', 'input', 'object', 'function', 'filter', 'type' ],
    pathTemplate: '${module}/${name}',
    outputPathTemplate: '${module}/${name}.html'
  });
  computePathsProcessor.pathTemplates.push({
    docTypes: ['services' ],
    pathTemplate: '${module}/${name}',
    outputPathTemplate: '${module}/${name}.html'
  });
  computePathsProcessor.pathTemplates.push({
    docTypes: ['module' ],
    pathTemplate: '${area}/${name}',
    outputPathTemplate: 'partials/${area}/${name}/index.html'
  });
  computePathsProcessor.pathTemplates.push({
    docTypes: ['componentGroup' ],
    pathTemplate: '${area}/${moduleName}/${groupType}',
    outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}/index.html'
  });
});
