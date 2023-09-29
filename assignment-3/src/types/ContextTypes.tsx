export interface ThemeContextType {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export interface BooksContextType {
  id: number
  name: string
  author: string
  topic: string
}
