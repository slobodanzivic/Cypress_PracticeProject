///<reference types ="Cypress"/>
///<reference types = "Cypress-iframe"/>
import HomePage from '../pageObjects/HomePage.js'
import 'cypress-iframe'

describe('Cypress automation', function () {

    const homePage = new HomePage()

    it('Go to the https://rahulshettyacademy.com/AutomationPractice/ url', function () {

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.url().should('eq', 'https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('Verify if radio button is checked', function () {
        //handling with radio buttons
        homePage.getRadioButton().check().should('be.checked').and('have.value', 'radio2')
    })

    it('Auto suggestion dropdown menu test', function () {
        //handling with auto suggestion dropdown menu
        homePage.getInputField().type('ind')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {

            if ($el.text() === "India") {
                $el.click()
            }
        })

        homePage.getInputField().should('have.value', 'India')

        it('Static dropdown menu test', function () {
            //handling with static dropdowns
            homePage.getSelectOption().select('option2').should('have.value', 'option2')
        })

        it('Verify if checkbox is checked', function () {
            //handling with checkboxes
            homePage.getCheckBox().check().should('be.checked').and('have.value', 'option3')
            homePage.getCheckBox().uncheck().should('not.be.checked')
            homePage.checkMultipleCheckbox().check(['option1', 'option2']).should('be.checked')
        })

        it('Switch tab test', function () {
            //handlind with switch tab --- First solution
            homePage.getOpenTab().then(function (el) {
                const url = el.prop('href')
                cy.visit(url)
            })
        })

        cy.url().should('eq', 'https://www.rahulshettyacademy.com/#/index')

        cy.wait(5000)

        //handlind with switch tab --- Second solution

        //homePage.getOpenTab().invoke('removeAttr', 'target').click()
        //cy.url().should('include', 'https://www.rahulshettyacademy.com/#/index')


        it('Go to the origin page', function () {
            //back to the origin page
            cy.go('back')
            cy.url().should('include', 'AutomationPractice/')
        })

        it('Verify the text of alert button', function () {
            //handling with popups and alerts
            homePage.getAlertBtn().click()
            cy.on('window:alert', (str) => {

                expect(str).to.equal('Hello , share this practice page and share your knowledge')
            })

            homePage.getConfirmBtn().click()
            cy.on('window:confirm', (str1) => {

                expect(str1).to.equal('Hello , Are you sure you want to confirm?')
            })
        })

        it('Verify the price of the Python course', function () {
            //handling with tables Validate if course "Master Selenium Automation in simple Python Language" have price "25" 
            cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
                const text = $el.text()
                if (text.includes("Python")) {
                    cy.get('tr td:nth-child(2)').eq(index).next().then(function (price) {
                        const priceText = price.text()
                        expect(priceText).to.equal('25')
                    })
                }
            })
        })

        it('Verify if input edit box is visible or not', function () {
            //handling with visible and invisible elements
            homePage.getEditBox().should('be.visible')
            homePage.getHideBtn().click()
            homePage.getEditBox().should('not.be.visible')
            homePage.getShowBtn().click()
            homePage.getEditBox().should('be.visible')
        })

        it('Mouse over test', function () {
            //handling with mouse over
            cy.get('div.mouse-hover-content').invoke('show')
            cy.contains('Top').click()
            cy.url().should('include', 'top')

            cy.contains('Reload').click({ force: true })
            cy.url().should('include', 'AutomationPractice')
        })

        it('Frame test', function () {
            //handling with frames
            cy.frameLoaded('#courses-iframe')
            cy.iframe().find('a[href*="mentorship"]').eq(0).click()
            cy.iframe().find('h1[class*="pricing-title"]').should('have.length', '2')
        })

    })


})