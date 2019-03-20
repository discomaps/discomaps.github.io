// tslint:disable-next-line:no-var-requires
require("colors");

export function logSuccess(message: any) {
    if (message) {
        // tslint:disable-next-line:no-console
        console.log(message.green);
    }
}

export function logError(message: any) {
    if (message) {
        // tslint:disable-next-line:no-console
        console.log(message.red);
    }
}

export function logInfo(message: any) {
    if (message) {
        // tslint:disable-next-line:no-console
        console.log(message.blue);
    }
}
