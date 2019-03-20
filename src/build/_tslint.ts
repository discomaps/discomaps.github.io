import * as fs from "fs-extra";
import * as glob from "glob";
import * as tslint from "tslint";

import { config } from "./_config";
const {
    scripts: { inDirPath, buildDirPath },
} = config;
import * as log from "./logging";

export function lintTypescript() {
    const options: tslint.ILinterOptions = {
        fix: false,
        formatter: "stylish",
        formattersDirectory: null,
        rulesDirectory: null,
    };

    const linter = new tslint.Linter(options);

    const filePaths = glob.sync(inDirPath + "/**/*.ts?(x)").concat(glob.sync(buildDirPath + "/**/*.ts?(x)"));

    const filesWithErrors = [];
    filePaths.forEach((path) => {
        const fileContents = fs.readFileSync(path, "utf8");

        const configuration = tslint.Configuration.findConfiguration("./tslint.json", path).results;

        linter.lint(path, fileContents, configuration);
        const result = linter.getResult();

        if (result.errorCount > 0) {
            filesWithErrors.push({
                errorsCount: result.errorCount,
                path,
            });

            log.logError(result.output);
        }

        (linter as any).failures = [];
        (linter as any).fixes = [];
    });

    if (filesWithErrors.length === 0) {
        log.logSuccess("Typescript linter check found no errors!");
    }
}
