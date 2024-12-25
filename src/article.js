const fs = require("fs");
const path = require("path");

const getArticles = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "files", "articles.json"), (err, data) => {
      if (err) {
        reject(err);
      } else {
        const articles = JSON.parse(data);
        resolve(articles);
      }
    });
  });
};

function getArticleById(id) {
  return new Promise((resolve, reject) => {
    getArticles().then((articles) => {
      articles.forEach((article) => {
        if (article.id == id) resolve(article);
      });

      reject(null);
    });
  });

  return null;
}

module.exports = { getArticles, getArticleById };
