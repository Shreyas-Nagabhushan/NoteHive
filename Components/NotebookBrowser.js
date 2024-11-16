import { getUser } from "../Common/Globals.js";
import DatabaseConnector from "../Database/DatabaseConnector.js";
import NotebookDisplayComponent from "./NotebookDisplayComponent.js";

class NotebookBrowser extends HTMLElement
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

        this.innerHTML = 
        `
            <div class="notebook-browser-heading">Notebook Browser</div>

            <input type="text" class="notebook-browser-search" placeholder="Search...">
            <div class="notebook-browser-list">

            </div>
        `;
         
        const searchBox = this.querySelector(".notebook-browser-search");
        const notebookBrowserList = this.querySelector(".notebook-browser-list");

        notebookBrowserList.style.display = "flex";
        notebookBrowserList.style.flex = "1";
        notebookBrowserList.style.flexDirection = "column";
        notebookBrowserList.style.overflowY = "scroll";
        notebookBrowserList.style.width = "100%";
        notebookBrowserList.style.height = "100%";

        searchBox.addEventListener("input", async(event) =>
        {
            notebookBrowserList.innerHTML = ""; 

            const searchValue = event.target.value.toLowerCase();
            const query = `SELECT * FROM notebook where name LIKE '%${searchValue}%' OR subject_id in (SELECT id FROM subject WHERE name LIKE '%${searchValue}%');`;
            const result = await DatabaseConnector.executeQuery(query);

            for(let i = 0; i < result.rows.length; i++)
            {
                const notebookDisplay = document.createElement("notebook-display-component");
                notebookDisplay.setAttribute("name", result.rows[i].name);
                const subjectNameQuery = `SELECT name from subject where id=${result.rows[i].subject_id};`;
                const subjectNameResult = await DatabaseConnector.executeQuery(subjectNameQuery);
                notebookDisplay.setAttribute("subject", subjectNameResult.rows[0].name);
                notebookDisplay.setAttribute("last-modified", result.rows[i].last_modified);

                // const user = getUser();
                // const subscribedQuery = `SELECT COUNT(*) from subscribed where email=${user.email} AND notebook_id=${result.rows[i].id};`;
                // const isSubscribed = await DatabaseConnector.executeQuery(subscribedQuery);

                notebookDisplay.setAttribute("is-subscribed", isSubscribed);
                notebookBrowserList.appendChild(notebookDisplay);
            }

        });
    }
}

customElements.define("notebook-browser", NotebookBrowser);
export default NotebookBrowser;