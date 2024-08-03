import { useStore } from 'zustand';
import booksStore from '../stores/booksStore';

const useBooks = () => {
  return useStore(booksStore);
};

export default useBooks;