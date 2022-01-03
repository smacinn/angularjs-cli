import fs from "fs";
import kebab from "kebab-case";
import pascal from "pascal-case";
import camel from "camel-case";
import path from "path";
import url  from "url";

export default  {
    "openTemplate": openTemplate,
    "processTemplate": processTemplate,
    "processServiceTemplate": processServiceTemplate,
    "processComponentHtmlTemplate": processComponentHtmlTemplate,
    "processComponentScssTemplate": processComponentScssTemplate,
    "processComponentJsTemplate": processComponentJsTemplate,
    "getSettings": getSettings,
    "kebabIt": kebabIt,
    "pascalIt": pascalIt,
    "camelIt": camelIt
}

// template is expected to be a filename within the templates directory
function openTemplate(template){
    const currentFileUrl = path.dirname(url.fileURLToPath(import.meta.url));
    const filename = path.join(
        currentFileUrl,
        '../templates',
        template
    );

    var retval = fs.readFileSync(filename).toString();

    return retval;
}

// replacements is expected to be a dictionary
function processTemplate(template, replacements){
    var tmpl = openTemplate(template);
   for (const [key, value] of Object.entries(replacements)) {
        const replacer = new RegExp('{{' + key + '}}', 'g')
        tmpl = tmpl.replace(replacer, value);
    };
    return tmpl;
}

// replacements is expected to be a dictionary
function processServiceTemplate(replacements){
    var tmpl = '';

    tmpl = processTemplate('_service.js.template', replacements);

    return tmpl;
}

// replacements is expected to be a dictionary
function processComponentHtmlTemplate(replacements){
    var tmpl = '';

    tmpl = processTemplate('_component.html.template', replacements);

    return tmpl;
}

// replacements is expected to be a dictionary
function processComponentScssTemplate(replacements){
    var tmpl = '';

    tmpl = processTemplate('_component.scss.template', replacements);

    return tmpl;
}

// replacements is expected to be a dictionary
function processComponentJsTemplate(replacements){
    var tmpl = '';

    tmpl = processTemplate('_component.js.template', replacements);

    return tmpl;
}

function getSettings(){
    var retval = {};
    var filename = '';
    var componentsDir = '';
    var servicesDir = '';

    // module directory
    if (fs.existsSync('settings.json')){
        filename = 'settings.json';
        componentsDir = './components';
        servicesDir = './services';
    }
    // services or components directory
    else if(fs.existsSync('../settings.json')){
        filename = '../settings.json';
        componentsDir = '../components';
        servicesDir = '../services';
    }
    // a component directory
    else if(fs.existsSync('../../settings.json')){
        filename = '../../settings.json';
        componentsDir = '../../components';
        servicesDir = '../../services';
    }
    else{
        throw "Current module not found.";
    }

     var content = fs.readFileSync(filename);
    retval = JSON.parse(content);
    
    retval['componentsDir'] = componentsDir;
    retval['servicesDir'] = servicesDir;

    return retval;
}

function kebabIt(str){
    return kebab(str);
}

function pascalIt(str){
    return pascal.pascalCase(str);
}

function camelIt(str){
    return camel.camelCase(str);
}





