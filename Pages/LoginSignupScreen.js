import { theme } from "../Common/Constants/Theme.js";
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
        const loginSignupHeading = this.querySelector(".login-signup-heading");

        loginButton.addEventListener("click", (event)=>
        {
            window.openPage("login-screen");
        });

        signupButton.addEventListener("click", (event)=>
        {
            window.openPage("signup-screen");
        });

        
        const loginSignupHeadingStyle = 
        {
            fontSize: theme.largeFontSize,
            color: theme.foregroundColor,
            textAlign: "center",
            width: "100%"
        }
        
        Object.assign(loginSignupHeading.style, loginSignupHeadingStyle);

        this.querySelectorAll("button").forEach((button)=>
        {
            button.style.backgroundColor = theme.secondaryBackgroundColor;
            button.style.border = "solid white 2px";
            button.style.color = theme.foregroundColor;
            button.style.padding = "10px";
            button.style.width = "25%";
            button.style.borderRadius = "10px";
            button.style.fontSize = theme.largeFontSize;
        });
    }
}

customElements.define("login-signup-screen", LoginSignupScreen);
export default LoginSignupScreen;