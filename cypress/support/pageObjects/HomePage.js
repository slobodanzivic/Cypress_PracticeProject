class HomePage
{

getRadioButton(){
    return cy.get("input[value='radio2']")
}

getInputField(){
    return cy.get("input#autocomplete")
}

getSelectOption(){
    return cy.get("select#dropdown-class-example")
}

getCheckBox(){
    return cy.get("input#checkBoxOption3")
}

checkMultipleCheckbox(){
    return cy.get('input[type="checkbox"]')
}

getOpenTab(){
    return cy.get("a[id='opentab']").click()
}

getAlertBtn(){
    return cy.get('input#alertbtn')
}


getConfirmBtn(){
    return cy.get('input#confirmbtn')
}

getEditBox(){
    return cy.get('input#displayed-text')
}

getHideBtn(){
    return cy.get('input#hide-textbox')
}

getShowBtn(){
    return cy.get('input#show-textbox')
}

getMouseOverBtn(){
    return cy.get('div.mouse-hover-content')
}

}
export default HomePage;