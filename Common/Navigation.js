import { initializeStyles } from "./InitializeStyles.js";

window.navigationStack = [];
window.navigationStackPointer = -1;

window.openPage = (pageName, attributeArray = [])=>
{
    const pageContentDiv = document.body;
    const newPage = document.createElement(pageName);
    
    for(let i = 0; i < attributeArray.length; i += 1)
    {
        newPage.setAttribute(attributeArray[i][0], attributeArray[i][1]);    
    }

    if(newPage.initialize)
    {
        newPage.initialize();
    }   

    window.navigationStack.forEach((page)=>{ page.style.display = "none";});

    newPage.style.display = "flex";
    newPage.style.flexDirection = "column";
    newPage.style.height = "100%";
    
    pageContentDiv.appendChild(newPage);

    window.navigationStack.length = window.navigationStackPointer + 1;

    window.navigationStack.push(newPage);
    window.navigationStackPointer++;

    const headerComponent = document.querySelector('header-component');
    
    if(window.navigationStackPointer <= 0)
    {
        headerComponent.hideBackButton();
    }
    else
    {
        headerComponent.showBackButton();
    }

    initializeStyles();

}

window.goBack = ()=>
{
    if(window.navigationStackPointer !== -1)
    {
        window.navigationStack[window.navigationStackPointer].style.display = "none";
        window.navigationStackPointer--;
        window.navigationStack[window.navigationStackPointer].style.display = "flex";
    }

    const headerComponent = document.querySelector('header-component');
    if(window.navigationStackPointer <= 0)
    {
        headerComponent.hideBackButton();
    }
    else
    {
        headerComponent.showBackButton();
    }
}

window.clearAndOpenPage = (pageName)=>
{
    window.navigationStack.forEach((element)=>{element.remove();})
    window.navigationStack.length = 0;
    window.navigationStackPointer = -1;
    window.openPage(pageName);
}

window.goNext = ()=>
{
    if(window.navigationStackPointer < (window.navigationStack.length -1))
    {
        window.navigationStack[window.navigationStackPointer].style.display = "none";
        window.navigationStackPointer++;
        window.navigationStack[window.navigationStackPointer].style.display = "flex";
        initializeStyles();
    }

    const headerComponent = document.querySelector('header-component');
    if(window.navigationStackPointer <= 0)
    {
        headerComponent.hideBackButton();
    }
    else
    {
        headerComponent.showBackButton();
    }
}







