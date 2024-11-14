export default async function addNewUser(userInfo)
{
    // const getInstituteIdQuery = `select institute_id from institutes where name = '${userInfo.institute}';`;
    //const result = await DatabaseConnector.executeQuery(getInstituteIdQuery);
    // if(result.rows.length == 0)
    // {
    //     console.log("Institute not found");
    //     return false;
    // }
    // const instituteId = result.rows[0].institute_id;

    //WARNING: CHECK table name, datatypes, role and institute id
    // const query = `INSERT INTO users (name, email, password, role, institute_id) VALUES ('${userInfo.name}','${userInfo.email}', '${userInfo.password}', ${userInfo.role}, ${instituteId});`;

    // await DatabaseConnector.executeQuery(query);
    return true;
}
