import SignupComponent from "../Components/SignupComponent.js";

class SignupScreen extends HTMLElement
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
            <div style="font-size: 50px;margin:20px;">Create Account</div>
            <signup-component></signup-component>
        `;
    }
}

customElements.define("signup-screen", SignupScreen);
export default SignupScreen;