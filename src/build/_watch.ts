import * as bs from "browser-sync";

const bsProxy = bs.create("My proxy server");

import { buildStyles } from "./_build-styles";
import { config } from "./_config";
import * as log from "./logging";

const {
    styles: { outFilePath: stylesOutPath, allSrcFiles: allStylesSrcFiles },
    html: { outFilePath: htmlOutPath },
    scripts: { outFilePath: scriptsOutPath },
} = config;

// reload 'localhost:xxxx' when dist css or html changes
export function runServerAndProxy() {
    bsProxy.init(
        {
            server: "./",
        },
        (e) => {
            if (e) {
                log.logError(JSON.stringify(e));
                log.logError("failed to run browser-sync proxy");
                return;
            }
            log.logSuccess("browser-sync proxy initiated.");
        },
    );

    bsProxy.watch(allStylesSrcFiles).on("change", buildStyles);

    bsProxy.watch(stylesOutPath).on("change", () => bsProxy.reload());
    bsProxy.watch(htmlOutPath).on("change", () => bsProxy.reload());
    bsProxy.watch(scriptsOutPath).on("change", () => bsProxy.reload());
}