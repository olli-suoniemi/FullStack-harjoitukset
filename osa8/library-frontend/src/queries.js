import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const CREATE_AUTHOR = gql`
  mutation createAuthor(
    $name: String!
    $born: Int
  ) {
    addAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`

export const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      title
      published
      id
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
      published
      genres
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor(
    $name: String!
    $year: Int!
  ) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      id
      born
      bookCount
    }
  }
`