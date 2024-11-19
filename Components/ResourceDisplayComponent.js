import { roles } from "../Common/Constants/Roles.js";
import { theme } from "../Common/Constants/Theme.js";
import { getUser } from "../Common/Globals.js";
import User from "../Common/User.js";
import DatabaseConnector from "../Database/DatabaseConnector.js";

class ResourceDisplayComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.justifyContent = "space-evenly";
        this.style.alignItems = "center";
        this.style.padding = "5px";
        this.style.backgroundColor = theme.secondaryBackgroundColor;

        this.innerHTML = `
            <div class="file-name">${this.getAttribute("file-name")}</div>
            <button class="download-button">Download</button>
            <button class="delete-button">Delete</button>
        `;

        const downloadButton = this.querySelector(".download-button");
        const deleteButton = this.querySelector(".delete-button");

        downloadButton.addEventListener("click", async (event)=>
        {
            await DatabaseConnector.connect();
            const getDataQuery = `SELECT data FROM resource WHERE notebook_id = ? AND filename = ?`;
            const [rows,] = await DatabaseConnector.connection.execute(getDataQuery , [this.getAttribute("notebook-id"), this.getAttribute("file-name")]);
            const data = rows[0].data;
            await DatabaseConnector.disconnect();

            const blob = new Blob([data], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = this.getAttribute("file-name");
            link.click();

        });

        deleteButton.addEventListener("click", async (event)=>
        {
            const role = await getUser().getRole();

            if(role >= roles.TEACHER)
            {
                await DatabaseConnector.connect();
                const deleteQuery = `DELETE FROM resource WHERE notebook_id = ? AND filename = ?`;
                await DatabaseConnector.connection.execute(deleteQuery , [this.getAttribute("notebook-id"), this.getAttribute("file-name")]);
                await DatabaseConnector.disconnect();
                
                this.remove();
            }
            else
            {
                //TODO: Alert!
            }
        });
    }
}

customElements.define("resource-display-component", ResourceDisplayComponent);
export default ResourceDisplayComponent;