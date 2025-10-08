import * as vscode from 'vscode';
import * as path from 'path';
import { ProjectCreationOptions } from '../models/projectConfig';
import { CreationProgress, CreationStepType } from '../models/creationProgress';
import { dotnetCli } from '../utils/dotnetCli';
import { gitUtils } from '../utils/gitUtils';
import { FileSystemUtils } from '../utils/fileSystem';
import { WebviewManager } from '../webview/webviewManager';
import { vscodeConfigGenerator } from '../utils/vscodeConfig';

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

                // Determine paths based on whether solution is created
                const solutionRootPath = path.join(options.projectPath, options.projectName);
                const projectPath = options.createSolution 
                    ? path.join(solutionRootPath, 'src', options.projectName)
                    : solutionRootPath;
                const workspaceRoot = options.createSolution ? solutionRootPath : projectPath;

                // Step 2: Create directory structure
                updateProgress(CreationStepType.CREATE_DIRECTORY);
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
                    await dotnetCli.createSolution(options.projectName, solutionRootPath);

                    updateProgress(CreationStepType.ADD_TO_SOLUTION);
                    const solutionFile = path.join(solutionRootPath, `${options.projectName}.sln`);
                    const projectFile = path.join(projectPath, `${options.projectName}.csproj`);
                    await dotnetCli.addProjectToSolution(solutionFile, projectFile);
                }

                // Step 5: Create VS Code configuration
                updateProgress('Creating VS Code configuration...');
                await vscodeConfigGenerator.createVSCodeConfig(workspaceRoot, options.projectName);

                // Step 6: Handle Git based on option
                await this.handleGitSetup(options, workspaceRoot, updateProgress);

                // Step 7: Restore packages
                updateProgress(CreationStepType.RESTORE_PACKAGES);
                await dotnetCli.restore(projectPath);

                // Complete
                updateProgress(CreationStepType.COMPLETE, 'completed');
                progressPanel.dispose();

                // Show completion panel
                this.webviewManager.showCompletionPanel(true, workspaceRoot);

                // Open in new window (if requested)
                if (options.openInNewWindow) {
                    const uri = vscode.Uri.file(workspaceRoot);
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
        let steps = 5; // validate, create dir, create project, vscode config, restore
        if (options.createSolution) {
            steps += 2; // create solution, add to solution
        }
        if (options.gitOption && options.gitOption !== 'none') {
            steps += options.gitOption === 'github' || options.gitOption === 'remote' ? 2 : 1;
        }
        return steps + 1; // +1 for complete
    }

    private async handleGitSetup(
        options: ProjectCreationOptions,
        projectPath: string,
        updateProgress: (message: string, status?: 'running' | 'completed' | 'failed') => void
    ): Promise<void> {
        const gitOption = options.gitOption || 'none';

        if (gitOption === 'none') {
            return; // Skip Git entirely
        }

        // Check if Git is installed
        const gitInstalled = await gitUtils.checkInstallation();
        if (!gitInstalled) {
            vscode.window.showWarningMessage('Git is not installed. Skipping Git initialization.');
            return;
        }

        // Initialize local repository for all options
        updateProgress(CreationStepType.INIT_GIT);
        await gitUtils.initRepository(projectPath);
        await gitUtils.setBranchName(projectPath, 'main');
        await gitUtils.initialCommit(projectPath);

        // Handle remote options
        if (gitOption === 'github') {
            await this.handleGitHubSetup(options, projectPath, updateProgress);
        } else if (gitOption === 'remote') {
            await this.handleRemoteSetup(options, projectPath, updateProgress);
        }
    }

    private async handleGitHubSetup(
        options: ProjectCreationOptions,
        projectPath: string,
        updateProgress: (message: string, status?: 'running' | 'completed' | 'failed') => void
    ): Promise<void> {
        updateProgress('Creating GitHub repository...');

        // Check if GitHub CLI is available
        const ghInstalled = await gitUtils.checkGitHubCLI();
        if (!ghInstalled) {
            vscode.window.showErrorMessage(
                'GitHub CLI (gh) is not installed. Please install it from: https://cli.github.com/'
            );
            return;
        }

        // Check if authenticated
        const isAuthenticated = await gitUtils.isGitHubCLIAuthenticated();
        if (!isAuthenticated) {
            vscode.window.showErrorMessage(
                'GitHub CLI is not authenticated. Please run: gh auth login'
            );
            return;
        }

        try {
            const isPublic = options.gitRepoVisibility === 'public';
            const repoUrl = await gitUtils.createGitHubRepository(
                projectPath,
                options.projectName,
                isPublic,
                `${options.projectName} - Created with .NET Project Creator`
            );
            vscode.window.showInformationMessage(`GitHub repository created: ${repoUrl}`);
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to create GitHub repository: ${error.message}`);
        }
    }

    private async handleRemoteSetup(
        options: ProjectCreationOptions,
        projectPath: string,
        updateProgress: (message: string, status?: 'running' | 'completed' | 'failed') => void
    ): Promise<void> {
        if (!options.gitRemoteUrl) {
            return;
        }

        updateProgress('Pushing to remote repository...');

        try {
            await gitUtils.addRemote(projectPath, 'origin', options.gitRemoteUrl);
            await gitUtils.push(projectPath, 'origin', 'main');
            vscode.window.showInformationMessage(
                `Successfully pushed to ${options.gitRemoteUrl}`
            );
        } catch (error: any) {
            vscode.window.showWarningMessage(
                `Local repository created, but failed to push to remote: ${error.message}. ` +
                `You can push manually later.`
            );
        }
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

        // Check if root directory already exists
        const rootPath = path.join(options.projectPath, options.projectName);
        const exists = await FileSystemUtils.pathExists(rootPath);
        if (exists) {
            const isEmpty = await FileSystemUtils.isDirectoryEmpty(rootPath);
            if (!isEmpty) {
                throw new Error(`Directory ${rootPath} already exists and is not empty`);
            }
        }
    }
}
