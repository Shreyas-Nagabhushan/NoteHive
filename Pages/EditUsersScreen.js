import { theme } from "../Common/Constants/Theme.js";
import { getUser } from "../Common/Globals.js";
import UserListComponent from "../Components/UserListComponent.js";
import DatabaseConnector from "../Database/DatabaseConnector.js";

class EditUsersScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    async connectedCallback()
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
        const currentUser = getUser();
        const currentUserEmail = currentUser.email;

        const query = `SELECT * from users where institute_id = (select institute_id from users where email = '${currentUserEmail}')};`;
        const result = DatabaseConnector.executeQuery(query).then((result) => 
        {
            const numberOfUsers = result.rows.length;
            for(let i = 0; i < numberOfUsers; i++)
            {
                const user = result.rows[i];

                const email = user.email;
                const role = user.role;
                const name = user.name;

                const userDisplayComponent = document.createElement("user-display-component");

                userDisplayComponent.setAttribute("name", name);
                userDisplayComponent.setAttribute("email", email);
                userDisplayComponent.setAttribute("role", role);
                userListComponent.appendChild(userDisplayComponent);
            }
        });

    }
}

customElements.define("edit-users-screen", EditUsersScreen);
export default EditUsersScreen;