import { roles, rolesDisplayNames } from "../Common/Constants/Roles.js";

class SignupComponent extends HTMLElement
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
            <div class="signup-heading">Create Account</div>
            <div class="signup-form">
                <div style="flex:1;width:100%;">Email:</div>
                <input type="text" class="email-input" placeholder="Enter email...">

                <div style="flex:1;width:100%;">Password:</div>
                <input type="password" class="password-input" placeholder="Enter password...">

                <div style="flex:1;width:100%;">Confirm Password:</div>
                <input type="password" class="password-input" placeholder="Re-enter password...">

                <div style="flex:1;width:100%;">Role:</div>
                <select class="role-selector"></select>

                <button>Submit</button>
            </div>    
        `;

        const signUpForm = this.querySelector(".signup-form");

        signUpForm.style.display = "flex";
        signUpForm.style.flexDirection = "column";
        signUpForm.style.justifyContent = "space-evenly";
        signUpForm.style.alignItems = "center";

        const roleSelector = this.querySelector(".role-selector");
        roleSelector.style.width = "100%";

        for(const role in roles)
        {
            const roleValue = roles[role];
            const displayName = rolesDisplayNames[roleValue];

            const option = document.createElement("option");
            option.text = displayName;
            option.value = roleValue;
            roleSelector.appendChild(option);
        }
    }
}

customElements.define("signup-component", SignupComponent);
export default SignupComponent;