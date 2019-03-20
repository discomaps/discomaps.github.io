export const config = {
    html: {
        outFilePath: "./index.html",
    },
    scripts: {
        buildDirPath: "./src/build",
        inDirPath: "./src/scripts",
        inFilePath: "./src/scripts/index.tsx",
        outDirPath: "./dist/js",
        outFileName: "index.js",
        outFilePath: "./dist/js/index.js",
    },
    styles: {
        allSrcFiles: "./src/styles/**/*.scss",
        inFilePath: "./src/styles/index.scss",
        outFilePath: "./dist/styles/index.css",
    },
};
