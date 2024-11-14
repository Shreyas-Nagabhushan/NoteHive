import DatabaseConnector from "../Database/DatabaseConnector.js";
import User from "./User.js";

let user = null;

export function getUser() 
{
    return user;
}

export async function login(email, password)
{
    if(!email || !password)
    {
        return false;
    }

    const query = `SELECT * FROM users WHERE email='${email} AND password='${password}';`;
    const result = await DatabaseConnector.executeQuery(query);
    const rows = result.rows;
    
    if(rows.length == 0)
    {
        return false;
    }
    
    user = new User(email);
    return true;
}
