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
        const isSubscribed =  this.getAttribute("is-subscribed") == true;

        this.innerHTML = `
            <div class="notebook-name">${this.getAttribute("name")}</div>
            <div class="notebook-subject">${this.getAttribute("subject")}</div>
            <div class="notebook-last-modified">${this.getAttribute("last-modified")}</div>
            <button class="subscribe-button">${isSubscribed ? "Unsubscribe" : "Subscribe"}</button>
        `;
        
        const subscribeButton = this.querySelector(".subscribe-button");
        subscribeButton.addEventListener("click", (event)=>
        {
            
        });
    }
}

customElements.define("notebook-display-component", NotebookDisplayComponent);
export default NotebookDisplayComponent;

