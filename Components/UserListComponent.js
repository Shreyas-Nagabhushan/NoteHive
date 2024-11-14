import { theme } from "../Common/Constants/Theme.js";

class UserListComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.backgroundColor = theme.primaryBackgroundColor;
        this.style.border = "solid white 2px";
        this.style.borderRadius = "5px";
        this.style.color = "white";
        this.style.width = "100%";
        this.style.height = "100%";
        this.style.padding = "10px";
        this.style.boxSizing = "border-box";


    }
}

customElements.define("user-list-component", UserListComponent);
export default UserListComponent;