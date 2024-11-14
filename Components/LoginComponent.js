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

        this.innerHTML =`
            <div class="login-heading">Login</div>
            <div class="login-form">
                <div style="flex:1;width:100%;">Email:</div>
                <input type="text" class="email-input" placeholder="Enter email...">
                <div style="flex:1;width:100%;">Password:</div>
                <input type="password" class="password-input" placeholder="Enter password...">
                <button>Login</button>
            </div>    
        `;

        const loginHeading = this.querySelector(".login-heading");
        const loginForm = this.querySelector(".login-form");

        loginForm.style.display = "flex";
        loginForm.style.flexDirection = "column";
        loginForm.style.justifyContent = "space-evenly";
        loginForm.style.alignItems = "center";
    }
}

customElements.define("login-component", LoginComponent);
export default LoginComponent;