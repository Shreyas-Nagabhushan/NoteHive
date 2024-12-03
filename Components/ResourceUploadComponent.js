import DatabaseConnector from "../Database/DatabaseConnector.js";
import { createAlert, getUser } from "../Common/Globals.js";

class ResourceUploadComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.alignItems = "center";
        this.style.justifyContent = "space-evenly";
        this.style.padding = "10px";
        this.style.border = "solid white 3px";
        this.style.borderRadius = "10px";


        this.innerHTML = `
            <div class="resource-upload-form">
                <div style="flex:1;width:100%;">Subject:</div>
                <input type="text" class="subject-input" placeholder="Enter subject...">

                <div style="flex:1;width:100%;">Notebook:</div>
                <input type="text" class="notebook-input" placeholder="Enter notebook name...">

                <div style="flex:1;width:100%;">File:</div>
                <input type="text" class="file-name-display" placeholder="Please upload a file..." readonly>
                <button class="file-select-button" style="width: 50%;">Select Files</button>
                <input type="file" class="file-input" placeholder="Enter file..." multiple>
            </div>
            <button class="upload-button" style="width: 50%;margin:10px;">Upload Resource</button>  

        `;

        const resourceUploadForm = this.querySelector(".resource-upload-form");
        const fileInput = this.querySelector(".file-input");
        const fileSelectButton = this.querySelector(".file-select-button");
        const uploadButton = this.querySelector(".upload-button");

        resourceUploadForm.style.display = "flex";
        resourceUploadForm.style.flexDirection = "column";
        resourceUploadForm.style.justifyContent = "space-evenly";
        resourceUploadForm.style.alignItems = "center";

        fileInput.style.display = "none";

        fileInput.addEventListener("change", ()=>
        {
            this.querySelector(".file-name-display").value = "";

            for(let i = 0 ; i < fileInput.files.length; i++)
            {
                this.querySelector(".file-name-display").value += fileInput.files[i].name;
                if(i < fileInput.files.length - 1)
                {
                    this.querySelector(".file-name-display").value += ", ";
                }
            }

        });
        
        fileSelectButton.addEventListener("click", ()=>
        {
            fileInput.click();
        });

        uploadButton.addEventListener("click", async ()=>
        {
            const subject = this.querySelector(".subject-input").value;
            const notebook = this.querySelector(".notebook-input").value;
            const file = this.querySelector(".file-input").files[0];
            
            if(!subject || !notebook || !file)
            {
                createAlert("Please fill all the fields");
                console.log("Please fill all the fields");
                return;
            }

            const instituteId = await getUser().getInstituteId();
            const notebookExistsQuery = `SELECT * FROM notebook WHERE name = '${notebook}' AND subject_id IN (select id from subject where name = '${subject}' and institute_id = ${instituteId}) ;`;
            const notebookExistsResult = await DatabaseConnector.executeQuery(notebookExistsQuery);

            const subjectExistsQuery = `SELECT * FROM subject WHERE name = '${subject}' AND institute_id = ${instituteId};`;
            const subjectExistsResult = await DatabaseConnector.executeQuery(subjectExistsQuery);
            
            if(subjectExistsResult.rows.length == 0)
            {
                console.log("Subject does not exist");

                const insertSubjectQuery = `INSERT INTO subject (name, institute_id) VALUES ('${subject}', ${instituteId});`;
                await DatabaseConnector.executeQuery(insertSubjectQuery);
                console.log("Subject created");

            }

            if(notebookExistsResult.rows.length == 0)
            {
                console.log("Notebook does not exist");

                const subjectIdQuery = `SELECT id FROM subject WHERE name = '${subject}' AND institute_id = ${instituteId};`;   
                const subjectIdResult = await DatabaseConnector.executeQuery(subjectIdQuery);
                const subjectId = subjectIdResult.rows[0].id;

                const insertNotebookQuery = `INSERT INTO notebook (name, subject_id, last_modified) VALUES ('${notebook}', ${subjectId}, ${Date.now()});`;
                await DatabaseConnector.executeQuery(insertNotebookQuery);

                console.log("Notebook created");
    
            }

            const notebookIdQuery = `SELECT id FROM notebook WHERE name = '${notebook}' AND subject_id IN (select id from subject where name = '${subject}' and institute_id = ${instituteId}) ;`;
            const notebookIdResult = await DatabaseConnector.executeQuery(notebookIdQuery);
            const notebookId = notebookIdResult.rows[0].id;

            console.log("Notebook id is: " + notebookId);

            for(let i = 0; i < fileInput.files.length; i++)
            {
                const fileBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(fileBuffer);

                await DatabaseConnector.connect();
                const insertResourcesQuery = `INSERT INTO resource VALUES ('${notebookId}', '${fileInput.files[i].name}', ?);`;
                await DatabaseConnector.connection.execute(insertResourcesQuery, [buffer]);
                await DatabaseConnector.disconnect();
                
            }
            createAlert("Resources uploaded");
            console.log("Resources uploaded");
            

        });
    }
}

customElements.define("resource-upload-component", ResourceUploadComponent);
export default ResourceUploadComponent;