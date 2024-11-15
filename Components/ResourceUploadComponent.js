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
        
        this.innerHTML = `
            <div class="resource-upload-form">
                <div style="flex:1;width:100%;">Name:</div>
                <input type="text" class="name-input" placeholder="Enter name...">

                <div style="flex:1;width:100%;">Subject:</div>
                <input type="text" class="subject-input" placeholder="Enter subject...">

                <div style="flex:1;width:100%;">Notebook:</div>
                <input type="text" class="notebook-input" placeholder="Enter notebook name...">

                <div style="flex:1;width:100%;">File:</div>
                <input type="text" class="file-name-display" placeholder="Please upload a file..." readonly>
                <button class="upload-button" style="width: 50%;">Upload</button>
                <input type="file" class="file-input" placeholder="Enter file...">
            </div>

        `;

        const resourceUploadForm = this.querySelector(".resource-upload-form");
        const fileInput = this.querySelector(".file-input");
        const uploadButton = this.querySelector(".upload-button");

        resourceUploadForm.style.display = "flex";
        resourceUploadForm.style.flexDirection = "column";
        resourceUploadForm.style.justifyContent = "space-evenly";
        resourceUploadForm.style.alignItems = "center";

        fileInput.style.display = "none";

        fileInput.addEventListener("change", ()=>
        {
            this.querySelector(".file-name-display").value = fileInput.files[0].name;
        });
        
        uploadButton.addEventListener("click", ()=>
        {
            fileInput.click();
        });
    }
}

customElements.define("resource-upload-component", ResourceUploadComponent);
export default ResourceUploadComponent;