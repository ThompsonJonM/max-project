# MAX QA Project

A testing repository using Cypress to automate FE and unit tests for a MAX application.

1. [Tools Used](#tools-used)
2. [Installation](#installation)
3. [Running Tests](#running-tests)
4. [Test Plan](#test-plan)

### Tools Used
- Cypress.io
- Prettier
- ESLint

### Installation
Simply input the following:

`npm install`

### Running Tests
This repository supports the following commands:
- `npm run test`
- `npm run test:headful`

Headful tests will run using the Cypress GUI while the default test command will run all tests via CLI.

### Test Plan
- FE
    - Positive path
        - Valid data
    - Negative paths
        - Invalid data
        - Null data
    - Watch endpoints
- BE
    - Try using Cypress for BE
    - Verify functions and results
    - Notice that functions which throw errors break Cypress