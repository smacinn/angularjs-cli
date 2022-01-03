#!/usr/bin/env node


import cli from "commander";
import createModule from "../commands/createModule.js"
import createComponent from "../commands/createComponent.js";
import createService from "../commands/createService.js";
import list from "../commands/list.js";


cli.name('ngjs');
cli.description("A command line utility for creating AngularJS assets");

cli.usage("<command>");
cli.addHelpCommand(true);
cli.helpOption(true);

/* List Command */
cli.command("list")
  .option("-a, --all", "List all commands")
  .description(
    "List the available commands."
  )
  .action(list);

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

  /* New Service command */
  cli.command("service")
  .argument("[name]", "name of the new AngularJS service/directive.")
  .description(
    "Create a new AngularJS service / directive file."
  )
  .action(createService);


cli.parse(process.argv);

