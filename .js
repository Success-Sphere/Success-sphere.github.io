import fs from "fs";
import path from "path";
import { minify as jsMinify } from "terser";
import CleanCSS from "clean-css";
import { minify as htmlMinify } from "html-minifier-terser";
const codeExtensions = ["js", "css", "html"];
const selfFile = path.basename(new URL(import.meta.url).pathname);
const minifyFile = async (file) => {
  const ext = path.extname(file).slice(1);
  try {
    const content = fs.readFileSync(file, "utf8");
    let minified = "";
    if (ext === "js") {
      const result = await jsMinify(content, {
        compress: false,
        mangle: false,
        format: { comments: true },
      });
      minified = result.code;
    } else if (ext === "css") {
      const result = new CleanCSS({
        level: 1,
        format: "keep-breaks",
      }).minify(content);
      minified = result.styles;
    } else if (ext === "html") {
      minified = await htmlMinify(content, {
        collapseWhitespace: true,
        removeComments: false,
        removeOptionalTags: false,
        minifyJS: false,
        minifyCSS: false,
      });
    }
    fs.writeFileSync(file, minified);
    console.log(`✅ Minified safely: ${file}`);
  } catch (err) {
    console.error(`❌ Error in ${file}: ${err.message}`);
  }
};
(async () => {
  const allFiles = fs
    .readdirSync("./")
    .filter(
      (file) =>
        file !== selfFile &&
        codeExtensions.some((ext) => file.endsWith(`.${ext}`))
    );

  for (const file of allFiles) {
    await minifyFile(file);
  }
})();
