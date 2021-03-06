
import * as assert from 'assert';
import * as vscode from 'vscode';
import consoleWrapper from '../src/consoleWrapper';
suite('Console Wrapper Tests', () => {
    
    test('Wrap a simple text with console.log', () => {
        assert.equal(consoleWrapper.wrap('wrap me'), '\nconsole.log("wrap me ", wrap me);')
    });
    
    test('Wrap a function call with console.log', () => {
        assert.equal(consoleWrapper.wrap('butheresmynumber(callmemaybe)'), '\nconsole.log("butheresmynumber(callmemaybe) ", butheresmynumber(callmemaybe));')
    });
    
    test('Wrap a complex quotation with console.log', () => {
        assert.equal(consoleWrapper.wrap('butheresmynumber("callmemaybe")"'), '\nconsole.log("butheresmynumber("callmemaybe")" ", butheresmynumber("callmemaybe")");')
    });
});