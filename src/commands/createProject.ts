import * as vscode from 'vscode';
import * as path from 'path';
import { ProjectCreationOptions } from '../models/projectConfig';
import { CreationProgress, CreationStepType } from '../models/creationProgress';
import { dotnetCli } from '../utils/dotnetCli';
import { gitUtils } from '../utils/gitUtils';
import { FileSystemUtils } from '../utils/fileSystem';
import { WebviewManager } from '../webview/webviewManager';

export class CreateProjectCommand {
    constructor(private webviewManager: WebviewManager) {}

    async execute(options: ProjectCreationOptions): Promise<void> {
        try {
            // Validate .NET SDK
            const dotnetInstalled = await dotnetCli.checkInstallation();
            if (!dotnetInstalled) {
                vscode.window.showErrorMessage('.NET SDK is not installed. Please install it first.');
                return;
            }

            // Show progress panel
            const progressPanel = await this.webviewManager.showProgressPanel();

            let currentStep = 0;
            const totalSteps = this.calculateTotalSteps(options);

            const updateProgress = (message: string, status: 'running' | 'completed' | 'failed' = 'running') => {
                currentStep++;
                const progress: CreationProgress = {
                    step: currentStep,
                    totalSteps: totalSteps,
                    message: message,
                    status: status
                };
                this.webviewManager.updateProgress(progressPanel, progress);
            };

            try {
                // Step 1: Validate configuration
                updateProgress(CreationStepType.VALIDATE);
                await this.validateConfiguration(options);

                // Step 2: Create project directory
                updateProgress(CreationStepType.CREATE_DIRECTORY);
                const projectPath = path.join(options.projectPath, options.projectName);
                await FileSystemUtils.createDirectory(projectPath);

                // Step 3: Create .NET project
                updateProgress(CreationStepType.CREATE_PROJECT);
                const frameworkOptions = options.framework ? { framework: options.framework } : undefined;
                await dotnetCli.createProject(
                    options.templateId,
                    options.projectName,
                    projectPath,
                    frameworkOptions
                );

                // Step 4: Create solution (if requested)
                if (options.createSolution) {
                    updateProgress(CreationStepType.CREATE_SOLUTION);
                    await dotnetCli.createSolution(options.projectName, projectPath);

                    updateProgress(CreationStepType.ADD_TO_SOLUTION);
                    const solutionFile = path.join(projectPath, `${options.projectName}.sln`);
                    const projectFile = path.join(projectPath, `${options.projectName}.csproj`);
                    await dotnetCli.addProjectToSolution(solutionFile, projectFile);
                }

                // Step 5: Initialize Git (if requested)
                if (options.initializeGit) {
                    const gitInstalled = await gitUtils.checkInstallation();
                    if (gitInstalled) {
                        updateProgress(CreationStepType.INIT_GIT);
                        await gitUtils.initRepository(projectPath);
                        await gitUtils.initialCommit(projectPath);
                    }
                }

                // Step 6: Restore packages
                updateProgress(CreationStepType.RESTORE_PACKAGES);
                await dotnetCli.restore(projectPath);

                // Complete
                updateProgress(CreationStepType.COMPLETE, 'completed');
                progressPanel.dispose();

                // Show completion panel
                this.webviewManager.showCompletionPanel(true, projectPath);

                // Open in new window (if requested)
                if (options.openInNewWindow) {
                    const uri = vscode.Uri.file(projectPath);
                    await vscode.commands.executeCommand('vscode.openFolder', uri, true);
                }

                vscode.window.showInformationMessage(`Project ${options.projectName} created successfully!`);

            } catch (error: any) {
                updateProgress(`Error: ${error.message}`, 'failed');
                progressPanel.dispose();
                this.webviewManager.showCompletionPanel(false, undefined, error.message);
                vscode.window.showErrorMessage(`Failed to create project: ${error.message}`);
            }

        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to create project: ${error.message}`);
        }
    }

    private calculateTotalSteps(options: ProjectCreationOptions): number {
        let steps = 4; // validate, create dir, create project, restore
        if (options.createSolution) {
            steps += 2; // create solution, add to solution
        }
        if (options.initializeGit) {
            steps += 1; // init git
        }
        return steps + 1; // +1 for complete
    }

    private async validateConfiguration(options: ProjectCreationOptions): Promise<void> {
        if (!options.projectName || options.projectName.trim() === '') {
            throw new Error('Project name is required');
        }

        if (!options.projectPath || options.projectPath.trim() === '') {
            throw new Error('Project path is required');
        }

        if (!options.templateId || options.templateId.trim() === '') {
            throw new Error('Template ID is required');
        }

        // Check if directory already exists
        const projectPath = path.join(options.projectPath, options.projectName);
        const exists = await FileSystemUtils.pathExists(projectPath);
        if (exists) {
            const isEmpty = await FileSystemUtils.isDirectoryEmpty(projectPath);
            if (!isEmpty) {
                throw new Error(`Directory ${projectPath} already exists and is not empty`);
            }
        }
    }
}
