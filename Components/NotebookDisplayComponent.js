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


        this.innerHTML = `
            <div class="notebook-name">${this.getAttribute("name")}</div>
            <div class="notebook-subject">${this.getAttribute("subject")}</div>
            <div class="notebook-last-modified">${this.getAttribute("last-modified")}</div>
            <button class="open-button">Subscribe</button>
        `;     
    }
}

customElements.define("notebook-display-component", NotebookDisplayComponent);
export default NotebookDisplayComponent;

