const config = require("./task/config");
const { printHeader } = require("./task/utils");
const runTaskDemo = require("./task/demo");


printHeader(`${config.APP_NAME} v${config.VERSION}`);

runTaskDemo();
