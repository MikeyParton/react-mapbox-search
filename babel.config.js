const plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-transform-runtime" 
];

if (process.env.NODE_ENV === "test") {
  plugins.push("babel-plugin-rewire");
}

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  plugins
};


