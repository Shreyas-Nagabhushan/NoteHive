import DatabaseConnector from "../Database/DatabaseConnector.js";
import NotebookDisplayComponent from "./NotebookDisplayComponent.js";

class ResourceBrowser extends HTMLElement
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {
        this.style.display = "flex";
        this.style.flexDirection = "column";

        this.innerHTML = 
        `
            <div class="resource-browser-heading">Resource Browser</div>

            <input type="text" class="resource-browser-search" placeholder="Search...">
            <div class="resource-browser-list">

            </div>
        `;
         
        const searchBox = this.querySelector(".resource-browser-search");
        const resourceBrowserList = this.querySelector(".resource-browser-list");

        resourceBrowserList.style.display = "flex";
        resourceBrowserList.style.flex = "1";
        resourceBrowserList.style.flexDirection = "column";
        resourceBrowserList.style.overflowY = "scroll";

        searchBox.addEventListener("input", async(event) =>
        {
            resourceBrowserList.innerHTML = ""; 

            const searchValue = event.target.value.toLowerCase();
            const query = `SELECT * FROM notebook where name LIKE '%${searchValue}%' OR subject LIKE '%${searchValue}%';`;
            const result = await DatabaseConnector.executeQuery(query);

            for(let i = 0; i < result.rows.length; i++)
            {
                const notebookDisplay = document.createElement("notebook-display-component");
                notebookDisplay.setAttribute("name", result.rows[i].name);
                notebookDisplay.setAttribute("subject", result.rows[i].subject);
                notebookDisplay.setAttribute("last-modified", result.rows[i].last_modified);
                resourceBrowserList.appendChild(notebookDisplay);
            }

        });
    }
}

customElements.define("resource-browser", ResourceBrowser);
export default ResourceBrowser;