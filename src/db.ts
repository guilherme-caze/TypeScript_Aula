import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    database: 'TesteAula'
});

console.log('Conexão estabelecida com sucesso!');

export default connection;
