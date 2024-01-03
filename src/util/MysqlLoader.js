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
	async insert(table, values) {
		return this.query(`INSERT INTO ${table} SET ?`, [values]);
	}

	async select(table, columns = "*", where = {}) {
		let sql = `SELECT ${columns} FROM ${table}`;
		if (Object.keys(where).length) {
			sql += " WHERE ";
			const whereClauses = [];
			for (const key in where) {
				whereClauses.push(`${key} = ?`);
			}
			sql += whereClauses.join(" AND ");
		}

		const whereValues = Object.values(where);
		return this.query(sql, whereValues);
	}

	async delete(table, where) {
		let sql = `DELETE FROM ${table}`;

		if (Object.keys(where).length) {
			sql += " WHERE ";
			const whereClauses = [];
			for (const key in where) {
				whereClauses.push(`${key} = ?`);
			}
			sql += whereClauses.join(" AND ");
		}

		const whereValues = Object.values(where);

		return this.query(sql, whereValues);
	}

	async query(sql, values = []) {
		return this.connection.execute(sql, values);
	}
}


module.exports = MySQLLoader;