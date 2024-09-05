const { Pool } = require("pg");

const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "zombieplus",
  password: "pwd123",
  port: 5432,
};

export async function executeSql(sqlScript) {    
  try {
    const pool = new Pool(dbConfig);
    const client = await pool.connect();
    const result = await client.query(sqlScript);    
    console.log(result.rows);
    client.release();
  } catch (error) {
    console.log("Erro ao executar SQL" + error);
  } 
}

