import * as vscode from 'vscode';
import { ProjectTreeProvider } from '../providers/projectTreeProvider';

export class RefreshTreeCommand {
    constructor(private treeProvider: ProjectTreeProvider) {}

    execute(): void {
        this.treeProvider.refresh();
        vscode.window.showInformationMessage('Project templates refreshed');
    }
}
