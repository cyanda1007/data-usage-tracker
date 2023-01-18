import pgPromise from "pg-promise";
const pgp = pgPromise();

class Database {
  constructor() {}

  get db() {
    const config = {
      user: process.env.user || "user",
      host: process.env.host || "localhost",
      database: process.env.database || "db",
      password: process.env.password || "somePassWord",
      port: process.env.port || "9876",
    };

    return pgp(config);
  }
}

export default Database;
