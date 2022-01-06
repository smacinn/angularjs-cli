import fs from "fs";
import path from "path";
import util from "./util.js";
import sass from "node-sass";


export default  {
    "processModule": processModule,
    "processSass": processSass
}

function processSass(folder, options){
    const settings = util.getSettings(folder);
    var filename = path.join(folder, '_module.scss');
    var output = path.join(options.output, settings.name + '.css');

    if(fs.existsSync(filename)){
        var content = sass.renderSync({
            file: filename
          });
          fs.writeFileSync(output, content.css);
          console.log('Successfully created ' + settings.name + '.css');

    }
    else{
        console.log('Sass file does not exist: ' + filename);
    }

}

function processModule(folder, options){
    var strbuf = [];

    console.log("Process Module: ", folder);
    const settings = util.getSettings(folder);

    var components = util.getDirectories(settings.componentsDir);
    var pages = util.getDirectories(settings.pagesDir);
    //var services = util.getDirectories(settings.servicesDir);


    // Start encapsulation of module in order to isolate function and variable names so they don't collide with other areas of the application.
    strbuf.push('(function( window, angular, undefined ){');
    strbuf.push('    "use strict";');
    strbuf.push('    /* Define the root Module */');
    strbuf.push('    (function () {');
    strbuf.push('        /* This must be updated to reference each sub-component module */');
    strbuf.push("        angular.module('" + settings.name +"', ['ng'");
    // list submodules as dependencies here
    components.forEach(element => {
        strbuf.push("           ,'" + settings.name + ".component." + element + "'");
      });
      pages.forEach(element => {
        strbuf.push("           ,'" + settings.name + ".page." + element + "'");
      });

//                ,'dtCommon.components.importCustomerLog'');
//                ,'dtCommon.components.menu'');
            
    strbuf.push('        ]);');
    
    // components and services here
    strbuf.push('/* List Components */');
    components.forEach(element => {
        var html = '';
        var comp = '';

        strbuf.push('    (function () { /* start of ' + element +' */');
        // load and clean html
        html = util.loadCleanHtmlTemplate(path.join(settings.componentsDir, element, element + '.html'));
        comp = fs.readFileSync(path.join(settings.componentsDir, element, element + '.js')).toString();
        // embed html template into component
        comp = comp.replace('{{html}}', html);
        // add to strbuf
        strbuf.push(comp);
        strbuf.push('    })(); /* end of  ' + element +' */');
    });
 
     strbuf.push('/* List Pages */');
     pages.forEach(element => {
        var html = '';
        var page = '';

        strbuf.push('    (function () { /* start of ' + element +' */');
        // load and clean html
        html = util.loadCleanHtmlTemplate(path.join(settings.pagesDir, element, element + '.html'));
        page = fs.readFileSync(path.join(settings.pagesDir, element, element + '.js')).toString();
        // embed html template into component
        page = page.replace('{{html}}', html);
        // add to strbuf
        strbuf.push(page);
        strbuf.push('    })(); /* end of  ' + element +' */');
    });
 

    strbuf.push('/* List Services */');


    // Add configuration injection here
//  strbuf.push('        (function(){ ');
//  strbuf.push('            angular.module('dtCommon').constant("$DTCOMMON_CSS", "");');
//  strbuf.push('            angular.module('dtCommon').config(['$mdThemingProvider', '$DTCOMMON_CSS', function ($mdThemingProvider, $DTCOMMON_CSS) {');
//  strbuf.push('                    $mdThemingProvider.registerStyles($DTCOMMON_CSS);');
//  strbuf.push('            }]);');
//  strbuf.push('         })(); ');

    // close function encapsulation
    strbuf.push('    })(); /* end of second level encapsulation */');
    strbuf.push('})(window, window.angular); /* end of top Level module encapsulation */');
    
    strbuf.push('window.' + settings.name + ' = { version: { full: "1.0.0" } };');   
    
    var filename = path.join(options.output, settings.name + '.js');

    // create the output folder if necessary
    if (!fs.existsSync(options.output)){
        fs.mkdirSync(options.output, { recursive: true });
    }

    fs.writeFileSync(filename, strbuf.join('\r\n'));

    console.log('Successfully created ' + settings.name + '.js');

}