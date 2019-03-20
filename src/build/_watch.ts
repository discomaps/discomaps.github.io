import * as bs from "browser-sync";

const bsServer = bs.create("My server");
const bsProxy = bs.create("My proxy server");

import { buildStyles } from "./_build-styles";
import { config } from "./_config";
import * as log from "./logging";

const {
    styles: { outFilePath: stylesOutPath, allSrcFiles: allStylesSrcFiles },
    html: { outFilePath: htmlOutPath },
    scripts: { outFilePath: scriptsOutPath },
} = config;

// reload 'localhost:3005' when dist css or html changes
function startProxy() {
    bsProxy.init(
        {
            files: [stylesOutPath, htmlOutPath, scriptsOutPath],
            injectChanges: true,
            port: 3004,
            proxy: "localhost:3005",
            watchOptions: {
                awaitWriteFinish: {
                    pollInterval: 100,
                    stabilityThreshold: 700,
                },
            },
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
}

export function runServerAndProxy() {
    // run compileSassAsync when sass changes
    bsProxy.watch(allStylesSrcFiles).on("change", buildStyles);

    bsServer.init(
        {
            online: false,
            open: false,
            port: 3005,
            server: "./",
            ui: false,
        },
        (e) => {
            if (e) {
                log.logError(JSON.stringify(e));
                log.logError("failed to run browser-sync server");
                return;
            }
            log.logSuccess("browser-sync server initiated.");
        },
    );

    bsServer.emitter.on("init", () => {
        log.logSuccess("Server initiated.");
        startProxy();
    });
}
