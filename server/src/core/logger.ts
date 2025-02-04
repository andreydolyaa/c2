import { createLogger, format, transports, addColors } from "winston";

const { combine, timestamp, printf, colorize } = format;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    verbose: "cyan",
    debug: "blue",
    silly: "gray",
  },
};

addColors(customLevels.colors);

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  levels: customLevels.levels,
  format: combine(
    timestamp({ format: "DD-MM-YY HH:mm:ss" }),
    colorize({ all: true }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    // new transports.File({
    //   filename: "logs/app.log",
    //   format: combine(timestamp({ format: "DD-MM-YY HH:mm:ss" }), myFormat),
    // }),
  ],
});

export default logger;