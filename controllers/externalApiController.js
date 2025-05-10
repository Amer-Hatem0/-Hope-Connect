 

const axios = require('axios');
const logger = require('../utils/logger');

//  Get educational books from Open Library API
exports.searchBooks = async (req, res) => {
  const { title } = req.query;

  try {
    const response = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
    const books = response.data.docs.slice(0, 10).map(book => ({
      title: book.title,
      author: book.author_name?.join(', '),
      year: book.first_publish_year,
      cover_id: book.cover_i,
      cover_url: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
    }));

    res.status(200).json(books);
  } catch (err) {
    logger.error('Error fetching books from OpenLibrary API:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

//  Get health data from Open Disease API
exports.getCovidStats = async (req, res) => {
  try {
    const response = await axios.get('https://disease.sh/v3/covid-19/all');
    res.status(200).json(response.data);
  } catch (err) {
    logger.error('Error fetching COVID data from Disease.sh API:', err);
    res.status(500).json({ error: 'Failed to fetch health data' });
  }
};
