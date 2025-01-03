import { theme } from "../Common/Constants/Theme.js";
import { getUser } from "../Common/Globals.js";
import DatabaseConnector from "../Database/DatabaseConnector.js";
import ResourceViewScreen from "../Pages/ResourceViewScreen.js";
class NotebookDisplayComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.justifyContent = "space-evenly";
        this.style.alignItems = "center";
        this.style.padding = "5px";
        this.style.backgroundColor = theme.secondaryBackgroundColor;
        this.style.cursor = "pointer";

        const isSubscribed =  this.getAttribute("is-subscribed") == "true";

        this.innerHTML = `
            <div style="flex:1;" class="notebook-name">${this.getAttribute("name")}</div>
            <div style="flex:1;" class="notebook-subject">${this.getAttribute("subject")}</div>
            <div style="flex:1;" class="notebook-last-modified">${this.getAttribute("last-modified")}</div>
            <button style="flex:1;" class="subscribe-button">${isSubscribed ? "Unsubscribe" : "Subscribe"}</button>
        `;
        
        const subscribeButton = this.querySelector(".subscribe-button");
        
        const checkIsSubscribed = () => this.getAttribute("is-subscribed") == "true";

        subscribeButton.addEventListener("click", async (event)=>
        {
            console.log("Subscribe button clicked");

            const user = getUser();
            const bSubscribed = checkIsSubscribed();

            if(!bSubscribed)
            {
                const subscribeQuery = `INSERT INTO subscribed VALUES ('${user.email}', '${this.getAttribute("notebook-id")}');`;
                await DatabaseConnector.executeQuery(subscribeQuery);

                this.setAttribute("is-subscribed", "true");
                subscribeButton.innerText = "Unsubscribe";
            }
            else
            {
                const unsubscribeQuery = `DELETE FROM subscribed WHERE email='${user.email}' AND notebook_id='${this.getAttribute("notebook-id")}';`;
                await DatabaseConnector.executeQuery(unsubscribeQuery);
                this.setAttribute("is-subscribed", "false");
                subscribeButton.innerText = "Subscribe";
            }
        });

        this.addEventListener("dblclick", (event)=>
        {
            window.openPage("resource-view-screen",[["notebook-name", this.getAttribute("name")], ["notebook-id", this.getAttribute("notebook-id")]]);
        });
    }
}

customElements.define("notebook-display-component", NotebookDisplayComponent);
export default NotebookDisplayComponent;

