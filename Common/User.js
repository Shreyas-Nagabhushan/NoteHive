import DatabaseConnector from "../Database/DatabaseConnector.js";

class User  
{
    constructor(email)
    {
        this.email = email;
    }

    async getPrivilege()
    {
        await DatabaseConnector.connect();

        const query = `SELECT level FROM privilege WHERE email='${this.email}';`;
        const result = await DatabaseConnector.executeQuery(query);
        await DatabaseConnector.disconnect();

        if(result.rows.length > 0)
        {
            return result.rows[0].level;
        }
        return null;
    }


} 

export default User;