import { roles } from "../Common/Constants/Roles.js";
import { validateUserInfo } from "../Common/ValidateUserInfo.js";
import DatabaseConnector from "./DatabaseConnector.js";

export default async function addNewUser(userInfo)
{
    if(!validateUserInfo(userInfo))
    {
        console.log("Invalid user info");
        return false;
    }

    let getInstituteIdQuery = `select id from institute where name = '${userInfo.institute}';`;
    let result = await DatabaseConnector.executeQuery(getInstituteIdQuery);

    if(result.rows.length == 0)
    {
        //TODO: Alert
        
        if(userInfo.role == roles.INSTITUTE_ADMIN)
        {
            const insertInstituteQuery = `insert into institute (name) values ('${userInfo.institute}')`;
            await DatabaseConnector.executeQuery(insertInstituteQuery);

        }
        //Not valid case
        else
        {
            return false;
        }
        
    }
    else
    {
        if(userInfo.role == roles.INSTITUTE_ADMIN)
        {
            return false;
        }
    }
    getInstituteIdQuery = `select id from institute where name = '${userInfo.institute}';`;
    result = await DatabaseConnector.executeQuery(getInstituteIdQuery);
    
    const instituteId = result.rows[0].id;

    const query = `INSERT INTO user (name, email, password, role, institute_id) VALUES ('${userInfo.name}','${userInfo.email}', '${userInfo.password}', ${userInfo.role}, ${instituteId});`;
    await DatabaseConnector.executeQuery(query);

    return true;
}
