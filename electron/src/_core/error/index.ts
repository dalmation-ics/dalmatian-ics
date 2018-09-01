module.exports = {

    FileNotFoundError: class extends Error {

        constructor(path) {
            super();
            this.name = 'FileNotFoundError';
            this.message = `File Not Found: ${path}`;
        }

    },

    UserCancelledError: class extends Error {
        constructor(operationName = 'the operation') {
            super();
            this.name = 'UserCancelledError';
            this.message = `The user cancelled ${operationName}`;
        }
    },

    FormNotFoundError: class extends Error {

        constructor(name) {
            super();
            this.name = 'FormNotFoundError';
            this.message = 'Form not found: ' + name;
        }

    },

    FailedConversionError: class extends Error {

        constructor(reason) {
            super();
            this.name = 'FailedConversionError';
            this.message = 'Failed to convert XML: ' + reason;
        }

    },

};
