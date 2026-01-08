const solc = require('solc');
const fs = require('fs');
const path = require('path');

// Read the Solidity source code
const contractPath = path.join(__dirname, 'contracts', 'SimpleERC20.sol');
const source = fs.readFileSync(contractPath, 'utf8');

// Prepare input for the compiler
const input = {
  language: 'Solidity',
  sources: {
    'SimpleERC20.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
};

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Check for errors
if (output.errors) {
  output.errors.forEach(error => {
    console.error(error.formattedMessage);
  });
}

// Get the compiled contract
const contract = output.contracts['SimpleERC20.sol']['SimpleERC20'];

// Write ABI and Bytecode to files
fs.writeFileSync(path.join(__dirname, 'contracts', 'SimpleERC20.abi.json'), JSON.stringify(contract.abi, null, 2));

fs.writeFileSync(path.join(__dirname, 'contracts', 'SimpleERC20.bytecode.txt'), contract.evm.bytecode.object);

console.log(' Contract compiled successfully!');
console.log(' ABI saved to: contracts/SimpleERC20.abi.json');
console.log('Bytecode saved to: contracts/SimpleERC20.bytecode.txt');
