const fs = require("fs");
const path = require("path");
const { getArticles } = require("./article.js");
const addArticle = (title, date, content) => {
  return new Promise((resolve, reject) => {
    if (!title || !date || !content) {
      reject();
    }
    getArticles().then((articles) => {
      const article = {
        id: Number(articles[articles.length - 1].id) + 1,
        title: title,
        date: date,
        content: content,
      };

      articles.push(article);

      updateFile(articles);

      resolve();
    });
  });
};

const updateArticle = (id, title, date, content) => {
  return new Promise((resolve, reject) => {
    if (!title || !date || !content) {
      reject();
    }
    getArticles().then((articles) => {
      articles.forEach((article) => {
        if (id == article.id) {
          const obj = { id: id, title: title, date: date, content: content };
          Object.assign(article, obj);

          updateFile(articles);

          resolve();
        }
      });
      reject();
    });
  });
};

const deleteArticle = (id) => {
  return new Promise((resolve, reject) => {
    getArticles().then((articles) => {
      const idx = findIndex(articles, id);
      if (idx == -1) reject();

      articles.splice(idx, 1);

      updateFile(articles);
      resolve();
    });
  });
};

function findIndex(array, id) {
  for (let i = 0; i < array.length; ++i) {
    if (array[i].id == id) return i;
  }

  return -1;
}

function updateFile(articles) {
  fs.writeFile(
    path.join(__dirname, "files", "articles.json"),
    JSON.stringify(articles),
    (err) => {
      if (err) throw err;
    }
  );
}
module.exports = { addArticle, updateArticle, deleteArticle };
