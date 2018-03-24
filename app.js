const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titleOptions = {
  describe: 'Title of the note',
  demand: true,
  alias: 't'
};

var bodyOptions = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
}
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note',{
    title: titleOptions
  })
  .command('remove', 'Remove a note',{
    title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];

// Add command
if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (!_.isEmpty(note)) {
    console.log(`Congratulations! Note Created.`);
    notes.logNote(note);
  } else {
    console.log(`Title already in use`);
  }

  // List command
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
    notes.logNote(note);
  });

  // Read command
} else if (command === 'read') {
  var readNote = notes.readNote(argv.title);
  if (!_.isEmpty(readNote)) {
    console.log("Note Found!");
    notes.logNote(readNote);
  } else {
    console.log('Note not found.');
  }

  // Remove command
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
