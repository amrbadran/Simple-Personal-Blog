const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { getArticles, getArticleById } = require("./article.js");
const { basicAuth } = require("./middleware/auth.js");
const {
  addArticle,
  updateArticle,
  deleteArticle,
} = require("./article_manage.js");
const PORT = 3000;
const globalPath = path.resolve(__dirname, "..", "public");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  getArticles().then((articles) =>
    res.render(path.join(globalPath, "index.ejs"), {
      articles: articles,
    })
  );
});

app.get("/article/:id/", (req, res) => {
  getArticleById(req.params.id)
    .then((article) => {
      res.render(path.join(globalPath, "article.ejs"), {
        article: article,
      });
    })
    .catch((article) => {
      res.send("<h1>Not Found Article</h1>");
    });
});
app.use("/admin", basicAuth);
app.get("/admin", (req, res) => {
  getArticles().then((articles) =>
    res.render(path.join(globalPath, "admin.ejs"), {
      articles: articles,
    })
  );
});

app.get("/admin/article/", (req, res) => {
  res.render(path.join(globalPath, "article_manage.ejs"), {
    flag: false,
    id: -1,
  });
});

app.get("/admin/article/:id", (req, res) => {
  res.render(path.join(globalPath, "article_manage.ejs"), {
    flag: true,
    id: req.params.id,
  });
});
app.post("/admin/article/", (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const date = req.body.date;
  const content = req.body.content;

  addArticle(title, date, content)
    .then(() => {
      res.redirect("/admin/");
    })
    .catch(() => {
      res.send("<h1>something wrong with inputs</h1>");
    });
});
app.post("/admin/article/:id", (req, res) => {
  const { title, date, content } = req.body;
  const id = req.params.id;
  updateArticle(id, title, date, content)
    .then(() => {
      res.redirect("/admin/");
    })
    .catch(() => {
      res.send("<h1>something wrong with inputs</h1>");
    });
});

app.get("/admin/article/:id/del", (req, res) => {
  const id = req.params.id;

  deleteArticle(id)
    .then(() => {
      res.redirect("/admin/");
    })
    .catch(() => {
      res.send("<h1>something wrong with id</h1>");
    });
});
app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
