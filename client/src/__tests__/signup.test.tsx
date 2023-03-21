// Imports
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// To Test
import Signup from '../components/user/signup';

// Tests
describe('Renders Sign Up page correctly', async () => {
    it('Should render the page correctly', async () => {
        // Setup
        render(<Signup />);
        const h1 = screen.queryByText('Sign Up');

        // Expectations
        expect(h1).not.toBeNull();
    });
});