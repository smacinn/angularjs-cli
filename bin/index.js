#!/usr/bin/env node


import cli from "commander";
import createModule from "../commands/createComponent.js"
import createComponent from "../commands/createComponent.js";
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


cli.parse(process.argv);

