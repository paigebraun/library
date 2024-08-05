import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BackBtn from '../components/BackBtn';

// Mock the useNavigate hook
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('BackBtn', () => {
    test('renders without crashing', () => {
        render(
            <MemoryRouter>
                <BackBtn />
            </MemoryRouter>
        );
        // Check if the button is in the document
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('navigates to home when clicked', () => {
        render(
            <MemoryRouter>
                <BackBtn />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
