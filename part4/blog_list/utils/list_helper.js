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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}