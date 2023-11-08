import { renderSelectBox, closeAllSelect } from './utils.js'
//const 
const DMessageDiv = document.getElementById('Toast')
const DMessageText = document.getElementById('Toast-text')
const DMessageContainer = document.getElementById('message-container')

// render <select> tag
renderSelectBox()

// close all selected on any click
document.addEventListener('click', closeAllSelect)

// render default color
fetch('https://www.thecolorapi.com/scheme?hex=F55A5A&mode=monochrome&count=5')
    .then((response) => response.json())
    .then((data) => render(data))

// render color on user select
document.getElementById('get-scheme').addEventListener('click', () => {
    const hexClr = document.getElementById('colorInput').value.replace('#', '')
    const clrMode = document.getElementById('col').value.toLowerCase()
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexClr}&mode=${clrMode}&count=5`)
        .then((response) => response.json())
        .then((data) => render(data))
})

function render(data) {
    let setHtmlData = ''
    for (let color of data.colors) {
        setHtmlData += `
            <div class="color-rectangle">
                <span class="color" data-clipboard-text="${color.hex.value}" style="background-color:${color.hex.value}"></span>
                <span class="hex-code" data-clipboard-text="${color.hex.value}">${color.hex.value}</span>
            </div>`
    }
    document.getElementById('display-color-data').innerHTML = setHtmlData

    // Add event listeners for the copy buttons
    const CopyGridColor = document.querySelectorAll('.color')
    CopyGridColor.forEach((grid) => {
        grid.addEventListener('click', () => {
            const textToCopy = grid.getAttribute('data-clipboard-text')
            copyToClipboard(textToCopy)
        })
    })
    const CopyHexColor = document.querySelectorAll('.hex-code')
    CopyHexColor.forEach((hexCode)=>{
        hexCode.addEventListener('click',()=>{
            const textToCopy = hexCode.getAttribute('data-clipboard-text')
            copyToClipboard(textToCopy)
        })
    })
}

// Function to copy text to clipboard
async function copyToClipboard(text) {
    try {
        if(navigator.clipboard){
            await navigator.clipboard.writeText(text)
            displayMessage('Copy to Clipboard',true)
        }else{
            displayMessage('Failed to copy to ClipBoard',false)
        }
    } catch (error) {
        displayMessage(error,false)
    }
}

// display messages function

function displayMessage (text,state){
    if(state){
        DMessageDiv.classList.add('showToast')
        DMessageContainer.classList.add('success')
        DMessageText.innerText = text
    }else{
        DMessageDiv.classList.add('showToast')
        DMessageContainer.classList.add('error')
        DMessageText.innerText = text
    }
    setTimeout(()=>{
        DMessageDiv.classList.remove('showToast')

        state?DMessageContainer.classList.remove('success'):
        DMessageContainer.classList.remove('error')

        DMessageText.innerText = ''
    },3000)

}