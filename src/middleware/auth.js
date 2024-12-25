const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("");
  }

  const auth = new Buffer.from(authHeader.split(" ")[1], "base64");
  const cred = auth.toString().split(":");
  const user = cred[0];
  const pass = cred[1];

  if (user === "admin" && pass === "admin") {
    next();
  } else {
    res.setHeader("WWW-Authenticate", "Basic");
    res.status(401).send("Wrong credentials");
  }
};

module.exports = { basicAuth };
