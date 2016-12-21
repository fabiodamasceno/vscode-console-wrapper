import * as vscode from 'vscode'

let ConsoleWrapper = {
    wrap : (text: string, indentation = '') => {
        return `\n${indentation}console.log("${text} ", ${text});`;
    }
};

export default ConsoleWrapper;