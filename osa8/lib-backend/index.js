const { ApolloServer, UserInputError, gql } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'SECRET_KEY'
const MONGODB_URI =
  `mongodb+srv://fullstack:${process.env.PASSWORD}@cluster0.dfere.mongodb.net/library?retryWrites=true&w=majority`

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    deleteAuthors: String
    deleteBooks: String
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ) : Book
    addAuthor(
      name: String!
      born: Int
    ) : Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
    createUser(
      username: String!
      favoriteGenre: String!
    ) : User
    login(
      username: String!
      password: String!
    ) : Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      if(!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
      if(args.author && !args.genre) {
        const booksOfThisUser = books.filter((book) => {
          return book.author.name === args.author ? book : null
        })
        
        return booksOfThisUser
      }
      if(!args.author && args.genre) {
        const booksOfThisUser = books.filter((b) => {
          if (b.genres.includes(args.genre)) {
            return b
          }
        })
        return booksOfThisUser
      }

      const booksOfThisUser = books.filter((b) => {
        if (b.genres.includes(args.genre) && b.author.name === args.author) {
          return b
        }
      })
      return booksOfThisUser
    },
    allAuthors: async (root, args) => {
      return Author.find({})
    },
    deleteAuthors: async (root, args) => {
      await Author.deleteMany({})
      return 'Resetted the authors'
    },
    deleteBooks: async (root, args) => {
      await Book.deleteMany({})
      return 'Resetted the books'
    },
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      const booksOfThisUser = books.filter(b => b.author.name === root.name ? b : null)
      return booksOfThisUser.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser) {
        throw new UserInputError('User must be logged in to add books')
      }
      if (args.author.length < 4) {
        throw new UserInputError('Too short author name')
      } 
      if (args.title.length < 4) {
        throw new UserInputError('Too short book title name')
      }
      if (args.genres.length === 1) {
        if (args.genres[0].length === 0) {
          throw new UserInputError('The book is missing genres')
        }
      }
      if (!args.published) {
        throw new UserInputError('The book is missing publish year')
      }
      let author = await Author.findOne({name: args.author})
      if (!author) {    // if author doesn't exist
        const newAuthor = new Author({ name: args.author, born: null })
        await newAuthor.save()
        author = await Author.findOne({ name: args.author })
      }
      const book = new Book({ ...args, author: author.id })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const addedBook = await Book.findById(book.id).populate('author')
      return addedBook
    },
    addAuthor: async (root, args, context) => {
      if(!context.currentUser) {
        throw new UserInputError('User must be logged in to add authors')
      }
      if (args.name.length < 4) {
        throw new UserInputError('The author name is too short')
      }
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser) {
        throw new UserInputError('User must be logged in to edit authors')
      }
      const author = await Author.findOne({name: args.name})
      if(!author) {
        throw new UserInputError('Author not found')
      }

      await Author.updateOne({ name: author.name }, { born: args.setBornTo})
      const updatedAuthor = await Author.findOne({name: author.name})
      return updatedAuthor
    },
    createUser: async (root, args) => {
      if (args.username.length < 3) {
        throw new UserInputError('The username is too short')
      }
      const user = new User({ ...args })
      try {
        user.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})