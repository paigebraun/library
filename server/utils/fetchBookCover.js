// Get book cover from google books API
const fetchBookCover = async (title, author) => {
    let coverUrl = '';
    let imgZoom = '';
    try {
        // This is bad practice but for the sake of easily sharing this project the API key is not hidden. 
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}&key=AIzaSyDuUR0qPjaFHx23x19HX7G11F4VgqESK_E&fife=w800`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const imgLinks = data.items[0].volumeInfo.imageLinks;
            if (imgLinks) {
                const coverKey = Object.keys(imgLinks)[Object.keys(imgLinks).length - 1];
                coverUrl = imgLinks[coverKey].replace('http', 'https');
                imgZoom = coverUrl.replace('zoom=1', 'zoom=10')
            }
        }
    } catch (error) {
        console.error('Error fetching book cover:', error);
    }

    return imgZoom || 'DefaultCoverUrl';
};

module.exports = fetchBookCover;