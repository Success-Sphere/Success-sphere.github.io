const fs = require("fs");
const path = require("path");
const { minify: minifyHTML } = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const terser = require("terser");

const dir = "./"; // current directory

const htmlOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
  removeRedundantAttributes: true,
};

fs.readdirSync(dir).forEach(async (file) => {
  const ext = path.extname(file);
  const fullPath = path.join(dir, file);

  if (!fs.lstatSync(fullPath).isFile()) return;

  const content = fs.readFileSync(fullPath, "utf8");
  let minified;

  try {
    if (ext === ".html") {
      minified = await minifyHTML(content, htmlOptions);
    } else if (ext === ".css") {
      minified = new CleanCSS({ level: 2 }).minify(content).styles;
    } else if (ext === ".js") {
      minified = (await terser.minify(content)).code;
    }

    if (minified) {
      fs.writeFileSync(fullPath, minified);
      console.log(`✅ Minified: ${file}`);
    }
  } catch (err) {
    console.error(`❌ Failed to minify ${file}:`, err.message);
  }
});
