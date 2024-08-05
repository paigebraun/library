import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddBtn from '../components/AddBtn';

// Mock the useNavigate hook
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('AddBtn', () => {
    test('renders without crashing', () => {
        render(
            <MemoryRouter>
                <AddBtn />
            </MemoryRouter>
        );
        // Check if the button is in the document
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('navigates to /add when clicked', () => {
        render(
            <MemoryRouter>
                <AddBtn />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(mockNavigate).toHaveBeenCalledWith('/add');
    });
});
