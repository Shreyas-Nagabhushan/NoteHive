import { initializeStyles } from "../Common/InitializeStyles.js";
import NotebookBrowser from "../Components/NotebookBrowser.js";

class NotebookBrowserScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";


        this.innerHTML = `
            <div style="font-size: 50px;margin:20px;">Notebook Browser</div>
            <notebook-browser style="flex:1;width:90%;"></notebook-browser>
        `;

        initializeStyles();
    }
}

customElements.define("notebook-browser-screen", NotebookBrowserScreen);
export default NotebookBrowserScreen;