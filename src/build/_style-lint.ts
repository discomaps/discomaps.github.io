import * as stylelint from "stylelint";

import { config } from "./_config";
import * as log from "./logging";
const {
    styles: { allSrcFiles },
} = config;

export function lintStyles() {
    stylelint
        .lint({
            files: allSrcFiles,
            formatter: "compact",
        })
        .then((data) => {
            if (data.output) {
                log.logInfo("style-lint found several issues");
                log.logInfo(data.output);
            } else {
                log.logSuccess("style-lint found no issues");
            }
        })
        .catch((err) => {
            log.logError(err);
        });
}
