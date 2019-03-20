import { performPostcssStep } from "./_post";
import { compileSassAsync } from "./_sass";

import * as log from "./logging";

export const buildStyles = () => {
    compileSassAsync()
        .then(performPostcssStep)
        .catch((e) => {
            log.logError("error during build styles ocurred.");
            log.logError(JSON.stringify(e));
        });
};
