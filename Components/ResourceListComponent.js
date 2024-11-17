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
        

        this.innerHTML = `
            <div class="notebook-name-heading">${this.getAttribute("notebook-name")}</div>
            <div class="resource-list">
            </div>
        `;

        console.log("Notebook id: " + this.getAttribute("notebook-id"));
        const resourceList = this.querySelector(".resource-list");
        const resourcesQuery = `SELECT * FROM resource WHERE notebook_id = ${this.getAttribute("notebook-id")}`;

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
        });
    }
}

customElements.define("resource-list-component", ResourceListComponent);
export default ResourceListComponent;