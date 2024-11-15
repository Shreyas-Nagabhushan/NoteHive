class MyNotebooksScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            <div style="font-size: 50px;margin:20px;">My Notebooks</div>
            <notebook-browser></notebook-browser>
        `;
    }
}

customElements.define("my-notebooks-screen", MyNotebooksScreen);
export default MyNotebooksScreen;