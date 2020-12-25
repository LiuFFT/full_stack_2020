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

module.exports = {
    dummy,
    totalLikes
}