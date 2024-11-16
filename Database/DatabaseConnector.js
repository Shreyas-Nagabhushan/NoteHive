const mysql = require("mysql2/promise");

class DatabaseConnector 
{
    static connection = null;
    static connectionDetails = 
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'NoteHive'
    };

    static async connect()
    {
        if(!DatabaseConnector.connection)
        {
            DatabaseConnector.connection = await mysql.createConnection(DatabaseConnector.connectionDetails);
        }
    }

    static async disconnect()
    {
        if(!DatabaseConnector.connection)
        {
            return;
        }
        
        await DatabaseConnector.connection.end();
        DatabaseConnector.connection = null;
    }

    static async executeQuery(query)
    {
        if(!DatabaseConnector.connection)
        {
            await DatabaseConnector.connect();
        }

        const [rows, fields] = await DatabaseConnector.connection.execute(query);

        await DatabaseConnector.disconnect();

        return { rows: rows, fields: fields };
    }
}

export default DatabaseConnector;