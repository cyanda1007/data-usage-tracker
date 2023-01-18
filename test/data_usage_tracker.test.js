import assert from "assert";
import DataUsageTracker from "../data_usage_tracker.js";
import pgPromise from "pg-promise";

// TODO configure this to work.
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://localhost:5432/data_usage_tracker_test";

const config = {
  connectionString: DATABASE_URL,
};

const pgp = pgPromise();
const db = pgp(config);

let dataTracker = DataUsageTracker(db);

describe("", function () {
  beforeEach(async function () {
    await db.none(`delete from learner`);
    await db.none("delete from application");
    await db.none("delete from learner_application_usage");
  });

  it("should able to register a user", async function () {
    const register = await dataTracker.registerUser();
    assert.equal("siyanda, ntshangase, siya@gmail.com", register);
  });

  it("should able to find the user", async function () {
    const user = await dataTracker.findUser();
    assert.equal("pxnf",user);
  });

  it("should register the the app", async function () {
    const app = await dataTracker.registerAppUsage("math-app");
    assert.equal(app,true, false );
  });

  it("should be show the user usage", async function () {
    const usage = await dataTracker.totalCostPerUser("25mb")
    assert.equal(true, false, usage);
  });

  it("should be able to show the total usage", async function () {
    const totalUse = await dataTracker.totalUsage();
    assert.equal(true, false);
  });

  it("should be able show the available data", function () {
    const data = await  dataTracker.availableData();
    assert.equal(1, 2, data);
  });

  it("should be able to determine most use app", function () {
    const moreUseTab = await dataTracker.mostUsedApp();
    assert.equal(1, 2);
  });
  it("should allow the user to send data to another user", function () {
    const sendData = await dataTracker.sendDataToAnotherUser()
    assert.equal(1, 2);
  });

  after(function () {
    db.$pool.end();
  });
});
