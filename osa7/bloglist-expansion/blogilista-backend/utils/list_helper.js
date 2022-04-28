const dummy = (blogs) => {
  return 1
};

const totalLikes = (blogs) => {
  let likes = 0
  for ( let i = 0; i < blogs.length; i++ ) {
    likes += blogs[i].likes
  };
  return likes
};

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let fav = ""
  for ( let i = 0; i < blogs.length; i++ ) {
    if (blogs[i].likes > mostLikes) {
      fav = blogs[i]
      mostLikes = blogs[i].likes
    };
  };
  return fav
}

const mostBlogs = (blogs) => {
  let authors = []
  let personalCount = 0
  let continueOrNot = 1
  for ( let i = 0; i < blogs.length; i++ ) {
    for (let j = i; j < blogs.length; j++ ) {
      if (blogs[j].author === blogs[i].author) {
        personalCount ++;
      }
    }
    let x = {}
    authors.forEach(element => {
      if (element.author === blogs[i].author) {
        continueOrNot = 0
      }
    });
    if (continueOrNot) {
      x.author = blogs[i].author
      x.blogs = personalCount
      authors.push(x)
    }
    continueOrNot = 1
    personalCount = 0
  }
  let authorWithMostBlogs = {
    author: "",
    blogs: 0
  }
  authors.forEach(element => {
    if(element.blogs > authorWithMostBlogs.blogs) {
      authorWithMostBlogs = element
    };
  })

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  let authors = []
  let personalCount = 0
  let continueOrNot = 1
  for ( let i = 0; i < blogs.length; i++ ) {
    for (let j = i; j < blogs.length; j++ ) {
      if (blogs[j].author === blogs[i].author) {
        personalCount += blogs[j].likes
      }
    }
    let x = {}
    authors.forEach(element => {
      if (element.author === blogs[i].author) {
        continueOrNot = 0
      }
    });
    if (continueOrNot) {
      x.author = blogs[i].author
      x.likes = personalCount
      authors.push(x)
    }
    continueOrNot = 1
    personalCount = 0
  }
  let authorWithMostLikes = {
    author: "",
    likes: 0
  }
  authors.forEach(element => {
    if(element.likes > authorWithMostLikes.likes) {
      authorWithMostLikes = element
    };
  })
  
  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}