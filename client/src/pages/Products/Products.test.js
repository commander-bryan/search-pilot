import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { Products } from './Products';

const mockProductsResponse = [
    {
        id: 1,
        name: "Shoe",
        type: "footwear",
        sizes: ["US 7","US 8","US 9"],
        features: [ "a sole", "at least one lace"],
        brand: "tesla",
        style: "falling apart"
    },
    {
        id: 2,
        name: "Sock",
        type: "outerwear",
        sizes: ["S"],
        features: [ "can be worn as a hat", "can be worn on foot"],
        brand: "tesla",
        style: "metal"
    },
];

const server = setupServer(
    rest.get("/api/products", (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockProductsResponse))
    }),
);

describe('Products list test', () => {
    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    it('renders a the product cards', async () => {
        render(
            <Router>
                <Products />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('Shoe'));
            expect(screen.getByText('footwear'));
            expect(screen.getByText('Sock'));
            expect(screen.getByText('outerwear'));
        });
    })

    // with more time, would add tests for...
    // TODO: test error when fetching
    // TODO: test loading state
    
    // tests for add product view:
    // TODO: test "add" card exists and navigates to /add-product
    // TODO: test form renders initial fields
    // TODO: test dynamic fields - do the right fields appear for each type
    // TODO: test name validation
    // TODO: test client side validation
    // TODO: test navigation on successful submit
    // TODO: test error state on unsuccessful submit
    // TODO: test error state on unsuccessful validation request

    // tests for view/edit product view:
    // TODO: test clicking "View/Edit" on a card navigates to /product/{id}
    // TODO: test form renders initial fields with pre-populated data
    // TODO: test fields can be changed
    // TODO: test navigation on successful submit
    // TODO: test error state on unsuccessful submit
    
    // TODO: figure out why the routes.jsx file is causing an error in jest (not  breaking tests)
});