const STORAGE_KEY = 'logLevel';
const DEFAULT_LEVEL = process.env.NODE_ENV !== 'production' ? 'debug' : 'warn';
const LEVELS = ['debug', 'info', 'warn', 'error'];
let minLevel;
const log = {
    debug: createLogHandler('debug'),
    info: createLogHandler('info'),
    warn: createLogHandler('warn'),
    error: createLogHandler('error'),
};
export default log;
export const createLogMiddleware = () => {
    return store => next => action => {
        const result = next(action);
        log.debug('action', action);
        log.debug('next state', store.getState());
        return result;
    };
};
function createLogHandler(level) {
    if (!minLevel)
        minLevel = readLogLevel();
    return LEVELS.indexOf(level) >= LEVELS.indexOf(minLevel)
        ? (msg, ...meta) => console[level](`${level}: ${msg}`, ...meta)
        : () => { };
}
function readLogLevel() {
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            const maybeLevel = window.localStorage.getItem(STORAGE_KEY);
            if (maybeLevel === 'debug' ||
                maybeLevel === 'info' ||
                maybeLevel === 'warn' ||
                maybeLevel === 'error') {
                return maybeLevel;
            }
        }
        catch (error) {
            console.error('Could not read logLevel from localStorage', error);
        }
    }
    return DEFAULT_LEVEL;
}
//# sourceMappingURL=logger.js.map