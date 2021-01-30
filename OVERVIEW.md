# MAX QA Engineer Project

Your task is to write tests for the provided code in this directory.  The main functionality is all contained within `accounts.js`.  Please write tests to ensure that these functions have proper test converage.  The `index.js` file contains example [Firebase](https://firebase.google.com/docs/functions) functions wrapping the functionality of the create and update account functions.  You do not have to write tests for the code contained in `index.js`.  If you do choose to do so, however, note that the wrapped functions can be called like so:

```
const {accounts} = require('./index');

const context = {
  rawRequest: {
    headers: {
      'x-forwarded-for': '127.0.0.1'
    }
  }
};

const data = {
    // ... payload ...
};

accounts.create.run(data, context);
```

Update the `README.md` file with instructions with how to run your tests and any other information you may deem relevant.  Include any required dependencies in `package.json`.  If you have any questions or run into any issues with the code, please let us know.