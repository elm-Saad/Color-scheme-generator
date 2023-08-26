import {renderSelectBox,closeAllSelect} from './utils.js'

//render <select> tag 
renderSelectBox()

//close all selected on any click 
document.addEventListener("click", closeAllSelect)

//render default color 
fetch('https://www.thecolorapi.com/scheme?hex=F55A5A&mode=monochrome&count=5')
    .then(response => response.json())
    .then(data => render(data))

//render color on user select
document.getElementById('get-scheme').addEventListener('click',()=> {
    const hexClr = document.getElementById('colorInput').value.replace("#","")
    const clrMode = document.getElementById('col').value.toLowerCase()
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexClr}&mode=${clrMode}&count=5`)
        .then(response => response.json())
        .then(data => render(data))
})

function render(data){
    let setHtmlData=``
    for(let color of data.colors){
        setHtmlData += `
            <div class="color-rectangle">
                <span class="color" style="background-color:${color.hex.value}"></span>
                <span class="hex-code">${color.hex.value}</span>
            </div>`
    }
    document.getElementById('display-color-data').innerHTML = setHtmlData
}