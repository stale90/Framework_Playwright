import test, { TestInfo } from "@playwright/test";

//*************Test Variables***************


//*************Hooks***************
// Before All Hook - to create/reset initialise report or global variables once
test.beforeAll(async () => {
    // Code here
});

test.afterAll(async () => {
   // Code here
});

// Before Each - to setup test pre conditions Login etc.
test.beforeEach(async () => {
   // Code here
});

// After Each - to append the test result and capture a screenshot on failure.
test.afterEach(async () => {
   // Code here
});

//*************Test Setup functions***************