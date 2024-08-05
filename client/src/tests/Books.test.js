import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Books from '../components/Books';
import useBooks from '../hooks/useBooks';
import { useNavigate } from 'react-router-dom';

// Mock the useBooks hook
jest.mock('../hooks/useBooks');

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Books Component', () => {
  const mockFetchBooks = jest.fn();
  const mockDeleteBook = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useBooks.mockReturnValue({
      books: [
        {
          id: '1',
          title: 'Test Book',
          author: 'Author Name',
          year: '2023',
          genre: 'Fiction',
          cover: 'http://example.com/cover.jpg',
        },
      ],
      fetchBooks: mockFetchBooks,
      deleteBook: mockDeleteBook,
    });

    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders book details correctly when book is open', async () => {
    render(<Books searchQuery="" openedBook="Test Book" setOpenedBook={() => {}} />);

    await waitFor(() => {
      const bookTitles = screen.getAllByText('Test Book');

      bookTitles.forEach(title => {
        expect(title).toBeInTheDocument();
      });

      expect(screen.getByText('Author Name')).toBeInTheDocument();
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByText('Fiction')).toBeInTheDocument();
    });
  });

  test('handles edit button click', async () => {
    render(<Books searchQuery="" openedBook="Test Book" setOpenedBook={() => {}} />);

    await waitFor(() => {
      const editButton = screen.getByTestId('edit-button');
      fireEvent.click(editButton);

      // Verify edit button navigates to the edit page
      expect(mockNavigate).toHaveBeenCalledWith('/edit/1');
    });
  });
});
