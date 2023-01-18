class Queries {
  constructor() {}

  get registerUser() {
    return `INSERT INTO leaner (first_name, last_name, email) VALUES ($1, $2, $3)`;
  }

  get registerApp() {
    return `INSERT INTO learner_application_usage (leaner_id, app_id, minutes_used) VALUES ($1, $2, $3)`;
  }


  get userLeanerApplicationUsageByUser() {
    return `select * from learner_application_usage where leaner_id = $1`;
  }

  get userByUserCode() {
    return `select * from learner where usercode = $1`;
  }
}

export default Queries;
