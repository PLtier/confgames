#!/usr/bin/env node
const program = require('commander');
const {prompt} = require('inquirer');
const {
    listSponsors,
    addSponsor,
    removeSponsor,
    addTestSponsor
} = require('./functions');

const questions = [
    {
        type: 'input',
        name: 'sponsorName',
        message: 'Sponsor Name'
    },
    {
        type: 'input',
        name: 'password',
        message: 'Password'
    }
];

program
    .version('1.0.0')
    .description('Sponsor Management System')

program
    .command('add')
    .alias('a')
    .description('Add a customer')
    .action(() => {
        prompt(questions).then(answers => addSponsor(answers));
    });


// Remove Command
program
    .command("remove <sponsorName>")
    .alias('r')
    .description('Remove a customer')
    .action(sponsorName => removeSponsor(sponsorName));

// List Command
program
    .command('list')
    .alias('l')
    .description('List all sponsor with hashed password')
    .action(() => {
            listSponsors();
        }
    );

program
    .command('default <sponsorName>')
    .alias('def')
    .description('insert default sponsor')
    .action(sponsorName =>addTestSponsor(sponsorName));


program.parse(process.argv);



