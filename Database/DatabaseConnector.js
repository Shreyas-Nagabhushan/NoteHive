const mysql = require("mysql2/promise");

class DatabaseConnector 
{
    static connection = null;
    static connectionDetails = 
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cs139'
    };

    static async connect()
    {
        DatabaseConnector.connection = await mysql.createConnection(DatabaseConnector.connectionDetails);
    }

    static async disconnect()
    {
        await DatabaseConnector.connection.end();
    }

    static async executeQuery(query)
    {
        const [rows, fields] = await connection.execute(query);
        return { rows: rows, fields: fields };
    }
}