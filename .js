import fs from "fs";
import path from "path";
import { minify as minifyHTML } from "html-minifier-terser";
import CleanCSS from "clean-css";
import * as terser from "terser"; // ✅ FIXED!

const dir = "./";

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

  try {
    let minified;
    if (ext === ".html") {
      minified = await minifyHTML(content, htmlOptions);
    } else if (ext === ".css") {
      minified = new CleanCSS({ level: 2 }).minify(content).styles;
    } else if (ext === ".js") {
      const result = await terser.minify(content);
      minified = result.code;
    }

    if (minified) {
      fs.writeFileSync(fullPath, minified);
      console.log(`✅ Minified: ${file}`);
    }
  } catch (err) {
    console.error(`❌ Failed to minify ${file}:`, err.message);
  }
});
