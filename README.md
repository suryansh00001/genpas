# 🔑 genpas

A simple and secure CLI password generator with optional local saving.
**Don’t worry — we never store your passwords remotely.**
All generated passwords are saved **only on your local machine** in a `passwords.json` file.

---

## ✨ Features

* Generate strong random passwords
* Options to exclude numbers or symbols
* Choose password length
* Interactive prompt to save passwords with a custom label
* Saved passwords stored locally in JSON format

---

## 📦 Installation

Install globally from npm:

```bash
npm install -g genpas
```

---

## 🚀 Usage

Generate a password (default length = 12):

```bash
genpas
```

Generate a password of length 16:

```bash
genpas -len=16
```

Exclude numbers:

```bash
genpas -nonum
```

Exclude symbols:

```bash
genpas -nosym
```

Show help:

```bash
genpas -h
```

---

## 💾 Saved Passwords

If you choose to save a password, it will be written to a local file named **`passwords.json`**.

### Finding the password file

Since `genpas` is installed globally, the file is saved inside the global npm `node_modules` folder.

1. First, get the global root path:

```bash
npm root -g
```

This will print something like:

* Windows: `C:\Users\LENOVO\AppData\Roaming\npm\node_modules`
* macOS/Linux: `/usr/local/lib/node_modules`

2. Your saved passwords file will be here:

```
<npm-root>/genpas/passwords.json
```

To access your password you can easily do 
```
cat <npm-root>/genpas/passwords.json
```

### Quick commands to open the file

**Windows (PowerShell)**

Open in Notepad:

```powershell
notepad ((npm root -g) + '\genpas\passwords.json')
```

Print to console:

```powershell
Get-Content ((npm root -g) + '\genpas\passwords.json') | Out-String
```

**macOS/Linux**

Show contents:

```bash
cat "$(npm root -g)/genpas/passwords.json"
```

Open in editor:

```bash
xdg-open "$(npm root -g)/genpas/passwords.json"   # Linux
open "$(npm root -g)/genpas/passwords.json"       # macOS
```

---

## ⚠️ Note

Saving files inside `node_modules` isn’t ideal because updates may overwrite them.
In a future update, saved passwords will move to your home directory (e.g., `~/.genpas_passwords.json`).

---

## 🛠️ Development

Clone the repo and run locally:

```bash
git clone https://github.com/<your-username>/genpas.git
cd genpas
npm install
node index.js -len=12
```

---

## 📜 License

MIT © 2025 Suryansh Garg
