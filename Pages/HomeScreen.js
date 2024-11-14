import { theme } from "../Common/Constants/Theme.js";

class HomeScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            
        `;

        this.style.backgroundColor = theme.primaryBackgroundColor;
        this.style.width = "100%";
        this.style.height = "100%";

        const openNotebookButton = document.createElement("button");
        openNotebookButton.innerText = "Open a Notebook";
        this.appendChild(openNotebookButton);

        if(true)
        {
            const addUsersButton = document.createElement("button");
            addUsersButton.innerText = "Add Users";
            this.appendChild(addUsersButton);
        }

        if(true)
        {
            const uploadResourceButton = document.createElement("button");
            uploadResourceButton.innerText = "Upload Resource";
            this.appendChild(uploadResourceButton);
        }

        if(true)
        {
            const browseResourceButton = document.createElement("button");
            browseResourceButton.innerText = "Browse Resource Button";
            this.appendChild(browseResourceButton);
        }


    }

}

customElements.define("home-screen", HomeScreen);
export default HomeScreen;