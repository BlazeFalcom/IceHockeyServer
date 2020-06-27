var shell = require("shelljs");
shell.exec("killport 12001");
shell.exec("killport 12002");
shell.exec("killport 12003");
shell.exec("killport 12004");
shell.exec("killport 12005");
shell.exec("killport 12006");
shell.exec("npm run server");