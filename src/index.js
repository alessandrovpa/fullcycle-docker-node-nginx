import express from 'express';
import mysql from 'mysql';

const app = express();
app.use(express.json());
const PORT = 3000;

const databaseConnection = mysql.createPool({
  host: 'database',
  user: 'root',
  password: 'docker',
  database: 'nodedb',
  port: 3306,
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL)`;
const insertUserQuery = `INSERT INTO people (name) VALUES('Usuario')`;
const listUsersQuery = `SELECT * FROM people`;


app.get('/', async (req, res) => {
  await databaseConnection.query(createTableQuery);
  
  await databaseConnection.query(insertUserQuery);

  await databaseConnection.query(listUsersQuery, (err, result) => {
    if(err) res.json({error: 'Aguarde alguns intantes e tente novamente!'});
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
