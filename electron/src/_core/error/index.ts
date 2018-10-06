export class FileNotFoundError extends Error {

    constructor(path: string | any) {
        super();
        this.name = 'FileNotFoundError';
        this.message = `File Not Found: ${path}`;
    }

};

export class UserCancelledError extends Error {
    constructor(operationName = 'the operation') {
        super();
        this.name = 'UserCancelledError';
        this.message = `The user cancelled ${operationName}`;
    }
};

export class FormNotFoundError extends Error {

    constructor(name: string) {
        super();
        this.name = 'FormNotFoundError';
        this.message = 'FormComplete not found: ' + name;
    }

};

export class FailedConversionError extends Error {

    constructor(reason: string) {
        super();
        this.name = 'FailedConversionError';
        this.message = 'Failed to convert XML: ' + reason;
    }

}


export class MissingArgumentError extends Error {

    constructor(argumentName: string) {
        super();
        this.name = 'MissingArgumentError';
        this.message = `Missing expected argument ${argumentName}`;
    }
}

export class IncorrectTypeError extends Error {

    constructor(expected: any, found: any, name: string) {
        super();
        this.name = 'IncorrectTypeError';
        this.message = `Expected ${expected}. Found ${found}` + (name ?
            ` in ${name}` : '');
    }
}
