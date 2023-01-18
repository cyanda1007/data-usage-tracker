export default function DataUsageTracker(db) {
  async function registerUser(firstName, lastName, email) {
    await db.manyOrNone(
      `insert into learner (first_name, last_name, email) values ($1, $2, $3)`,
      [firstName, lastName, email]
    );
  }
  async function findUser(userCode) {
    const findUserCode = await db.manyorNone(
      `select * from learner  where usercode = $1`,
      [userCode]
    );
    return findUserCode;
  }

  async function registerAppUsage(userCode, app_id, minUsed) {
    const usage = await db.manyorNone(
      `select * from learner_application_usage where (learner_id, app_id, minutes_used) values ($1, $2, $3)`,
      [userCode, app_id, minUsed]
    );
    return usage;
  }

  async function totalCostPerUser(usercode) {
    const cost = await db.manyOrNone(
      `select * from applications where usage_per_minute =$1`,
      [usercode]
    );
    return cost;
  }

  async function totalUsage() {
    const totUsage = await db.manyOrNone(
      `select * from learner_application_usage`
    );
    return totUsage;
  }

  async function availableData(userCode) {
    const availData = await db.manyOrNone(
      `select * learner_application_usage where minutes_used = $1`,
      [userCode]
    );
    return availData;
  }

  async function mostUsedApp(userCode) {
    const usedApp = await db.manyOrNone(
      `select * learner_application_usage where app_id =$1`,
      [userCode]
    );
    return usedApp;
  }

  async function sendDataToAnotherUser(from_user_code, to_user_code, airtime) {
    const sendData = await db.manyOrNone(
      `insert into learner where (first_name, usercode, data_balance) values ($1, $2, $3)`,
      [from_user_code, to_user_code, airtime]
    );
    return sendData;
  }
  return {
    registerUser,
    findUser,
    registerAppUsage,
    totalCostPerUser,
    totalUsage,
    availableData,
    mostUsedApp,
    sendDataToAnotherUser,
  };
}
