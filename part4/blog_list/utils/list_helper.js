const _ = require('lodash');

const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    const likes_list = blogs.map(blog => blog.likes)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const likes = likes_list.reduce(reducer)

    return likes
}

const favoriteBlog = (blogs) => {
    const likes_list = blogs.map(blog => blog.likes)

    const indexOfMaxValue = likes_list.indexOf(Math.max(...likes_list));

    return blogs[indexOfMaxValue]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return null
    }

    const blogsByAuthor = _.chain(_.groupBy(blogs,'author'))
        .toPairs()
        .maxBy()
        .value()

    const mostBlogsByAuthor = {
        author:blogsByAuthor[0],
        blogs: blogsByAuthor[1].length
    }

    // console.log(mostBlogsByAuthor)
    return mostBlogsByAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}