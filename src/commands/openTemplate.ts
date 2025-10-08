import * as vscode from 'vscode';
import { ProjectTemplate } from '../models/projectTemplate';
import { WebviewManager } from '../webview/webviewManager';
import { CreateProjectCommand } from './createProject';

export class OpenTemplateCommand {
    constructor(
        private webviewManager: WebviewManager,
        private createProjectCommand: CreateProjectCommand
    ) {}

    async execute(template: ProjectTemplate): Promise<void> {
        try {
            // Show configuration panel
            const options = await this.webviewManager.showConfigurationPanel(template);

            if (options) {
                // User submitted the form, create the project
                await this.createProjectCommand.execute(options);
            } else {
                // User cancelled
                vscode.window.showInformationMessage('Project creation cancelled');
            }
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to open template: ${error.message}`);
        }
    }
}
