import * as path from 'path';
import { FileSystemUtils } from './fileSystem';

export class VSCodeConfigGenerator {
    /**
     * Creates .vscode folder with tasks.json and launch.json in the project directory
     */
    async createVSCodeConfig(projectPath: string, projectName: string): Promise<void> {
        const vscodeDir = path.join(projectPath, '.vscode');
        await FileSystemUtils.createDirectory(vscodeDir);

        // Create tasks.json
        await this.createTasksJson(vscodeDir);

        // Create launch.json
        await this.createLaunchJson(vscodeDir, projectName);
    }

    private async createTasksJson(vscodeDir: string): Promise<void> {
        const tasksContent = {
            version: '2.0.0',
            tasks: [
                {
                    label: 'build',
                    command: 'dotnet',
                    type: 'process',
                    args: [
                        'build',
                        '${workspaceFolder}/${workspaceFolderBasename}.csproj',
                        '/property:GenerateFullPaths=true',
                        '/consoleloggerparameters:NoSummary;ForceNoAlign'
                    ],
                    problemMatcher: '$msCompile',
                    group: {
                        kind: 'build',
                        isDefault: true
                    }
                },
                {
                    label: 'publish',
                    command: 'dotnet',
                    type: 'process',
                    args: [
                        'publish',
                        '${workspaceFolder}/${workspaceFolderBasename}.csproj',
                        '/property:GenerateFullPaths=true',
                        '/consoleloggerparameters:NoSummary;ForceNoAlign'
                    ],
                    problemMatcher: '$msCompile'
                },
                {
                    label: 'watch',
                    command: 'dotnet',
                    type: 'process',
                    args: [
                        'watch',
                        'run',
                        '--project',
                        '${workspaceFolder}/${workspaceFolderBasename}.csproj'
                    ],
                    problemMatcher: '$msCompile'
                }
            ]
        };

        const tasksPath = path.join(vscodeDir, 'tasks.json');
        await FileSystemUtils.writeFile(tasksPath, JSON.stringify(tasksContent, null, 4));
    }

    private async createLaunchJson(vscodeDir: string, projectName: string): Promise<void> {
        const launchContent = {
            version: '0.2.0',
            configurations: [
                {
                    name: '.NET Core Launch (console)',
                    type: 'coreclr',
                    request: 'launch',
                    preLaunchTask: 'build',
                    program: '${workspaceFolder}/bin/Debug/${targetFramework}/${workspaceFolderBasename}.dll',
                    args: [],
                    cwd: '${workspaceFolder}',
                    console: 'internalConsole',
                    stopAtEntry: false
                },
                {
                    name: '.NET Core Launch (web)',
                    type: 'coreclr',
                    request: 'launch',
                    preLaunchTask: 'build',
                    program: '${workspaceFolder}/bin/Debug/${targetFramework}/${workspaceFolderBasename}.dll',
                    args: [],
                    cwd: '${workspaceFolder}',
                    stopAtEntry: false,
                    serverReadyAction: {
                        action: 'openExternally',
                        pattern: '\\bNow listening on:\\s+(https?://\\S+)'
                    },
                    env: {
                        ASPNETCORE_ENVIRONMENT: 'Development'
                    },
                    sourceFileMap: {
                        '/Views': '${workspaceFolder}/Views'
                    }
                },
                {
                    name: '.NET Core Attach',
                    type: 'coreclr',
                    request: 'attach'
                }
            ]
        };

        const launchPath = path.join(vscodeDir, 'launch.json');
        await FileSystemUtils.writeFile(launchPath, JSON.stringify(launchContent, null, 4));
    }
}

export const vscodeConfigGenerator = new VSCodeConfigGenerator();
