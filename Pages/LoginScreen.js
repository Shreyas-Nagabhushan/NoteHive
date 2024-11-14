import LoginComponent from "../Components/LoginComponent.js";

class LoginScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";

        this.innerHTML = `
            <div style="font-size: 50px;margin:20px;">Login</div>
            <login-component></login-component>
        `;
    }
}

customElements.define("login-screen", LoginScreen);
export default LoginScreen;