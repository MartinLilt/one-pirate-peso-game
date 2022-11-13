const pkg = require("./package");
const format = require("string-template");
const del = require("del");
const path = require("path");
const fs = require("fs");
const browserSync = require("browser-sync");
const named = require("vinyl-named");
const webpack = require("webpack-stream");
const gulp = require("gulp");
const glob = require("glob");
const Jimp = require("jimp");
const $ = require("gulp-load-plugins")();
const sass = require("gulp-sass")(require("node-sass"));

const gulpConfig = (() => {
  // template variable
  function template(variable, vars) {
    if (
      (variable !== null && typeof variable === "object") ||
      Array.isArray(variable)
    ) {
      for (const k in variable) {
        variable[k] = template(variable[k], vars);
      }
    }
    if (typeof variable === "string") {
      variable = format(variable, vars);
    }
    return variable;
  }
  return template(pkg.gulp_config, pkg.gulp_config.variables);
})();

/**
 * Get Header Comment
 * @param type
 */
function getHeaderComment(type = "css") {
  let string = `/*!-----------------------------------------------------------------
    Name: ${pkg.title} - ${pkg.description}
    Version: ${pkg.version}
    Author: ${pkg.author}
    Website: ${pkg.website}
    Purchase: ${pkg.purchase}
    Support: ${pkg.support}
    License: ${pkg.license}
    Copyright ${new Date().getFullYear()}.
-------------------------------------------------------------------*/
    `;

  // change css header comment to html comment
  if (type === "html") {
    string = string
      .replace(/\* /g, " ")
      .replace(
        /\/\*!-----------------------------------------------------------------/g,
        "<!--"
      )
      .replace(
        /-------------------------------------------------------------------\*\//g,
        "-->"
      );
  }

  return string;
}

/**
 * Error Handler for gulp-plumber
 */
function errorHandler(err) {
  console.error(err);
  this.emit("end");
}

/**
 * Clean Task
 */
gulp.task("clean", (cb) => {
  del([gulpConfig.variables.dist, gulpConfig.variables.deploy]).then(() => {
    cb();
  });
});

/**
 * BrowserSync Task
 */
gulp.task("browserSyncTask", () => {
  $.connectPhp.server(gulpConfig.php, () => {
    browserSync(gulpConfig.browserSync);
  });
});

/**
 * HTML Task
 */
gulp.task("html", () => {
  // get data for nunjucks templates
  function getData(file) {
    const data = JSON.parse(fs.readFileSync(gulpConfig.html.dataFile, "utf8"));
    data.file = file;
    data.ENV = process.env.NODE_ENV;
    data.filename = path.basename(file.path);
    data.headerComment = getHeaderComment("html");

    // active menu item for menu
    data.isActiveMenuItem = function (file, item, filename) {
      if (file === filename || (item.sub && item.sub[filename])) {
        return true;
      }

      if (item.sub) {
        for (const fileSub in item.sub) {
          const itemSub = item.sub[fileSub];

          if (fileSub === filename || (itemSub.sub && itemSub.sub[filename])) {
            return true;
          }
        }
      }

      return false;
    };

    return data;
  }

  return (
    gulp
      .src(gulpConfig.html.from)
      .pipe($.if(process.env.NODE_ENV === "dev", $.plumber({ errorHandler })))
      .pipe($.data(getData))
      .pipe(
        $.nunjucksRender({
          path: gulpConfig.html.renderPath,
          envOptions: {
            watch: false,
          },
        })
      )
      .pipe(
        $.if(
          process.env.NODE_ENV === "production" && gulpConfig.production.cdn,
          $.cdnizer({
            defaultCDNBase: gulpConfig.production.cdn,
            // relativeRoot: 'css',
            matchers: [/(<a\s.*?href=["'])(.+?)(["'].*?>)/gi],
            files: ["**/*.{gif,png,jpg,jpeg,svg,ico,css,js}"],
          })
        )
      )
      // htmtidy works almost ok, but removed empty tags (icons).
      // .pipe($.if(process.env.NODE_ENV === 'deploy', $.htmltidy(gulpConfig.html.htmltidy)))
      .pipe($.prettify({ indent_size: 4, unformatted: ["pre", "code"] }))
      .pipe(gulp.dest(gulpConfig.html.to))
      .on("end", () => {
        browserSync.reload();
      })
  );
});

/**
 * Generate CSS Comments for Envato Rules.
 * @param cont
 * @returns {*}
 */
function generateCSSComments(cont) {
  const templateStart = "{{table_of_contents}}";
  const isset = cont.indexOf(templateStart);
  if (isset > -1) {
    const rest = cont.substring(isset);
    const reg = /\/\*-[-]*?\n([\s\S]*?)\n[ -]*?-\*\//g;
    let titles = reg.exec(rest);
    let i = 1;
    let result = "";
    while (titles !== null) {
      if (titles[1]) {
        const isSub = !/\n/.test(titles[1]);
        const str = titles[1].replace(/^\s+|\s+$/g, "");
        if (!isSub) {
          result += `\n  ${i}. `;
          i++;
        } else {
          result += "\n    - ";
        }
        result += str;
      }
      titles = reg.exec(rest);
    }

    cont = cont.replace(templateStart, result);
  }
  return cont;
}

/**
 * CSS Task
 */
gulp.task("css", () => {
  return gulp
    .src(gulpConfig.css.from)
    .pipe($.if(process.env.NODE_ENV === "dev", $.plumber({ errorHandler })))
    .pipe(sass(gulpConfig.css.sass))
    .pipe($.autoprefixer())
    .pipe($.change(generateCSSComments))
    .pipe($.header(getHeaderComment()))
    .pipe(
      $.if(process.env.NODE_ENV !== "production", gulp.dest(gulpConfig.css.to))
    )
    .pipe(browserSync.stream())
    .pipe($.if(process.env.NODE_ENV !== "dev", $.cleanCss()))
    .pipe(
      $.rename({
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest(gulpConfig.css.to));
});

/**
 * JS Task
 */
gulp.task("js", () => {
  return gulp
    .src(gulpConfig.js.from)
    .pipe($.if(process.env.NODE_ENV === "dev", $.plumber({ errorHandler })))
    .pipe(named())
    .pipe(
      webpack({
        mode: "none",
        module: {
          rules: [
            {
              test: /\.js$/,
              loader: "babel-loader",
            },
          ],
        },
      })
    )
    .pipe(
      $.if(
        process.env.NODE_ENV === "production",
        $.change((cont) => {
          let replaceString = "";

          // Usage protection only for selected domain name
          if (
            gulpConfig.production.protect &&
            gulpConfig.production.protect.length === 3
          ) {
            replaceString += `
                    if ('${gulpConfig.production.protect[0]}' !== window.location.hostname) {
                        document.body.innerHTML = '';
                        alert('${gulpConfig.production.protect[1]}');
                        window.location.replace('${gulpConfig.production.protect[2]}');
                    }
                `;
          }

          // Google Analytics
          if (gulpConfig.production.google_analytics) {
            replaceString += `
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                    ga('create', '${gulpConfig.production.google_analytics}', 'auto');
                    ga('send', 'pageview');
                `;
          }

          cont = cont.replace("// prt:sc:dm", replaceString);
          return cont;
        })
      )
    )
    .pipe(
      $.if(
        process.env.NODE_ENV === "production",
        $.javascriptObfuscator({
          compact: true,
        })
      )
    )
    .pipe(
      $.if(
        (file) => !file.path.match(/-init.js$/),
        $.header(getHeaderComment())
      )
    )
    .pipe(
      $.if(
        (file) =>
          process.env.NODE_ENV !== "production" &&
          !file.path.match(/-init.js$/),
        gulp.dest(gulpConfig.js.to)
      )
    )
    .pipe(
      $.if(
        (file) =>
          process.env.NODE_ENV !== "dev" && !file.path.match(/-init.js$/),
        $.uglify()
      )
    )
    .pipe(
      $.if(
        (file) => !file.path.match(/-init.js$/),
        $.rename({
          extname: ".min.js",
        })
      )
    )
    .pipe($.header(getHeaderComment()))
    .pipe($.if(process.env.NODE_ENV === "dev", $.sourcemaps.write(".")))
    .pipe(gulp.dest(gulpConfig.js.to))
    .pipe(browserSync.stream());
});

/**
 * Static Task
 */
let staticCount = 0;
function staticTask(cb) {
  const staticArr = gulpConfig.static;
  if (staticArr.length && typeof staticArr[staticCount] !== "undefined") {
    gulp
      .src(staticArr[staticCount].from)
      .pipe($.changed(staticArr[staticCount].to)) // Ignore unchanged files
      .pipe(gulp.dest(staticArr[staticCount].to))
      .on("end", () => {
        staticCount++;
        staticTask(cb);
      });
  } else {
    staticCount = 0;
    browserSync.reload();
    cb();
  }
}
gulp.task("static", staticTask);

/**
 * Images Task
 */
gulp.task("images", () => {
  return gulp
    .src(gulpConfig.images.from)
    .pipe($.if(process.env.NODE_ENV === "dev", $.plumber({ errorHandler })))
    .pipe($.changed(gulpConfig.images.to)) // Ignore unchanged files
    .pipe(gulp.dest(gulpConfig.images.to))
    .pipe(browserSync.stream());
});

/**
 * Async foreach.
 *
 * @param {Array} array - items.
 * @param {Function} callback callback.
 */
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Images Placeholders Task
 */
gulp.task("deploy-image-placeholders", async (cb) => {
  let placeholders = gulpConfig.deploy.imagePlaceholders.from;
  const placeholdersIgnore = gulpConfig.deploy.imagePlaceholders.ignore || [];
  const background =
    gulpConfig.deploy.imagePlaceholders.background || "#cccccc";
  const isBackgroundDark =
    gulpConfig.deploy.imagePlaceholders.isBackgroundDark || false;

  if (
    placeholders &&
    Object.prototype.toString.call(placeholders) === "[object Array]"
  ) {
    placeholders = `{${placeholders.join(",")}}`;
  }

  const files = glob.sync(placeholders, { ignore: placeholdersIgnore });

  if (!files || !files.length) {
    cb();
    return;
  }

  const cache = {};

  await asyncForEach(files, async (imagePath) => {
    let w = 0;
    let h = 0;

    await Jimp.read(imagePath)
      .then((img) => {
        w = img.bitmap.width;
        h = img.bitmap.height;

        return img;
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });

    if (cache[w + h]) {
      cache[w + h].write(imagePath);
      return;
    }

    if (!w || !h) {
      return;
    }

    const placeholder = new Jimp(w, h, background);
    const textW = 1920;
    const textH = 140;
    const textImage = new Jimp(textW, textH, background);

    await Jimp.loadFont(
      isBackgroundDark ? Jimp.FONT_SANS_128_WHITE : Jimp.FONT_SANS_128_BLACK
    ).then((font) => {
      textImage.print(
        font,
        0,
        0,
        {
          text: `${w}x${h}`,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_CENTER,
        },
        textW,
        textH
      );

      textImage.resize(w, Jimp.AUTO);

      placeholder.composite(textImage, 0, h / 2 - textImage.bitmap.height / 2);

      cache[w + h] = placeholder;

      placeholder.write(imagePath);
    });
  });

  cb();
});

/**
 * ZIP Task
 */
gulp.task("zip", () => {
  let fromPath = gulpConfig.deploy.zip.from;
  if (fromPath.split("/").length > 1) {
    fromPath = fromPath.split("/");
    fromPath.pop();
    fromPath = fromPath.join("/");
  }

  return gulp
    .src(
      [`${fromPath}/**/*`, `${fromPath}/**/.*`, `!${gulpConfig.deploy.zip.to}`],
      { base: fromPath, follow: true }
    )
    .pipe($.vinylZip.dest(gulpConfig.deploy.zip.to));
});

/**
 * Default Task
 */
gulp.task("default", (cb) => {
  process.env.NODE_ENV = process.env.NODE_ENV || "dev";
  gulp.series("clean", "images", "html", "css", "js", "static", "watch")(cb);
});

/**
 * Watch Task
 */
gulp.task(
  "watch",
  gulp.parallel("browserSyncTask", () => {
    gulpConfig.watch.forEach((item) => {
      $.watch(item.from, gulp.series(item.task));
    });
  })
);

/**
 * Production Task
 */
gulp.task("production", (cb) => {
  process.env.NODE_ENV = process.env.NODE_ENV || "production";
  gulp.series("clean", "images", "html", "css", "js", "static")(cb);
});

/**
 * Deploy Task
 */
gulp.task("deploy", (cb) => {
  process.env.NODE_ENV = process.env.NODE_ENV || "deploy";
  gulp.series(
    "production",
    "move-to-deploy-folder",
    "copy-static-files",
    "deploy-image-placeholders",
    "zip"
  )(cb);
});

// deploy task: move project to deploy folder
gulp.task("move-to-deploy-folder", () => {
  return gulp
    .src(`${gulpConfig.variables.dist}/**/*`)
    .pipe(
      gulp.dest(
        `${gulpConfig.variables.deploy}/${gulpConfig.variables.template_name}/dist`
      )
    );
});

// deploy task: copy static files
let staticDeployCount = 0;
function staticDeployTask(cb) {
  const staticArr = gulpConfig.deploy.static;
  if (staticArr.length && typeof staticArr[staticDeployCount] !== "undefined") {
    gulp
      .src(staticArr[staticDeployCount].from)
      .pipe(gulp.dest(staticArr[staticDeployCount].to))
      .on("end", () => {
        staticDeployCount++;
        staticDeployTask(cb);
      });
  } else {
    staticDeployCount = 0;
    cb();
  }
}
gulp.task("copy-static-files", staticDeployTask);
