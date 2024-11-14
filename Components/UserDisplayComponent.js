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
            <div class="email-column" style={flex: 5;}>${this.getAttribute("email")}</div>
            <div class="role-column" style={flex: 2.5;}>${this.getAttribute("role")}</div>
            <button class="modify-user-button" style={flex: 2.5;}>Modify</button>
        `;
    }
}

customElements.define("user-display-component", UserDisplayComponent);
export default UserDisplayComponent;