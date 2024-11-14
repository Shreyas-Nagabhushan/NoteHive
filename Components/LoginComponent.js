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
            <button style="width:50%;margin:10px;">Login</button>  
        `;

    }
}

customElements.define("login-component", LoginComponent);
export default LoginComponent;