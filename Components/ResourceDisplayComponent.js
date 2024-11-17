import DatabaseConnector from "../Database/DatabaseConnector.js";

class ResourceDisplayComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            <div class="file-name">${this.getAttribute("file-name")}</div>
            <button class="download-button">Download</button>
        `;

        const downloadButton = this.querySelector(".download-button");

        downloadButton.addEventListener("click", async (event)=>
        {
            await DatabaseConnector.connect();
            const getDataQuery = `SELECT data FROM resource WHERE notebook_id = ? AND filename = ?`;
            const [rows,] = await DatabaseConnector.connection.execute( getDataQuery , [this.getAttribute("notebook-id"), this.getAttribute("file-name")]);
            const data = rows[0].data;
            await DatabaseConnector.disconnect();

            const blob = new Blob([data], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = this.getAttribute("file-name");
            link.click();

        });
    }
}

customElements.define("resource-display-component", ResourceDisplayComponent);
export default ResourceDisplayComponent;