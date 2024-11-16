import { login } from "../Common/Globals.js";

class LoginComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.alignItems = "center";
        this.style.justifyContent = "space-evenly";
        this.style.border = "solid white 3px";
        this.style.borderRadius = "10px";
        this.style.padding = "10px";
        this.style.border = "solid white 3px";
        this.style.borderRadius = "10px";
        this.style.padding = "10px";

        this.innerHTML =`
            <style>
                .label
                {
                    flex:1;
                    width:100%;
                    text-align: left;
                    font-size: 18px;
                }
                input
                {
                    margin: 10px;
                }
                </style>
            <div class="label">Email:</div>
            <input type="text" class="email-input" placeholder="Enter email...">
            <div class="label">Password:</div>
            <input type="password" class="password-input" placeholder="Enter password...">
            <button class="login-button" style="width:50%;margin:10px;">Login</button>  
        `;

        const emailInput = this.querySelector(".email-input");
        const passwordInput = this.querySelector(".password-input");
        const loginButton = this.querySelector(".login-button");

        loginButton.addEventListener("click", async() => {
            const email = emailInput.value;
            const password = passwordInput.value;

            if(!email || !password)
            {
                console.log("Please enter email and password");
                return;
            }

            const userInfo = { email: email, password: password };
            const bUserLoggedIn = await login(userInfo);

            if(bUserLoggedIn)
            {
                window.openPage("home-screen");
            }
            else
            {
                console.log("Login failed");
            }
        });

    }
}

customElements.define("login-component", LoginComponent);
export default LoginComponent;