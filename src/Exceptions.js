/**
 *
 */
class ExceptionException extends Error {
    constructor(message, throwable) {
        super(message + '\n' + throwable.message);
    }
}

class TemplateException extends ExceptionException {
    constructor(message, throwable, line) {
        super(message + " " + line, throwable);
    }
}

module.exports = {
    ValueExprException: class extends ExceptionException {},
    TemplateException: TemplateException
};
