import { initializeStyles } from "../Common/InitializeStyles.js";
import NotebookBrowser from "../Components/NotebookBrowser.js";
class MyNotebooksScreen extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.justifyContent = "space-evenly";
        this.style.alignItems = "center";
        
        this.innerHTML = `
            <div style="font-size: 50px;margin:20px;">My Notebooks</div>
            <notebook-browser style="flex:1;width:90%;" is-my-notebooks-page="true"></notebook-browser>
        `;

        initializeStyles();
    }
}

customElements.define("my-notebooks-screen", MyNotebooksScreen);
export default MyNotebooksScreen;