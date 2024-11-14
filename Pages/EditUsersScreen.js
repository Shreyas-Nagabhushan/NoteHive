import { theme } from "../Common/Constants/Theme.js";
import UserListComponent from "../Components/UserListComponent.js";

class EditUsersScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.backgroundColor = theme.primaryBackgroundColor;
        this.style.display = "flex";
        this.style.flex = 1;
        this.style.height = "100%";
        this.style.width = "100%";
        this.style.flexDirection = "row";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";

        this.innerHTML = `
            <div class="user-list-container">

            </div>
        `;

        const userListContainer = this.querySelector(".user-list-container");
        userListContainer.style.display = "flex";
        userListContainer.style.flexDirection = "row";
        userListContainer.style.width = "75%";
        userListContainer.style.height = "80%";
        userListContainer.style.backgroundColor = "red";

        const userListComponent = document.createElement("user-list-component");
        userListContainer.appendChild(userListComponent);

        //Display all users 

    }

    getAllUsers()
    {
        
    }
}

customElements.define("edit-users-screen", EditUsersScreen);
export default EditUsersScreen;