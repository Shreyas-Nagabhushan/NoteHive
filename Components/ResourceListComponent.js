import { initializeStyles } from "../Common/InitializeStyles.js";
import DatabaseConnector from "../Database/DatabaseConnector.js";
import ResourceDisplayComponent from "./ResourceDisplayComponent.js";

class ResourceListComponent extends HTMLElement
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

        this.innerHTML = `
            <div class="notebook-name-heading">${this.getAttribute("notebook-name")}</div>
            <div class="resource-list">

            </div>
        `;

        console.log("Notebook id: " + this.getAttribute("notebook-id"));
        const resourceList = this.querySelector(".resource-list");
        const resourcesQuery = `SELECT * FROM resource WHERE notebook_id = ${this.getAttribute("notebook-id")}`;

       resourceList.style.display = "flex";
       resourceList.style.flex = "1";
       resourceList.style.flexDirection = "column";
       resourceList.style.overflowY = "scroll";
       resourceList.style.width = "100%";
       resourceList.style.height = "50vh";
       resourceList.style.border = "solid white 2px";
       resourceList.style.borderRadius = "5px";

        DatabaseConnector.executeQuery(resourcesQuery).then((result)=>
        {
            resourceList.innerHTML = "";

            for(let i = 0; i < result.rows.length; i++)
            {
                const resource = result.rows[i];
                
                const resourceDisplayComponent = document.createElement("resource-display-component");
                resourceDisplayComponent.setAttribute("notebook-id", this.getAttribute("notebook-id"))
                resourceDisplayComponent.setAttribute("file-name", resource.filename);
                resourceList.appendChild(resourceDisplayComponent);
            }

            initializeStyles();
        });
    }
}

customElements.define("resource-list-component", ResourceListComponent);
export default ResourceListComponent;