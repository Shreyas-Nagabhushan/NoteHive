import { roles, rolesDisplayNames } from "../Common/Constants/Roles.js";
import { theme } from "../Common/Constants/Theme.js";
import DatabaseConnector from "../Database/DatabaseConnector.js";

class UserDisplayComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.backgroundColor = theme.primaryBackgroundColor;
        this.style.border = "solid white 2px";
        this.style.borderRadius = "5px";
        this.style.color = "white";
        this.style.width = "100%";
        this.style.padding = "10px";
        this.style.boxSizing = "border-box";

        this.innerHTML = `
            <div class="name-column" style="flex: 2.5; margin: 5px;">${this.getAttribute("name")}</div>
            <div class="email-column" style="flex: 2.5; margin: 5px;">${this.getAttribute("email")}</div>
            <select class="role-selector" style="flex: 2.5;margin: 5px;"></select>
            <button class="remove-user-button" style="flex: 2.5;margin: 5px;">Remove</button>
        `;

        const roleSelector = this.querySelector(".role-selector");
        const removeUserButton = this.querySelector(".remove-user-button");

        roleSelector.style.width = "100%";
        
        for(const role in roles)
        {
            const roleValue = roles[role];
            const roleDisplayName = rolesDisplayNames[roleValue];
            const optionElement = document.createElement("option");
            optionElement.value = roleValue;
            optionElement.text = roleDisplayName;
            roleSelector.appendChild(optionElement);
        }

        roleSelector.value = parseInt(this.getAttribute("role"));

        removeUserButton.addEventListener("click", async(event)=>
        {
            const query = `delete from user where email = '${this.getAttribute("email")}';`;
            await DatabaseConnector.executeQuery(query);
            this.remove();
        });

        roleSelector.addEventListener("change", async(event)=>
        {
            const query = `update user set role = ${roleSelector.value} where email = '${this.getAttribute("email")}';`;;
            await DatabaseConnector.executeQuery(query);
        });
    }
}

customElements.define("user-display-component", UserDisplayComponent);
export default UserDisplayComponent;