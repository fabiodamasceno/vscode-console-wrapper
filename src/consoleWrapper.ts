
let ConsoleWrapper = {
    wrap : (text: string) => {
        return `\n console.log("${text} ", ${text});`;
    }
};

export default ConsoleWrapper;