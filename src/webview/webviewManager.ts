import * as vscode from 'vscode';
import * as path from 'path';
import { ProjectTemplate } from '../models/projectTemplate';
import { ProjectCreationOptions } from '../models/projectConfig';
import { CreationProgress } from '../models/creationProgress';

export class WebviewManager {
    private currentPanel: vscode.WebviewPanel | undefined;

    constructor(private extensionPath: string) {}

    async showConfigurationPanel(template: ProjectTemplate): Promise<ProjectCreationOptions | undefined> {
        return new Promise((resolve) => {
            this.currentPanel = vscode.window.createWebviewPanel(
                'dotnetProjectConfig',
                `Configure ${template.name}`,
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true
                }
            );

            this.currentPanel.webview.html = this.getConfigurationHtml(template);

            this.currentPanel.webview.onDidReceiveMessage(
                message => {
                    switch (message.command) {
                        case 'submit':
                            resolve(message.data);
                            this.currentPanel?.dispose();
                            break;
                        case 'cancel':
                            resolve(undefined);
                            this.currentPanel?.dispose();
                            break;
                    }
                }
            );

            this.currentPanel.onDidDispose(() => {
                resolve(undefined);
                this.currentPanel = undefined;
            });
        });
    }

    async showProgressPanel(): Promise<vscode.WebviewPanel> {
        const panel = vscode.window.createWebviewPanel(
            'dotnetProjectProgress',
            'Creating .NET Project',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        panel.webview.html = this.getProgressHtml();
        return panel;
    }

    updateProgress(panel: vscode.WebviewPanel, progress: CreationProgress): void {
        panel.webview.postMessage({
            command: 'updateProgress',
            progress: progress
        });
    }

    showCompletionPanel(success: boolean, projectPath?: string, error?: string): void {
        const panel = vscode.window.createWebviewPanel(
            'dotnetProjectCompletion',
            success ? 'Project Created Successfully' : 'Project Creation Failed',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        panel.webview.html = this.getCompletionHtml(success, projectPath, error);
    }

    private getConfigurationHtml(template: ProjectTemplate): string {
        const config = vscode.workspace.getConfiguration('dotnetCreator');
        const defaultPath = config.get<string>('defaultProjectPath') || '';
        const gitAutoInit = config.get<boolean>('gitAutoInit') || true;
        const openAfterCreate = config.get<boolean>('openAfterCreate') || true;

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configure ${template.name}</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            padding: 20px;
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
        }
        h1 { margin-top: 0; }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="text"], select {
            width: 100%;
            padding: 8px;
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 2px;
        }
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .button-group {
            margin-top: 30px;
            display: flex;
            gap: 10px;
        }
        button {
            padding: 8px 20px;
            cursor: pointer;
            border: none;
            border-radius: 2px;
        }
        .btn-primary {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
        }
        .btn-secondary {
            background-color: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
        }
        .description {
            color: var(--vscode-descriptionForeground);
            font-size: 0.9em;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Configure ${template.name}</h1>
    <p class="description">${template.description}</p>
    
    <form id="configForm">
        <div class="form-group">
            <label for="projectName">Project Name*</label>
            <input type="text" id="projectName" name="projectName" required placeholder="MyProject">
        </div>
        
        <div class="form-group">
            <label for="projectPath">Project Path*</label>
            <input type="text" id="projectPath" name="projectPath" required 
                   value="${defaultPath}" placeholder="/path/to/project">
        </div>
        
        <div class="form-group">
            <label for="framework">Target Framework</label>
            <select id="framework" name="framework">
                <option value="">Default</option>
                <option value="net8.0">NET 8.0</option>
                <option value="net7.0">NET 7.0</option>
                <option value="net6.0">NET 6.0</option>
            </select>
        </div>
        
        <div class="form-group checkbox-group">
            <input type="checkbox" id="createSolution" name="createSolution" checked>
            <label for="createSolution">Create solution file</label>
        </div>
        
        <div class="form-group checkbox-group">
            <input type="checkbox" id="initializeGit" name="initializeGit" ${gitAutoInit ? 'checked' : ''}>
            <label for="initializeGit">Initialize Git repository</label>
        </div>
        
        <div class="form-group checkbox-group">
            <input type="checkbox" id="openInNewWindow" name="openInNewWindow" ${openAfterCreate ? 'checked' : ''}>
            <label for="openInNewWindow">Open in new window</label>
        </div>
        
        <div class="button-group">
            <button type="submit" class="btn-primary">Create Project</button>
            <button type="button" class="btn-secondary" onclick="cancel()">Cancel</button>
        </div>
    </form>
    
    <script>
        const vscode = acquireVsCodeApi();
        
        document.getElementById('configForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            const data = {
                projectName: formData.get('projectName'),
                projectPath: formData.get('projectPath'),
                templateId: '${template.dotnetTemplate}',
                framework: formData.get('framework') || undefined,
                createSolution: formData.get('createSolution') === 'on',
                initializeGit: formData.get('initializeGit') === 'on',
                openInNewWindow: formData.get('openInNewWindow') === 'on'
            };
            
            vscode.postMessage({
                command: 'submit',
                data: data
            });
        });
        
        function cancel() {
            vscode.postMessage({
                command: 'cancel'
            });
        }
    </script>
</body>
</html>`;
    }

    private getProgressHtml(): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creating Project</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            padding: 20px;
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
        }
        .progress-container {
            max-width: 600px;
            margin: 0 auto;
        }
        h1 { text-align: center; }
        .progress-bar {
            width: 100%;
            height: 20px;
            background-color: var(--vscode-progressBar-background);
            border-radius: 10px;
            overflow: hidden;
            margin: 20px 0;
        }
        .progress-fill {
            height: 100%;
            background-color: var(--vscode-button-background);
            transition: width 0.3s ease;
            width: 0%;
        }
        .progress-text {
            text-align: center;
            margin: 10px 0;
        }
        .step-list {
            list-style: none;
            padding: 0;
        }
        .step-item {
            padding: 10px;
            margin: 5px 0;
            border-left: 3px solid transparent;
        }
        .step-item.completed {
            border-color: var(--vscode-terminal-ansiGreen);
            opacity: 0.6;
        }
        .step-item.current {
            border-color: var(--vscode-button-background);
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="progress-container">
        <h1>Creating .NET Project</h1>
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
        <div class="progress-text" id="progressText">Initializing...</div>
        <ul class="step-list" id="stepList"></ul>
    </div>
    
    <script>
        const vscode = acquireVsCodeApi();
        
        window.addEventListener('message', event => {
            const message = event.data;
            if (message.command === 'updateProgress') {
                const progress = message.progress;
                const percentage = (progress.step / progress.totalSteps) * 100;
                
                document.getElementById('progressFill').style.width = percentage + '%';
                document.getElementById('progressText').textContent = progress.message;
            }
        });
    </script>
</body>
</html>`;
    }

    private getCompletionHtml(success: boolean, projectPath?: string, error?: string): string {
        const statusColor = success ? 'var(--vscode-terminal-ansiGreen)' : 'var(--vscode-errorForeground)';
        const statusTitle = success ? 'Project Created Successfully!' : 'Project Creation Failed';
        const statusMessage = success 
            ? `Your project has been created at: ${projectPath}`
            : `An error occurred: ${error}`;

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${statusTitle}</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            padding: 20px;
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            text-align: center;
        }
        .status-icon {
            font-size: 64px;
            margin: 20px 0;
            color: ${statusColor};
        }
        h1 {
            color: ${statusColor};
        }
        .message {
            margin: 20px 0;
            padding: 20px;
            background-color: var(--vscode-textBlockQuote-background);
            border-radius: 4px;
        }
        .path {
            font-family: monospace;
            font-size: 0.9em;
            word-break: break-all;
        }
    </style>
</head>
<body>
    <div class="status-icon">${success ? '✓' : '✗'}</div>
    <h1>${statusTitle}</h1>
    <div class="message">
        <p>${statusMessage}</p>
        ${success && projectPath ? `<p class="path">${projectPath}</p>` : ''}
    </div>
</body>
</html>`;
    }
}
