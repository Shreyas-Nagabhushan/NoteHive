import { roles, rolesDisplayNames } from "../Common/Constants/Roles.js";
import { theme } from "../Common/Constants/Theme.js";

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
            <div class="email-column" style="flex: 5; margin: 5px;">${this.getAttribute("email")}</div>
            <select class="role-selector" style="flex: 2.5;margin: 5px;"></select>
            <button class="remove-user-button" style="flex: 2.5;margin: 5px;">Remove</button>
        `;

        const roleSelector = this.querySelector(".role-selector");
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
    }
}

customElements.define("user-display-component", UserDisplayComponent);
export default UserDisplayComponent;