#!/usr/bin/env node


import cli from "commander";
import createModule from "../commands/createModule.js"
import createComponent from "../commands/createComponent.js";
import createService from "../commands/createService.js";
import createPage from "../commands/createPage.js";
import build from "../commands/build.js";


cli.name('ngjs');
cli.description("A command line utility for creating AngularJS assets");

cli.usage("<command>");
cli.addHelpCommand(true);
cli.helpOption(true);


  /* build command */
  cli.command("build")
  .requiredOption("-o, --output <folder>", "Destination folder, relative to the current working directory.")
  .option("-d, --dev", "keep console.log calls.")
  .option("-r, --root", "target folder is a root folder that contains multiple modules.")
  .option("-p, --prod", "remove console.log calls.")
  .argument("[folder]", "spa modules folder for the project.")
  .description(
    "build all the modules in the spa directory."
  )
  .action(build);

/* New Module command */
cli.command("module")
.option("-a, --abbreviation <abbreviation>", "Abbreviation for module.")
.option("-c, --component <name>", "create component")
.argument("[name]", "name of the new AngularJS module.")
.description(
  "Create a new AngularJS module folder."
)
.action(createModule);

/* New Component command */
cli.command("component")
.argument("[name]", "name of the new AngularJS component.")
.description(
  "Create a new AngularJS component folder and files."
)
.action(createComponent);

/* New Component command */
cli.command("page")
.argument("[name]", "name of the new AngularJS page.  A page is a composite component meant to be used with ngRouter.")
.description(
  "Create a new AngularJS page folder and files."
)
.action(createPage);

  /* New Service command */
  cli.command("service")
  .argument("[name]", "name of the new AngularJS service/directive.")
  .description(
    "Create a new AngularJS service / directive file."
  )
  .action(createService);


cli.parse(process.argv);

