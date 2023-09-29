import ThemeProvider from './contexts/ThemeContext';
import { BooksProvider } from './contexts/BooksContext';
import Books from './pages/Books';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BooksProvider>
        <Books />
      </BooksProvider>
    </ThemeProvider>
  );
}

export default App;
