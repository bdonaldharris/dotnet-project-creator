import { crossPlatformExecutor } from './crossPlatform';
import * as path from 'path';

export class DotNetCli {
    async checkInstallation(): Promise<boolean> {
        try {
            await crossPlatformExecutor.executeDotNetCommand(['--version']);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getVersion(): Promise<string> {
        try {
            return await crossPlatformExecutor.executeDotNetCommand(['--version']);
        } catch (error: any) {
            throw new Error(`Failed to get .NET version: ${error.message}`);
        }
    }

    async listTemplates(): Promise<string> {
        try {
            return await crossPlatformExecutor.executeDotNetCommand(['new', 'list']);
        } catch (error: any) {
            throw new Error(`Failed to list templates: ${error.message}`);
        }
    }

    private getTemplateForFramework(templateName: string, framework?: string): string {
        // Map old Blazor templates to new unified template for .NET 8+
        if (framework && (framework === 'net8.0' || framework === 'net9.0')) {
            if (templateName === 'blazorserver' || templateName === 'blazorwasm') {
                return 'blazor';
            }
        }
        return templateName;
    }

    async createProject(
        templateName: string,
        projectName: string,
        outputPath: string,
        options?: Record<string, string>
    ): Promise<void> {
        // Get the appropriate template based on framework version
        const framework = options?.framework;
        const actualTemplate = this.getTemplateForFramework(templateName, framework);
        
        const args = ['new', actualTemplate, '-n', projectName, '-o', outputPath];
        
        if (options) {
            for (const [key, value] of Object.entries(options)) {
                args.push(`--${key}`, value);
            }
        }

        try {
            await crossPlatformExecutor.executeDotNetCommand(args);
        } catch (error: any) {
            throw new Error(`Failed to create project: ${error.message}`);
        }
    }

    async createSolution(solutionName: string, outputPath: string): Promise<void> {
        try {
            await crossPlatformExecutor.executeDotNetCommand(
                ['new', 'sln', '-n', solutionName, '-o', outputPath]
            );
        } catch (error: any) {
            throw new Error(`Failed to create solution: ${error.message}`);
        }
    }

    async addProjectToSolution(solutionPath: string, projectPath: string): Promise<void> {
        try {
            await crossPlatformExecutor.executeDotNetCommand(
                ['sln', solutionPath, 'add', projectPath]
            );
        } catch (error: any) {
            throw new Error(`Failed to add project to solution: ${error.message}`);
        }
    }

    async restore(projectPath: string): Promise<void> {
        try {
            await crossPlatformExecutor.executeDotNetCommand(['restore'], projectPath);
        } catch (error: any) {
            throw new Error(`Failed to restore packages: ${error.message}`);
        }
    }

    async build(projectPath: string): Promise<void> {
        try {
            await crossPlatformExecutor.executeDotNetCommand(['build'], projectPath);
        } catch (error: any) {
            throw new Error(`Failed to build project: ${error.message}`);
        }
    }

    async run(projectPath: string): Promise<void> {
        try {
            await crossPlatformExecutor.executeDotNetCommand(['run'], projectPath);
        } catch (error: any) {
            throw new Error(`Failed to run project: ${error.message}`);
        }
    }
}

export const dotnetCli = new DotNetCli();
