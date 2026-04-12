#!/usr/bin/env node
import { program } from 'commander';
import { registerEventsCommands } from './commands/events.js';
import { registerPlacesCommands } from './commands/places.js';
import { registerGuidesCommands } from './commands/guides.js';
import { registerOutdoorCommand } from './commands/outdoor.js';
import { registerCultureCommand } from './commands/culture.js';
import { registerInfoCommands } from './commands/info.js';
import { registerSearchCommand } from './commands/search.js';

program
  .name('sanluisway')
  .description('Query San Luis Potosí data from your terminal')
  .version('0.1.0');

registerEventsCommands(program);
registerPlacesCommands(program);
registerGuidesCommands(program);
registerOutdoorCommand(program);
registerCultureCommand(program);
registerInfoCommands(program);
registerSearchCommand(program);

program.parse();
