const path = require('path')

module.exports = {
  contracts_build_directory: path.join(__dirname, 'app/src/contracts'),
  compilers: {
    solc: {
      version: '0.5.7',
      optimizer: {
        enabled: true,
        runs: 500
      }
    }
  }
}
