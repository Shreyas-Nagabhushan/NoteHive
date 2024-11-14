import LoginScreen from "./LoginScreen.js";
import SignupScreen from "./SignupScreen.js";

class LoginSignupScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.justifyContent = "space-evenly";
        this.style.alignItems = "center";

        this.innerHTML = `
            <div class="login-signup-heading">Login or Sign Up</div>
            <button class="login-button">Login</button>
            <button class="signup-button">Signup</button>
        `;

        const loginButton = this.querySelector(".login-button");
        const signupButton = this.querySelector(".signup-button");

        loginButton.addEventListener("click", (event)=>
        {
            window.openPage("login-screen");
        });

        signupButton.addEventListener("click", (event)=>
        {
            window.openPage("signup-screen");
        });
    }
}

customElements.define("login-signup-screen", LoginSignupScreen);
export default LoginSignupScreen;