// todo: ADD CUTE ANIME GIRL
module.exports = (res, method, reqUrl, errMsg) => {
  res.status(400).json({
    where: `Catch at ${method}: ${reqUrl}`,
    reason: `Error raised at src/routes/recipesRouter Err:${errMsg}`,
  });
};
