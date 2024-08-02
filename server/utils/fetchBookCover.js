require('dotenv').config()

const fetchBookCover = async (title, author) => {
    let coverUrl = '';
    try {
        const apiKey = process.env.BOOKS_API;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}&key=${apiKey}`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const imgLinks = data.items[0].volumeInfo.imageLinks;
            if (imgLinks) {
                const coverKey = Object.keys(imgLinks)[Object.keys(imgLinks).length - 1];
                coverUrl = imgLinks[coverKey].replace('http', 'https');
            }
        }
    } catch (error) {
        console.error('Error fetching book cover:', error);
    }

    return coverUrl || 'DefaultCoverUrl';
};

module.exports = fetchBookCover;