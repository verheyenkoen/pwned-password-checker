import yargs from 'yargs'

const args = yargs
  .command(
    '$0 <file>',
    'Check a CSV file for breached passwords against HaveIBeenPwned.'
  )
  .option('u', {
    alias: 'username',
    default: 'username',
    description: 'The name or index of the username column in the CSV file',
    type: 'string'
  })
  .option('p', {
    alias: 'password',
    default: 'password',
    description: 'The name or index of the password column in the CSV file',
    type: 'string'
  })
  .option('n', {
    alias: 'name',
    default: 'name',
    description: 'The name or index of the name column in the CSV file',
    type: 'string'
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .help().argv

console.log(args)
