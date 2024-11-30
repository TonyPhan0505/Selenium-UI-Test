## Repository's structure
#### Given files: 
#### `./guide.html`
#### `./index.html`

#### Solution files:
#### `./test.js`

## Dependencies
1. selenium-webdriver: v4.26.0
2. mocha: v10.7.3

## Installations
Please run the following command to install the dependencies:
#### `npm install`

## Running the Solution
The solution is a test file that implements the 6 tests described in "./guide.html". The target of these tests is the "./index.html" file.

The solution file - "./test.js" - is configured to be able to run with the 4 most popular web browsers: Safari, Chrome, Microsoft Edge, Firefox.

#### To run the tests with Safari:
1. Open Safari and go to Safari > Advanced > Show Develop menu in menu bar
2. Still in Safari, go to Develop > Allow Remote Automation
3. Uncomment line 167 in ./test.js
4. Comment out other lines that start with "describe..."
5. Run this command in the repository directory:
#### `npm test`

#### To run the tests with Chrome:
1. Open Chrome
2. Uncomment line 170 in ./test.js
3. Comment out other lines that start with "describe..."
4. Run this command in the repository directory:
#### `npm test`

#### To run the tests with Microsoft Edge:
1. Open Microsoft Edge
2. Uncomment line 173 in ./test.js
3. Comment out other lines that start with "describe..."
4. Run this command in the repository directory:
#### `npm test`

#### To run the tests with Firefox:
1. Open Firefox
2. Uncomment line 176 in ./test.js
3. Comment out other lines that start with "describe..."
4. Run this command in the repository directory:
#### `npm test`
