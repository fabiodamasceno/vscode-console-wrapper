'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand("extension.consoleWrapper", () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var expandedSelection = undefined;
        expandedSelection = getSelection(editor);
        if (expandedSelection) {
            var word = editor.document.getText(expandedSelection);
            if (word) {
                editor.edit((currentText) => { 
                    let newText = '\n console.log("' + word + ': " , ' + word +');';
                    currentText.insert(new vscode.Position(expandedSelection._end._line, 100000), newText);
                });
            }
        }
    });

    context.subscriptions.push(disposable);
}

function getSelection(editor: vscode.TextEditor): vscode.Selection {
    const selection = editor.selection;
    if (selection.isEmpty) {
        const wordRange = editor.document.getWordRangeAtPosition(selection.active);
        if (typeof wordRange != 'undefined') {
            var expandedSelection = new vscode.Selection(wordRange.start.line, wordRange.start.character, wordRange.end.line, wordRange.end.character);
            return expandedSelection;
        } else {
            return undefined;
        }
    } else {
        return selection;
    }
}
