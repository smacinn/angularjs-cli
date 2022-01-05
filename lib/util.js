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
    "processPageJsTemplate": processPageJsTemplate,
    "cleanHtmlTemplate": cleanHtmlTemplate,
    "getDirectories": getDirectories,
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

// replacements is expected to be a dictionary
function processPageJsTemplate(replacements){
    var tmpl = '';

    tmpl = processTemplate('_page.js.template', replacements);

    return tmpl;
}

function cleanHtmlTemplate(tpl){
    var retval = "";
    var reg = new RegExp('\s+', 'g');

    retval = tpl.replace(reg, "");

    if(retval.Contains("'")){
        reg = new RegExp("'", 'g');
        retval = retval.replace(reg, "' + \"'\" + '");
    }

    return retval;
}

function getSettings(folder){
    var retval = {};
    var filename = '';
    var componentsDir = '';
    var servicesDir = '';
    var pagesDir = '';

    if(folder == null || folder == ''){
    // module directory
        if (fs.existsSync('settings.json')){
            filename = 'settings.json';
            componentsDir = './components';
            servicesDir = './services';
            pagesDir = './pages';
        }
        // services or components directory
        else if(fs.existsSync('../settings.json')){
            filename = '../settings.json';
            componentsDir = '../components';
            servicesDir = '../services';
            pagesDir = '../pages';
        }
        // a component directory
        else if(fs.existsSync('../../settings.json')){
            filename = '../../settings.json';
            componentsDir = '../../components';
            servicesDir = '../../services';
            pagesDir = '../../pages';
        }
        else{
            console.log("Module not found.");
            //process.exit(1);
        }
    }
    else{
        if (fs.existsSync(path.join(folder, 'settings.json'))){
            filename = path.join(folder, 'settings.json');
            componentsDir = path.join(folder, 'components');
            servicesDir = path.join(folder, 'services');
            pagesDir = path.join(folder, 'pages');
        }
        else{
            console.log("Module not found.");
        }
    }

     var content = fs.readFileSync(filename);
    retval = JSON.parse(content);
    
    if(folder != null && folder != ''){
        retval['moduleDir'] = folder;

    }
    else{
        retval['moduleDir'] = '.';
    }
    retval['componentsDir'] = componentsDir;
    retval['servicesDir'] = servicesDir;
    retval['pagesDir'] = pagesDir;

    return retval;
}

function getDirectories(folder){
    var retval = fs.readdirSync(folder, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

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





