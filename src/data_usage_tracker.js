import Database from "./config";
import Queries from "./queries";

const db = new Database();
const queries = new Queries();

export default function DataUsageTracker(db) {
  async function registerUser(first_name, last_name, email) {
    const values = [first_name, last_name, email];
    const register = db.db.query(queries.registerUser, values);
    if (register instanceof Error) return register.message;
    return register;
  }

  function findUser(usercode) {
    const values = [usercode];
    const getUser = db.db.query(queries.userByUserCode, values);
    if (getUser instanceof Error) return getUser.message;
    return getUser;
  }

  function registerAppUsage(usercode, app_id, minUsed) {
    const values = [usercode, app_id, minUsed];
    const registerApp = db.db.query(queries.registerApp, values);
    if (registerApp instanceof Error) return registerApp.message;
    return registerApp;
  }

  function getApplicationByUserCode(usercode) {
    const getUserByUserCode = findUser(usercode);

    if (getUserByUserCode instanceof Error) return getUserByUserCode.message;

    let leaner_id;
    getUserByUserCode.rows.map((data) => {
      leaner_id = data.id;
    });
    let values = [leaner_id];
    const getLeanerApplicationUsageByLeanerId = db.db.query(
      queries.userLeanerApplicationUsageByUser,
      values
    );

    if (getLeanerApplicationUsageByLeanerId instanceof Error)
      return getLeanerApplicationUsageByLeanerId.message;

    let app_id;

    getUserByUserCode.rows.map((data) => {
      app_id = data.id;
    });

    values = [app_id];

    const getApplicationByAppId = db.db.query(
      queries.userLeanerApplicationUsageByUser,
      values
    );

    if (getApplicationByAppId instanceof Error)
      return getApplicationByAppId.message;

    return getApplicationByAppId;
  }

  function totalCostPerUser(usercode) {
    const application = getApplicationByUserCode(usercode);

    if (application instanceof Error) return application.message;

    let minutes_used;

    application.rows.map((data) => {
      minutes_used = data.minutes_used;
    });

    return minutes_used * 0.9;
  }

  function totalUsage() {}

  function availableData(usercode) {}

  function mostUsedApp(usercode) {}

  function sendDataToAnotherUser(from_user_code, to_user_code, airtime) {}
  return {
    registerUser,
    findUser,
    registerAppUsage,
    getApplicationByUserCode,
    totalCostPerUser,
    totalUsage,
    availableData,
    mostUsedApp,
    sendDataToAnotherUser,
  };
}
