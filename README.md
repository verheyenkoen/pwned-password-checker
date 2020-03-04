# pwned-password-checker

Check a CSV file for breached passwords against [HaveIBeenPwned](https://haveibeenpwned.com).

## Installation

Clone this repository:

    $ git clone git@github.com:verheyenkoen/pwned-password-checker.git
    $ cd pwned-password-checker

Install package dependencies using [npm](https://www.npmjs.com/get-npm):

    $ npm install
    
or [Yarn](https://classic.yarnpkg.com/en/docs/install):

    $ yarn install

## Usage

Execute using the `node` executable:

    $ node app.js passwords.csv

Or directly by executing [app.js](https://github.com/verheyenkoen/pwned-password-checker/blob/master/app.js):

    $ ./app.js passwords.csv
    
If you use yarn, you can also take advantage of the [yarn link](https://classic.yarnpkg.com/en/docs/cli/link) feature (one-time command):

    $ yarn link

Now you can execute `pwned-password-checker` from any working directory:

    $ pwned-password-checker passwords.csv
    
**!!! REMEMBER to always hard delete your passwords file after checking !!!**

## Options

If your CSV file has different column header names for usernames, passwords or service names, you can overrule the defaults using these options:

```
Options:
  -u, --username  The name of the username column in the CSV file
                                                  [string] [default: "username"]
  -p, --password  The name of the password column in the CSV file
                                                  [string] [default: "password"]
  -n, --name      The name of the service name column in the CSV file
                                                      [string] [default: "name"]
  -v, --version   Show version number                                  [boolean]
  -h, --help      Show help                                            [boolean]
  ```
