# Question Wiki

### Installation

`cd` to your installation directory.

```
npm install
cp sample.env .env
```

Now edit your .env file to contain the correct credentials. Then run `npm run migrate` and if you want to seed the DB with dummy data, run `npm run seed`.

### Testing

To run the test suite, you'll need to create a new DB and set your credentials for it in `.env`. Be sure to change the `NODE_ENV` variable in your `.env` file to `test` before running the test suite!

Now, run `npm run migrate` to populate the DB tables for your test DB. (You only need to do this one time.)

With `NODE_ENV` set to `test` in your `.env` file, you can now run `npm run test`.

#### Refreshing the DB

During testing, it's prudent to refresh the DB so each test can run on brand new data without other tests creating data that could interfere with the test at hand. To do that, you need to truncate all tables before each test. With the current setup, it's a breeze. Here's the code to use in your tests to make that happen.

```
const resetDb = require('testkit'); // This is a reference to "testkit.js" in the root directory.
describe('Test suite name', () => {

    // Run before the entire test suite
    beforeAll(() => {
        return resetDb();
    });

    // OR

    // Run before each test (May cause hard-to-find bugs as this one may be deleting data while another test is running and using the data.)
    beforeEach(() => {
        return resetDb();
    });

    it('does something, () => {
        // Test something
    }));

});
```

#### Helpers

Given that testing requires you to reset the DB each time, you'll need a quick way to generate data in the DB for use in a test. For example, you may need a user for an API call. To do that, there's a library of helpers available to use. Just require the helpers in the /test directory with `const { Helpers } = require('./helpers/helpers');` and then use them to generate data in the testing DB.

**IMPORTANT:** Remember to return the output of these helpers to the calling function. Jest expects you to return a Promise if you're using asynchronous code, as it waits for the Promise to resolve so it can see if there was an error or not. No Promise returned === Test ALWAYS passes! (Really bad thing.)

* **Generate a user** - `Helpers.makeUser(userId => { // Use it });`
* **Generate a blog post** - `Helpers.makeBlogPost(postId => { //Use it });`
