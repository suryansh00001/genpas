#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Path to store passwords
const PASSWORD_FILE = path.join(__dirname, 'passwords.json');

// Character sets
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>/?';

// Default options
let length = 12;
let useNumbers = true;
let useSymbols = true;

// Parse CLI args
const args = process.argv.slice(2);

if (args.includes('-h') || args.includes('--help')) {
  console.log(`
Usage: genpass [options]

Options:
  -len=N       Set password length (default 12)
  -nonum       Exclude numbers
  -nosym       Exclude symbols
  -h, --help   Show this help
`);
  process.exit(0);
}

args.forEach(arg => {
  if (arg.startsWith('-len=')) {
    const val = parseInt(arg.split('=')[1]);
    if (!isNaN(val) && val > 0) length = val;
    else console.warn("Invalid length, using default:", length);
  }
  if (arg === '-nonum') useNumbers = false;
  if (arg === '-nosym') useSymbols = false;
});

// Build charset
let charset = LOWERCASE + UPPERCASE;
if (useNumbers) charset += NUMBERS;
if (useSymbols) charset += SYMBOLS;

// Generate password
function generatePassword(len) {
  let pwd = '';
  for (let i = 0; i < len; i++) {
    const randIndex = Math.floor(Math.random() * charset.length);
    pwd += charset[randIndex];
  }
  return pwd;
}

const password = generatePassword(length);
console.log(`\nGenerated Password: ${password}\n`);

// Function to save password
function savePassword(pwd, label) {
  let data = [];
  if (fs.existsSync(PASSWORD_FILE)) {
    data = JSON.parse(fs.readFileSync(PASSWORD_FILE, 'utf8'));
  }

  data.push({
    label: label,
    password: pwd,
    date: new Date().toISOString()
  });

  fs.writeFileSync(PASSWORD_FILE, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Password saved successfully under label "${label}"`);
}

// Ask user if they want to save
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Save this password? (y/n): ', answer => {
  if (answer.toLowerCase() === 'y') {
    rl.question('Enter a label for this password: ', label => {
      savePassword(password, label.trim() || "Unnamed");
      rl.close();
    });
  } else {
    console.log("Password not saved.");
    rl.close();
  }
});
