import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { toast } from 'react-toastify';
import useBooks from '../hooks/useBooks';

// Mock the useBooks hook
jest.mock('../hooks/useBooks', () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Mock toast functions
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

const mockNavigate = jest.fn();

// Mock useNavigate and useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' }),
}));

describe('BookForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        useBooks.mockReturnValue({
            books: [],
            fetchBooks: jest.fn(),
            addBook: jest.fn(),
            updateBook: jest.fn(),
            deleteBook: jest.fn(),
        });

        render(
            <MemoryRouter>
                <BookForm isEditing={false} />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Author/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Year Published/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Genre/i)).toBeInTheDocument();
    });

    test('displays validation errors when form is submitted with invalid data', async () => {
        useBooks.mockReturnValue({
            books: [],
            fetchBooks: jest.fn(),
            addBook: jest.fn(),
            updateBook: jest.fn(),
            deleteBook: jest.fn(),
        });

        render(
            <MemoryRouter>
                <BookForm isEditing={false} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Save/i));

        expect(await screen.findByText(/Title is required./i)).toBeInTheDocument();
        expect(await screen.findByText(/Author is required./i)).toBeInTheDocument();
        expect(await screen.findByText(/Year must be a valid number between 1000 and the current year./i)).toBeInTheDocument();
        expect(await screen.findByText(/Genre is required./i)).toBeInTheDocument();
    });

    test('submits form and calls addBook when data is valid', async () => {
        const mockAddBook = jest.fn();
        const mockFetchBooks = jest.fn();
        useBooks.mockReturnValue({
            books: [],
            fetchBooks: mockFetchBooks,
            addBook: mockAddBook,
            updateBook: jest.fn(),
            deleteBook: jest.fn(),
        });

        render(
            <MemoryRouter>
                <BookForm isEditing={false} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'New Book' } });
        fireEvent.change(screen.getByPlaceholderText(/Author/i), { target: { value: 'Author Name' } });
        fireEvent.change(screen.getByPlaceholderText(/Year Published/i), { target: { value: '2024' } });
        fireEvent.change(screen.getByPlaceholderText(/Genre/i), { target: { value: 'Fiction' } });

        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(() => {
            expect(mockAddBook).toHaveBeenCalledWith({
                title: 'New Book',
                author: 'Author Name',
                year: '2024',
                genre: 'Fiction',
            });
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    test('submits form and calls updateBook when editing', async () => {
        const mockUpdateBook = jest.fn();
        const mockFetchBooks = jest.fn();
        const mockBook = { id: '1', title: 'Old Title', author: 'Old Author', year: '2020', genre: 'Old Genre' };

        useBooks.mockReturnValue({
            books: [mockBook],
            fetchBooks: mockFetchBooks,
            addBook: jest.fn(),
            updateBook: mockUpdateBook,
            deleteBook: jest.fn(),
        });

        render(
            <MemoryRouter>
                <BookForm isEditing={true} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Updated Title' } });
        fireEvent.change(screen.getByPlaceholderText(/Author/i), { target: { value: 'Updated Author' } });
        fireEvent.change(screen.getByPlaceholderText(/Year Published/i), { target: { value: '2021' } });
        fireEvent.change(screen.getByPlaceholderText(/Genre/i), { target: { value: 'Updated Genre' } });

        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(() => {
            expect(mockUpdateBook).toHaveBeenCalledWith({
                title: 'Updated Title',
                author: 'Updated Author',
                year: '2021',
                genre: 'Updated Genre',
                id: '1',
            });
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
});
