const ConsoleWrapper = {
    wrap : (text: string, indentation = '') => `\n${indentation}console.log("${text} ", ${text});`
};

export default ConsoleWrapper;