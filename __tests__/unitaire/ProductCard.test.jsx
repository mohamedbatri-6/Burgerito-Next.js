import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';

describe('ProductCard', () => {
  const productDisponible = {
    _id: '1',
    name: 'Burger Test',
    price: 9.99,
    imageUrl: '/test.jpg',
    isAvailable: true,
  };

  const productIndispo = {
    _id: '2',
    name: 'Burger Indispo',
    price: 8.5,
    imageUrl: '/test2.jpg',
    isAvailable: false,
  };

  beforeEach(() => {
    // on vide le localStorage avant chaque test
    localStorage.clear();
  });

  it("affiche le nom et le prix du produit", () => {
    render(<ProductCard product={productDisponible} />);

    expect(screen.getByText('Burger Test')).toBeInTheDocument();
    expect(screen.getByText(/9\.99/)).toBeInTheDocument();
  });

  it("affiche le bouton 'Ajouter au panier' si le produit est disponible", () => {
    render(<ProductCard product={productDisponible} />);

    const button = screen.getByRole('button', { name: /ajouter au panier/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("affiche 'Indisponible' si le produit n'est pas disponible", () => {
    render(<ProductCard product={productIndispo} />);

    expect(screen.getByText(/indisponible/i)).toBeInTheDocument();
  });

  it("ajoute le produit dans le localStorage quand on clique sur le bouton", () => {
    render(<ProductCard product={productDisponible} />);

    const button = screen.getByRole('button', { name: /ajouter au panier/i });
    fireEvent.click(button);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(cart.length).toBe(1);
    expect(cart[0].name).toBe('Burger Test');
  });
});
