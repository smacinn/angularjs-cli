import fs from "fs";
import path from "path";
import util from "./util.js";


export default  {
    "processModule": processModule
}

function processModule(folder, options){
    var strbuf = [];

    console.log("Process Module: ", folder);
    const settings = util.getSettings(folder);

    // Start encapsulation of module in order to isolate function and variable names so they don't collide with other areas of the application.
    strbuf.push('(function( window, angular, undefined ){');
    strbuf.push('    "use strict";');
    strbuf.push('    /* Define the root Module */');
    strbuf.push('    (function () {');
    strbuf.push('        /* This must be updated to reference each sub-component module */');
    strbuf.push("        angular.module('" + settings.name +"', ['ng'");
    // list submodules as dependencies here
//                ,'dtCommon.components.importCustomerLog'');
//                ,'dtCommon.components.menu'');
            
    strbuf.push('        ]);');
    
    // components and services here
    strbuf.push('       /* List Components */');
    strbuf.push('       /* List Pages */');
    strbuf.push('       /* List Services */');


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