import { theme } from '../Common/Constants/Theme.js';
import { logout } from '../Common/Globals.js';

class HeaderComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    showBackButton()
    {
        this.backButton.style.display = "inline-block";
    }

    hideBackButton()
    {
        this.backButton.style.display = "none";
    }

    showLogoutButton()
    {
        this.logoutButton.style.display = "inline-block";
    }
    hideLogoutButton()
    {
        this.logoutButton.style.display = "none";
    }
    connectedCallback()
    {
        
        this.innerHTML = `

            <button class="back-button">Back</button>
            <button class="logout-button" style="display: none;">Logout</button>
                   
        `;
        this.backButton = this.querySelector(".back-button");
        this.logoutButton = this.querySelector(".logout-button");

        this.logoutButton.addEventListener("click", (event)=>
        {
            logout();
        });

        const style = document.createElement('style');
        style.textContent =
        `            

            .back-button:hover
            {
                cursor: pointer;
                border: 2px solid rgb(0, 136, 255);           
            }

            .back-button
            {
                position: fixed;
                left: 5%;
                top: 5%;
                color: white;
                border: solid white 2px;
            } 
                
             .logout-button:hover
            {
                cursor: pointer;
                border: 2px solid rgb(0, 136, 255);           
            }

            .logout-button
            {
                position: fixed;
                right: 5%;
                top: 5%;
                color: white;
                border: solid white 2px;
            } 
        `;

        this.backButton.onclick = ()=>{ window.goBack(); };
        
        this.backButton.style.fontSize = `${theme.mediumFontSize}`;
        
        

        document.body.appendChild(this.backButton);
        document.body.appendChild(style);
    }
}

customElements.define("header-component", HeaderComponent);
export default HeaderComponent;