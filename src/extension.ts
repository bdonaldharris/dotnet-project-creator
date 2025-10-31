import * as vscode from 'vscode';
import { ProjectTreeProvider } from './providers/projectTreeProvider';
import { TemplateProvider } from './providers/templateProvider';
import { WebviewManager } from './webview/webviewManager';
import { CreateProjectCommand } from './commands/createProject';
import { OpenTemplateCommand } from './commands/openTemplate';
import { RefreshTreeCommand } from './commands/refreshTree';
import { dotnetCli } from './utils/dotnetCli';
import { telemetry } from './utils/telemetry';

export async function activate(context: vscode.ExtensionContext) {
    console.log('.NET Scaffolder extension is now active');

    // Track extension activation (respects VS Code telemetry settings)
    telemetry.trackActivation();

    // Check for .NET SDK installation
    const dotnetInstalled = await dotnetCli.checkInstallation();
    if (!dotnetInstalled) {
        const install = await vscode.window.showWarningMessage(
            '.NET SDK is not installed. This extension requires .NET SDK to function.',
            'Learn More'
        );
        if (install === 'Learn More') {
            vscode.env.openExternal(vscode.Uri.parse('https://dotnet.microsoft.com/download'));
        }
    } else {
        try {
            const version = await dotnetCli.getVersion();
            console.log(`.NET SDK version: ${version}`);
        } catch (error) {
            console.error('Error getting .NET version:', error);
        }
    }

    // Initialize providers and managers
    const templateProvider = new TemplateProvider(context.extensionPath);
    const treeProvider = new ProjectTreeProvider(templateProvider);
    const webviewManager = new WebviewManager(context.extensionPath);

    // Initialize commands
    const createProjectCommand = new CreateProjectCommand(webviewManager);
    const openTemplateCommand = new OpenTemplateCommand(webviewManager, createProjectCommand);
    const refreshTreeCommand = new RefreshTreeCommand(treeProvider);

    // Register tree view
    const treeView = vscode.window.createTreeView('dotnetProjectCreator', {
        treeDataProvider: treeProvider,
        showCollapseAll: true
    });

    // Register commands
    const createCommand = vscode.commands.registerCommand(
        'dotnetCreator.createProject',
        async () => {
            // Show quick pick for template selection
            try {
                const templates = await templateProvider.getAllTemplates();
                const items = templates.map(t => ({
                    label: t.name,
                    description: t.description,
                    detail: t.tags.join(', '),
                    template: t
                }));

                const selected = await vscode.window.showQuickPick(items, {
                    placeHolder: 'Select a project template',
                    matchOnDescription: true,
                    matchOnDetail: true
                });

                if (selected) {
                    // Track template viewed
                    telemetry.trackTemplateViewed(selected.template.id);
                    await openTemplateCommand.execute(selected.template);
                }
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to load templates: ${error.message}`);
            }
        }
    );

    const openTemplateCmd = vscode.commands.registerCommand(
        'dotnetCreator.openTemplate',
        async (template) => {
            // Track template viewed from tree
            telemetry.trackTemplateViewed(template.id);
            await openTemplateCommand.execute(template);
        }
    );

    const refreshCommand = vscode.commands.registerCommand(
        'dotnetCreator.refreshTree',
        () => {
            refreshTreeCommand.execute();
        }
    );


    // Add to subscriptions
    context.subscriptions.push(
        treeView,
        createCommand,
        openTemplateCmd,
        refreshCommand
    );

    // Show welcome message on first activation
    const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
    if (!hasShownWelcome && dotnetInstalled) {
        vscode.window.showInformationMessage(
            '.NET Scaffolder is ready! Click the + icon in the .NET Scaffolder view to get started.'
        );
        context.globalState.update('hasShownWelcome', true);
    }
}

export function deactivate() {
    console.log('.NET Scaffolder extension is now deactivated');
}
