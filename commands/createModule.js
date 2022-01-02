import fs from 'fs';

export default (name, options) => {
    if(name != null && name != ''){
        if (!fs.existsSync(name)){
            fs.mkdirSync(name);
        }
    }
    else{
        // TODO throw or display an error
    }
}