import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import * as fs from "fs";
import postcss from "postcss";

import { config } from "./_config";
import * as log from "./logging";
const {
    styles: { outFilePath },
} = config;

const configuredCssNano = cssnano({
    calc: true,
    colormin: true,
    discardComments: {
        removeAll: true,
    },
    discardDuplicates: true,
    discardEmpty: true,
    discardOverridden: true,
    mergeLonghand: true,
    mergeRules: true,
    minifyFontValues: true,
    minifyParams: true,
    normalizeCharset: true,
    orderedValues: true,
    safe: true,
    uniqueSelectors: true,
});

export function performPostcssStep() {
    const compiledSass = fs.readFileSync(outFilePath, "utf8");

    postcss([autoprefixer, configuredCssNano])
        .process(compiledSass, { from: outFilePath, to: outFilePath })
        .then((result: any) => {
            fs.writeFile(outFilePath, result.css, log.logError);

            log.logSuccess("postcss step has been successfully finished.");
        })
        .catch((error: any) => {
            log.logError("an error ocurred during postcss step.");
            log.logError(JSON.stringify(error));
        });
}
