import ResourceUploadComponent from "../Components/ResourceUploadComponent.js";

class ResourceUploadScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            <div style="font-size: 50px;margin:20px;">Resource Upload</div>
            <resource-upload-component></resource-upload-component>            
        `;
    }
}

customElements.define("resource-upload-screen", ResourceUploadScreen);
export default ResourceUploadScreen;