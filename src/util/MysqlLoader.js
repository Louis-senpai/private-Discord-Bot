const mysql = require('mysql2/promise');
const { ChalkAdvanced } = require("chalk-advanced");

class MySQLLoader {
  constructor() {
    this.connection = null;
  }

  async load() {
    try {
      this.connection = await mysql.createConnection({
        host: 'us1.database.sneakyhub.com',
        user: 'u2900_o9hADfFuSw',
        password: 'bZUswd^vGunPo9.pzJ+O.68H',
        database: 's2900_Anime'
      });

      console.log(
        `${ChalkAdvanced.white("AdoptMe Bot")} ${ChalkAdvanced.gray(
          ">",
        )} ${ChalkAdvanced.green("Successfully Connected To Database")}`,
      );
    } catch (error) {
      console.error('Could not connect to the MySQL database:', error);
    }
  }

  async unload() {
    if (this.connection) {
      await this.connection.end();
      console.log('Disconnected from the MySQL database.');
    }
  }
}

module.exports = MySQLLoader;