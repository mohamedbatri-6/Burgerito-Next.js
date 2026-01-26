import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { CartProvider } from '@/context/CartContext';

// Mock global de fetch
global.fetch = jest.fn();

describe('Home Page Integration Test', () => {
    const mockProducts = {
        items: [
            {
                _id: '1',
                name: 'Burger Test Integration',
                price: 15.99,
                imageUrl: '/test.jpg',
                isAvailable: true,
            },
            {
                _id: '2',
                name: 'Burger Indisponible Integration',
                price: 10.00,
                imageUrl: '/test2.jpg',
                isAvailable: false,
            }
        ]
    };

    beforeEach(() => {
        fetch.mockClear();
        fetch.mockImplementation((url) => {
            if (url.includes('/api/products')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockProducts),
                });
            }
            return Promise.reject(new Error('URL non gérée par le mock'));
        });
        localStorage.clear();
    });

    it('doit charger et afficher les burgers depuis l\'API', async () => {
        // Résolution du Server Component
        const HomeResolved = await Home();

        render(
            <CartProvider>
                {HomeResolved}
            </CartProvider>
        );

        // Vérification du titre principal
        expect(screen.getByText('BURGERITO')).toBeInTheDocument();

        // Vérification des produits mockés
        expect(screen.getByText('Burger Test Integration')).toBeInTheDocument();
        expect(screen.getByText('€ 15.99')).toBeInTheDocument();

        expect(screen.getByText('Burger Indisponible Integration')).toBeInTheDocument();
        expect(screen.getByText(/produit indisponible/i)).toBeInTheDocument();
    });

    it('doit permettre d\'ajouter un produit au panier via le bouton', async () => {
        const HomeResolved = await Home();

        render(
            <CartProvider>
                {HomeResolved}
            </CartProvider>
        );

        const addButton = screen.getByRole('button', { name: /ajouter au panier/i });

        // Simuler le clic
        addButton.click();

        // Vérifier le stockage local (localStorage)
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        expect(storedCart.length).toBe(1);
        expect(storedCart[0].name).toBe('Burger Test Integration');
    });
});
