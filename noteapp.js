
const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

var title = {
    describe: "Title of note",
    demand: true,
    alias: 't'
};

var body = {
    describe: "The body of the note",
    demand: true,
    alias: 'b'
};

const notes = require('./notes.js');
const argv = yargs
    .command('add','Add a new note',{
        title: title,
        body: body
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: title
    })
    .command('remove', 'Remove a note', {
        title: title
    })
    .help()
    .argv;
var command = argv._[0];


if (command === "add") {
    var note = notes.addNote(argv.title, argv.body);

    if(_.isNil(note)){
        console.log(argv.title, "not created!");
    }
    else {
        console.log(note.title, "created!");
        notes.logNote(note);

    }
}
else if (command === "list") {
    var allNotes = notes.getAllNotes();
    console.log(`Getting ${allNotes.length} note(s)...`);
    allNotes.forEach((note) =>{
        notes.logNote(note);
    });
    // for(var i=0; i<note.length; i++){
    //     console.log(`Title: ${note[i].title}`);
    //     console.log(`Body: ${note[i].body}`);
    // }
}
else if (command === "remove") {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note removed!" : "Note not found!";
    console.log(message);
}
else if (command === "read") {
    var note = notes.readNote(argv.title);
    if(note){
        notes.logNote(note);
    }
    else {
        console.log("Note not found!");
    }
}
else {
    console.log("Command not recognised!");
}
