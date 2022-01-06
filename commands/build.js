import fs from 'fs';
import path from 'path';
import util from '../lib/util.js';
import rollup from '../lib/rollup.js';


export default (folder, options) => {
    if(fs.existsSync(folder)){
        if(options.root){
            // folder should contain module folders
            // get the list of sub-folders
            const modules = util.getDirectories(folder);
                

            console.log(modules);

            modules.forEach(element => {
                rollup.processModule(path.join(folder,element), options);
                rollup.processSass(path.join(folder,element), options);
              });
        }
        else{
            // folder is expected to be a module
            rollup.processModule(folder, options);
            rollup.processSass(folder, options);
        }
    }
    else{
        throw 'target folder does not exist!';
    }
}