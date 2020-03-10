import yargs from 'yargs'
import * as csv from 'fast-csv'
import sha1 from 'sha1'
import fetch from 'node-fetch'

const args = yargs
  .command('$0 <file>', 'Check a CSV file for breached passwords against HaveIBeenPwned.')
  .option('u', {
    alias: 'username',
    default: 'username',
    description: 'The name of the username column in the CSV file',
    type: 'string'
  })
  .option('p', {
    alias: 'password',
    default: 'password',
    description: 'The name of the password column in the CSV file',
    type: 'string'
  })
  .option('n', {
    alias: 'name',
    default: 'name',
    description: 'The name of the service name column in the CSV file',
    type: 'string'
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .help().argv

let count = 0

csv
  .parseFile(args.file, { headers: true, ignoreEmpty: true, trim: true })
  .on('data', record => {
    if (record[args.password]) {
      count++

      // skip empty passwords
      const hash = sha1(record[args.password]).toUpperCase()
      const prefix = hash.substring(0, 5)
      const suffix = hash.substring(5)

      fetch(`https://api.pwnedpasswords.com/range/${prefix}`, { headers: { 'Add-Padding': true } })
        .catch(err => {
          console.error(err)
        })
        .then(res => res.text())
        .then(data => {
          csv.parseString(data, { delimiter: ':', headers: ['suffix', 'count'] }).on('data', data => {
            if (data.count > 0 && suffix === data.suffix) {
              console.log(`The password for "${record[args.name]}" was found ${data.count} time(s).`)
              console.log(`  User: ${record[args.username]} / Password: ${record[args.password]}`)
            }
          })
        })
    }
  })
  .on('end', rowCount => console.log(`${count} password(s) checked from ${rowCount} rows.`))
