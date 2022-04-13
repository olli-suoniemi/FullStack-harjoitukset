describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Test Man',
            username: 'testman',
            password: 'sekret'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000/api/login')
    })

    it('Login form is shown', function() {
        cy.contains('Blogs')
        cy.contains('Login')
    })

    describe('Login',function() {
        it('fails with wrong credentials', function() {
            cy.contains('login')
            cy.get('#username').type('testman')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .contains('wrong credentials')
                .should('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })

        it('succeeds with correct credentials', function() {
            cy.contains('login')
            cy.get('#username').type('testman')
            cy.get('#password').type('sekret')
            cy.get('#login-button').click()
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'testman', password: 'sekret' })
            cy.createBlog({ author: 'someone', title: 'something', url: 'somewhere' })
            cy.createBlog({ author: 'x', title: 'xxx', url: 'xxx.com' })
            cy.createBlog({ author: 'y', title: 'yyy', url: 'yyy.com' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title-input').type('a blog created by cypress')
            cy.get('#author-input').type('testman')
            cy.get('#url-input').type('www.testing.com')
            cy.get('#submit-button').click()

            cy.contains('a blog created by cypress')
        })

        it('A blog can be liked', function() {
            cy.contains('view').click()
            cy.get('#like-button').click()
        })

        it('A blog can be deleted', function() {
            cy.contains('someone').find('button').click()
            cy.get('#delete-button').click()
            cy.get('html').should('not.contain', 'only the creator can delete a blog')
            cy.get('html').should('not.contain', 'someone')
        })

        it.only('Blogs are sorted by likes', function() {
            cy.contains('xxx').find('button').click()
            cy.contains('xxx').parent().find('button').should('contain', 'hide')
            cy.get('#like-button').click()
        })
    })
})