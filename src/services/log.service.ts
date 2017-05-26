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
        // Create an array of date items we can join for a nicely formatted string.
        let date = [
            message.timestamp.getDate() < 10 ? "0" + message.timestamp.getDate() : message.timestamp.getDate(),
            message.timestamp.getMonth() < 10 ? "0" + message.timestamp.getMonth() : message.timestamp.getMonth(),
            message.timestamp.getFullYear()
        ];

        // Create an array of time items we can join for a nicely formatted string.
        let time = [
            message.timestamp.getHours() < 10 ? "0" + message.timestamp.getHours() : message.timestamp.getHours(),
            message.timestamp.getMinutes() < 10 ? "0" + message.timestamp.getMinutes() : message.timestamp.getMinutes(),
            message.timestamp.getSeconds() < 10 ? "0" + message.timestamp.getSeconds() : message.timestamp.getSeconds()
        ];

        // Generate a string holding the direct output of our message.
        let fullMessage = message.color + date.join('/') + " " + time.join(':') + " - [" + message.type + "] " + message.message + "\x1b[0m";

        // Send the message to the console.
        console.log(fullMessage);
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