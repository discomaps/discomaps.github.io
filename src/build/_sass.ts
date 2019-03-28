import * as fs from "fs";
import * as sass from "node-sass";

import { config } from "./_config";
import * as log from "./logging";
const {
    styles: { outFilePath, inFilePath, outDirPath },
} = config;

const outFileMapPath = outFilePath + ".map";

function deleteFilesIfExist() {
    if (fs.existsSync(outFilePath)) {
        fs.unlinkSync(outFilePath);
    }

    if (fs.existsSync(outFileMapPath)) {
        fs.unlinkSync(outFileMapPath);
    }
}

function createFiles() {
    try {
        if (!fs.existsSync(outDirPath)) {
            fs.mkdirSync(outDirPath, { recursive: true });
        }

        fs.closeSync(fs.openSync(outFilePath, "w"));
        fs.closeSync(fs.openSync(outFileMapPath, "w"));
    } catch (e) {
        log.logError("creation failed of ouput files failed");
        throw e;
    }
}

function compileSassAsyncFunc(resolve: () => any, reject: () => any) {
    deleteFilesIfExist();
    createFiles();

    sass.render(
        {
            file: inFilePath,
            outFile: outFilePath,
            sourceMap: true,
            sourceMapEmbed: true,
        },
        (error, result) => {
            if (error) {
                log.logError((error as any).formatted);
                reject();
            }

            if (!result || !result.css) {
                log.logError("the result of sass compilation is empty.");
                reject();
            }

            try {
                fs.writeFileSync(outFilePath, result.css);
                fs.writeFileSync(outFileMapPath, result.map);
            } catch (error) {
                if (error) {
                    log.logError(JSON.stringify(error));
                }
                reject();
            }

            log.logSuccess("sass has been successfully built.");
            resolve();
        },
    );
}

export const compileSassAsync = () => new Promise(compileSassAsyncFunc);
