describe('test login show', function () {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'root',
            username: 'root',
            password: 'root'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('test if login form shows', function () {
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function() {
            cy.get('input:first').type('root')
            cy.get('input:last').type('root')
            cy.contains('login').click()

            cy.contains('root logged-in')
        })

        it('fails with wrong credentials', function() {
            cy.get('input:first').type('root')
            cy.get('input:last').type('wrong')
            cy.contains('login').click()

            cy.contains('Wrong username or password')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'root', password: 'root' })
        })

        it('A blog can be created', function() {
            // ...
        })
    })

})