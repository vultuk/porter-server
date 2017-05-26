import {LogMessage} from "../types/log-message.type";

/**
 * Class used to output system messages.
 */
export class Log {

    /**
     * Outputs the message to the console with the appropriate colors for the CLI.
     *
     * @param message - LogMessage class populated with appropriate data.
     */
    static output(message: LogMessage): void {
        // Generate a string holding the direct output of our message.
        console.log(`${message.color} 
        ${('0' + message.timestamp.getDate()).slice(-2)}/${('0' + message.timestamp.getMonth()).slice(-2)}/${message.timestamp.getFullYear()}
        ${('0' + message.timestamp.getHours()).slice(-2)}:${('0' + message.timestamp.getMinutes()).slice(-2)}:${('0' + message.timestamp.getSeconds()).slice(-2)}
         - [${message.type}] ${message.message}\x1b[0m`);
    }

    /**
     * Logs a error message.
     *
     * @param message - A string holding the message to be displayed.
     */
    static error(message: string) {
        this.output({timestamp: new Date(), type: 'error', message: message, color: "\x1b[31m"} as LogMessage);
    }

    /**
     * Logs a warning message.
     *
     * @param message - A string holding the message to be displayed.
     */
    static warning(message: string) {
        this.output({timestamp: new Date(), type: 'warning', message: message, color: "\x1b[33m"} as LogMessage);
    }

    /**
     * Logs a simple notice
     *
     * @param message - A string holding the message to be displayed.
     */
    static notice(message: string) {
        this.output({timestamp: new Date(), type: 'notice', message: message, color: "\x1b[37m"} as LogMessage);
    }

    /**
     * Logs a simple debug message
     *
     * @param message - A string holding the message to be displayed.
     */
    static debug(message: string) {
        this.output({timestamp: new Date(), type: 'debug', message: message, color: "\x1b[35m"} as LogMessage);
    }

    /**
     * Logs a simple notice
     *
     * @param message - A string holding the message to be displayed.
     */
    static info(message: string) {
        this.output({timestamp: new Date(), type: 'info', message: message, color: "\x1b[36m"} as LogMessage);
    }
}