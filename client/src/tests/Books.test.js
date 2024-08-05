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

  test('renders book details correctly', async () => {
    render(<Books searchQuery="" openedBook="none" setOpenedBook={() => {}} />);

    await waitFor(() => {
      // Make sure to query the element by specific method
      const bookTitle = screen.getAllByText('Test Book');
      expect(bookTitle[0]).toBeInTheDocument(); // Check if at least one instance is present
      expect(screen.getByText('Author Name')).toBeInTheDocument();
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByText('Fiction')).toBeInTheDocument();
    });
  });

  test('handles edit button click', async () => {
    render(<Books searchQuery="" openedBook="none" setOpenedBook={() => {}} />);

    await waitFor(() => {
      const editButton = screen.getByTestId('edit-button');
      fireEvent.click(editButton);

      // Verify that navigate was called with the correct argument
      expect(mockNavigate).toHaveBeenCalledWith('/edit/1');
    });
  });

});
