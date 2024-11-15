import DatabaseConnector from "../Database/DatabaseConnector";

export async function initializeDatabase()
{
   DatabaseConnector.connect();
   
   const userTableExistsQuery = `SHOW TABLES LIKE 'user';`;
   const userTableExistsResult = await DatabaseConnector.executeQuery(userTableExistsQuery);
   
   const instituteTableExistsQuery = `SHOW TABLES LIKE 'institute';`;
   const instituteTableExistsResult = await DatabaseConnector.executeQuery(instituteTableExistsQuery);

   const branchTableExistsQuery = `SHOW TABLES LIKE 'branch';`;
   const branchTableExistsResult = await DatabaseConnector.executeQuery(branchTableExistsQuery);

   const notebookTableExistsQuery = `SHOW TABLES LIKE 'notebook';`;
   const notebookTableExistsResult = await DatabaseConnector.executeQuery(notebookTableExistsQuery);

   const subjectTableExistsQuery = `SHOW TABLES LIKE 'subject';`;
   const subjectTableExistsResult = await DatabaseConnector.executeQuery(subjectTableExistsQuery);

   const subscribedTableExistsQuery = `SHOW TABLES LIKE 'subscribed';`;
   const subscribedTableExistsResult = await DatabaseConnector.executeQuery(subscribedTableExistsQuery);

   if(userTableExistsResult.rows.length <= 0)
   {    
        await DatabaseConnector.executeQuery(`CREATE TABLE user (email VARCHAR(255) PRIMARY KEY, name VARCHAR(64), password VARCHAR(255), role INT, institute_id INT);`);
   }
}