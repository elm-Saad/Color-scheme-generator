

function renderSelectBox(){
  const customSelect = document.querySelector(".custom-select")
  const originalSelectElm = document.getElementById("col")

  // create div to be the  <select> face 
  const selectDivElem = document.createElement("div")
  selectDivElem.classList.add('select-copy')
  selectDivElem.innerHTML = originalSelectElm.options[originalSelectElm.selectedIndex].innerHTML
  customSelect.appendChild(selectDivElem)
  
  //create  div to be the face of  each <option> in the original <select>
  const optionContainerDivElm = document.createElement("div")
  optionContainerDivElm.setAttribute("class", "select-option select-close")
  for(const option of originalSelectElm ){
    const optionDivElm = document.createElement("div")
    optionDivElm.innerHTML = option.innerHTML
    //handle click on option
    optionDivElm.addEventListener("click", function() {
      const selectCopyDiv =document.querySelector('.select-copy')

      let i = 0
      // look for the cliked option 
      for(const option of originalSelectElm ){
        if (option.innerHTML == this.innerHTML) {
          //update <select> name & index from original 
          originalSelectElm.selectedIndex = i
          selectCopyDiv.innerHTML = this.innerHTML

          //remove any selected option if it is
          if(document.querySelector(".selected"))
            document.querySelector(".selected").classList.remove("selected")

          //reset the selected option if it is
          this.classList.add("selected")
        }
        i++
      }
    })
    optionContainerDivElm.appendChild(optionDivElm)
  }
  customSelect.appendChild(optionContainerDivElm)
  
  selectDivElem.addEventListener("click", function(e) {
    e.stopPropagation()
    // open & close option container
    optionContainerDivElm.classList.toggle("select-close")
  })
}

function closeAllSelect() {
  //close all option on any click
  for (let option of document.getElementsByClassName("select-option") )
    option.classList.add("select-close")
}

export { renderSelectBox , closeAllSelect }