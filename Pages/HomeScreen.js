import { roles } from "../Common/Constants/Roles.js";
import { theme } from "../Common/Constants/Theme.js";
import { getUser } from "../Common/Globals.js";
import EditUsersScreen from "./EditUsersScreen.js";
import ResourceUploadScreen from "./ResourceUploadScreen.js";
import NotebookBrowserScreen from "./NotebookBrowserScreen.js";
import MyNotebooksScreen from "./MyNotebooksScreen.js";
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

        openNotebookButton.addEventListener("click", (event) =>
        {
            window.openPage("my-notebooks-screen");
        });
        
        this.appendChild(openNotebookButton);

        getUser().getRole().then((role)=>
        {
            if(role >= roles.INSTITUTE_ADMIN)
            {
                const editUsersButton = document.createElement("button");
                editUsersButton.innerText = "Edit Users";

                editUsersButton.addEventListener("click", (event) => 
                {
                    window.openPage("edit-users-screen");
                });

                this.appendChild(editUsersButton);
            }
            if(role >= roles.TEACHER)
            {
                const uploadResourceButton = document.createElement("button");
                uploadResourceButton.innerText = "Upload Resource";

                uploadResourceButton.addEventListener("click", (event) => 
                {
                    window.openPage("resource-upload-screen");
                });

                this.appendChild(uploadResourceButton);
            }
            if(role >= roles.STUDENT)
            {
                const browseResourceButton = document.createElement("button");
                browseResourceButton.innerText = "Browse Resources";

                browseResourceButton.addEventListener("click", (event) => 
                {
                    window.openPage("notebook-browser-screen");
                });

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
        });





    }

}

customElements.define("home-screen", HomeScreen);
export default HomeScreen;