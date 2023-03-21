# web

Grails 3 project

This is the sales and rental market place code.

Including but not limited to the product pages, the cart and checkout.

Uses the API project for database access.

### Front-end
In order to install all the js libraries needed for the project run the following command
```bash
npm install
```

In order to recompile the bundles once a js entry point is modified run the following command each time you make a change:

```bash
npm run bundle
```

or run the following command to have npm and webpack keep watching for changes:

```bash
npm run watch
```

In order to run the tests, you will need to run the following command
```bash
npm test
```

Once the tests have finished running, you will see how many tests passed, failed, and ran in total. If there are any failing tests, you will need to fix them before you open a pull request. We also prefer that there is 100% coverage. So, make sure to check the table that is printed out when running the test command for 100% coverage!