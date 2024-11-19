import { getUser } from "../Common/Globals.js";
import DatabaseConnector from "../Database/DatabaseConnector.js";
import NotebookDisplayComponent from "./NotebookDisplayComponent.js";
import { initializeStyles } from "../Common/InitializeStyles.js";
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
        const isMyNotebooksPage = this.getAttribute("is-my-notebooks-page") === "true";

        this.innerHTML = 
        `
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
        notebookBrowserList.style.height = "50vh";
        notebookBrowserList.style.border = "solid white 2px";
        notebookBrowserList.style.borderRadius = "5px";

        searchBox.addEventListener("input", async(event) =>
        {   
            notebookBrowserList.innerHTML = ""; 

            const searchValue = event.target.value.toLowerCase();
            const query = isMyNotebooksPage ? `
                SELECT * from notebook 
                where id in 
                (SELECT notebook_id from subscribed where email='${getUser().email}');
            `:
            `
                SELECT * 
                FROM notebook where name LIKE '%${searchValue}%' 
                OR subject_id in (SELECT id FROM subject WHERE name LIKE '%${searchValue}%');
            `
            ;
        
            const result = await DatabaseConnector.executeQuery(query);

            for(let i = 0; i < result.rows.length; i++)
            {
                const notebookDisplay = document.createElement("notebook-display-component");
                notebookDisplay.setAttribute("name", result.rows[i].name);
                const subjectNameQuery = `SELECT name from subject where id=${result.rows[i].subject_id};`;
                const subjectNameResult = await DatabaseConnector.executeQuery(subjectNameQuery);
                notebookDisplay.setAttribute("subject", subjectNameResult.rows[0].name);
                notebookDisplay.setAttribute("last-modified", result.rows[i].last_modified);
                notebookDisplay.setAttribute("notebook-id", result.rows[i].id);

                const user = getUser();
                const subscribedQuery = `SELECT COUNT(*) AS count from subscribed where email='${user.email}' AND notebook_id=${result.rows[i].id};`;
                const isSubscribed = await DatabaseConnector.executeQuery(subscribedQuery);

                notebookDisplay.setAttribute("is-subscribed", isSubscribed.rows[0].count ? "true" : "false");
                notebookBrowserList.appendChild(notebookDisplay);
            }

            initializeStyles();
        });

        searchBox.dispatchEvent(new CustomEvent('input'));

    }
}

customElements.define("notebook-browser", NotebookBrowser);
export default NotebookBrowser;