import ResourceListComponent from "../Components/ResourceListComponent.js";
class ResourceViewScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";

        this.innerHTML = `
            <div style="font-size: 50px;margin:20px;">Resource View</div>
            <resource-list-component notebook-name="${this.getAttribute("notebook-name")}" notebook-id="${this.getAttribute("notebook-id")}"></resource-list-component>
        `;
    }
}

customElements.define("resource-view-screen", ResourceViewScreen);
export default ResourceViewScreen;