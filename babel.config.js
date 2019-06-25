const isTest = process.env.NODE_ENV === "test";

console.log("test", isTest);

module.exports = {
  presets: ["es2015", "stage-0", "react"],

  plugins: isTest ? ["babel-plugin-rewire"] : []
};
