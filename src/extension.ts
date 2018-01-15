'use strict';
import * as vscode from 'vscode';
import consoleWrapper from './consoleWrapper';
import {paste, copy} from 'copy-paste';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand("extension.consoleWrapper", () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const expandedSelection = getSelection(editor);
        if (expandedSelection) {
            const text = editor.document.getText(expandedSelection);
            if (text) {
                editor.edit((currentText) => {
                    currentText.insert(new vscode.Position(expandedSelection.end.line, 100000), consoleWrapper.wrap(text, getLineIndentation(expandedSelection)));
                });
            }
        } else {
            paste((cb, clipboardContent) => {
                if (!!clipboardContent) {
                    const selection = editor.selection;
                    editor.edit((currentText) => {
                        currentText.insert(new vscode.Position(selection.active.line, selection.active.character), consoleWrapper.wrap(clipboardContent));
                    });
                }
            });
        }
    });

    context.subscriptions.push(disposable);
}

function getSelection(editor: vscode.TextEditor): vscode.Selection {
    const selection = editor.selection;
    if (selection.isEmpty) {
        const wordRange = editor.document.getWordRangeAtPosition(selection.active);
        return !!wordRange ?
                new vscode.Selection(wordRange.start.line, wordRange.start.character,
                wordRange.end.line, wordRange.end.character) : null
    }
    return selection;
}

function getLineIndentation(selection: vscode.Selection) {
    const { document, options: { tabSize, insertSpaces } } = vscode.window.activeTextEditor
    const indentStr = insertSpaces ? new Array((tabSize as number) + 1).join(' ') : '\t'

    const line = document.lineAt(selection.active.line)
    let indentLength = line.firstNonWhitespaceCharacterIndex
    if (/\{$/.test(line.text)) {
        indentLength++
    }
    return new Array(indentLength).join(indentStr)
}