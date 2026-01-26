describe('Cart E2E Test', () => {
    beforeEach(() => {
        // On vide le localStorage avant chaque test pour repartir de zéro
        cy.clearLocalStorage();
        // On va sur la page d'accueil
        cy.visit('/');
    });

    it('devrait ajouter un burger au panier et passer une commande', () => {
        // 1. Vérifier que la page d'accueil charge
        cy.contains('BURGERITO').should('be.visible');

        // 2. Trouver le premier bouton "Ajouter au panier" et cliquer dessus
        // On attend que les produits soient chargés (fetch API)
        cy.contains('Ajouter au panier').first().click();

        // 3. Aller au panier
        // On peut soit cliquer sur un lien dans le header, soit y aller directement
        cy.visit('/cart');

        // 4. Vérifier que le produit est dans le panier
        cy.get('li').should('have.length.at.least', 1);
        cy.contains('Commander').should('be.visible');

        // 5. Cliquer sur "Commander"
        cy.contains('Commander').click();

        // 6. Vérifier la redirection vers /profile
        cy.url().should('include', '/profile');

        // 7. Vérifier que le panier est maintenant vide (en retournant sur /cart)
        cy.visit('/cart');
        cy.contains('Votre panier est vide').should('be.visible');
    });

    it('devrait afficher un message si le panier est vide', () => {
        cy.visit('/cart');
        cy.contains('Votre panier est vide').should('be.visible');
    });
});
