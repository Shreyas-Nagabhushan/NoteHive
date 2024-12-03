import { roles, rolesDisplayNames } from "../Common/Constants/Roles.js";
import { theme } from "../Common/Constants/Theme.js";
import { createAlert, login } from "../Common/Globals.js";
import addNewUser from "../Database/UtilityFunctions.js";
import HomeScreen from "../Pages/HomeScreen.js";

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
                select
                {
                    margin: 10px;
                    font-size: 20px;
                    background-color: ${theme.secondaryBackgroundColor};
                    color: ${theme.foregroundColor};
                    padding:5px;
                    border: solid white 2px;
                    border-radius: 5px;
                }
            </style>
            <div class="signup-form">
                <div class="label">Name:</div>
                <input type="text" class="name-input" placeholder="Enter name...">

                <div class="label">Email:</div>
                <input type="text" class="email-input" placeholder="Enter email...">

                <div class="label">Password:</div>
                <input type="password" class="password-input" placeholder="Enter password...">

                <div class="label">Confirm Password:</div>
                <input type="password" class="confirm-password-input" placeholder="Re-enter password...">

                <div class="label">Institute:</div>
                <input type="text" class="institute-input" placeholder="Enter institute...">

                <div class="label">Role:</div>
                <select class="role-selector"></select>

                <button class="submit-button" style="width:50%;margin:10px;">Submit</button>
            </div>    
        `;

        const signUpForm = this.querySelector(".signup-form");
        const submitButton = this.querySelector(".submit-button");

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

        submitButton.addEventListener("click", async ()=>
        {
            const name = this.querySelector(".name-input").value;
            const email = this.querySelector(".email-input").value;
            const password = this.querySelector(".password-input").value;
            const confirmPassword = this.querySelector(".confirm-password-input").value;
            const institute = this.querySelector(".institute-input").value;
            const role = this.querySelector(".role-selector").value;


            const userInfo = {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                institute: institute,
                role: role
            }

            const bIsUserAdded = await addNewUser(userInfo);

            if(bIsUserAdded)
            {
                console.log("User added");
                await login(userInfo);
                window.clearAndOpenPage("home-screen");
            }
            else
            {
                createAlert("Invalid user details!");
                console.log("User not added");
            }
        });
    }
}

customElements.define("signup-component", SignupComponent);
export default SignupComponent;