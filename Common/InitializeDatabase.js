import DatabaseConnector from "../Database/DatabaseConnector.js";

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

   const resourceTableExistsQuery = `SHOW TABLES LIKE 'resource';`;
   const resourceTableExistsResult = await DatabaseConnector.executeQuery(resourceTableExistsQuery);

   if(userTableExistsResult.rows.length <= 0)
   {    
        await DatabaseConnector.executeQuery(`CREATE TABLE user (email VARCHAR(255) PRIMARY KEY, name VARCHAR(64), password VARCHAR(255), role INT, institute_id INT);`);
   }

   if(instituteTableExistsResult.rows.length <= 0)
   {    
        await DatabaseConnector.executeQuery(`CREATE TABLE institute (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64), address VARCHAR(255), established_date DATE);`);  
   }
   
   if(branchTableExistsResult.rows.length <= 0)
   {    
        await DatabaseConnector.executeQuery(`CREATE TABLE branch (institute_id INT, name VARCHAR(64), FOREIGN KEY (institute_id) REFERENCES institute(id));`);  
   }

   if(subjectTableExistsResult.rows.length <= 0)
   {    
         await DatabaseConnector.executeQuery(`CREATE TABLE subject (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64), code VARCHAR(10), institute_id INT, FOREIGN KEY (institute_id) REFERENCES institute(id));`);
   }

   if(notebookTableExistsResult.rows.length <= 0)
   {    
        await DatabaseConnector.executeQuery(`CREATE TABLE notebook (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64), subject_id INT, FOREIGN KEY (subject_id) REFERENCES subject(id), last_modified BIGINT);`);  
   }

   if(subscribedTableExistsResult.rows.length <= 0)
   {
        await DatabaseConnector.executeQuery(`CREATE TABLE subscribed (email VARCHAR(255) , FOREIGN KEY(email) REFERENCES user(email), notebook_id INT, FOREIGN KEY (notebook_id) REFERENCES notebook(id));`);
   }

   if(resourceTableExistsResult.rows.length <= 0)
   {
        await DatabaseConnector.executeQuery(`CREATE TABLE resource (notebook_id INT, FOREIGN KEY (notebook_id) REFERENCES notebook(id), filename VARCHAR(256), data LONGBLOB NOT NULL);`);
   }

   DatabaseConnector.disconnect();
}

initializeDatabase();