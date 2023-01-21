// todo: ADD CUTE ANIME GIRL
module.exports = (res, method, reqUrl, errMsg) => {
  res.status(400).json({
    result: "Something whent terribly bad :ccc",
    reason: `Error raised at src/routes/recipesRouter ${method} - ${reqUrl} Err:${errMsg}`,
  });
};
