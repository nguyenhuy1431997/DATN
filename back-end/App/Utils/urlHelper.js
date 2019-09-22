global.Env = process.env;

const getUrl = filename => {
  return Env.HOST + Env.ImageRelativePath + filename;
};

module.exports = { getUrl };
