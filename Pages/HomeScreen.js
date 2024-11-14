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
        this.style.display = "flex";
        this.style.flex = 1;
        this.style.flexDirection = "row";
        this.style.alignItems = "center";
        this.style.justifyContents = "space-evenly";
        this.style.width = "100%";
        this.style.height = "100%";

        const openNotebookButton = document.createElement("button");
        openNotebookButton.innerText = "Open a Notebook";
        this.appendChild(openNotebookButton);

        if(true)
        {
            const editUsersButton = document.createElement("button");
            editUsersButton.innerText = "Edit Users";
            editUsersButton.addEventListener("click", (event) => 
            {
                //Navigate to EditUsersScreen
            });
            this.appendChild(editUsersButton);
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
            browseResourceButton.innerText = "Browse Resources";
            this.appendChild(browseResourceButton);
        }

        this.querySelectorAll("button").forEach((button)=>
        {
            button.style.flex = 1;
            button.style.backgroundColor = theme.primaryBackgroundColor;
            button.style.border = "solid white 2px";
            button.style.color = "white";
            button.style.cursor = "pointer";
            button.style.borderRadius = "5px";
            button.style.padding = "5px";
            button.style.margin = "10px";
        });


    }

}

customElements.define("home-screen", HomeScreen);
export default HomeScreen;