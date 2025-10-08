import { crossPlatformExecutor } from './crossPlatform';
import * as fs from 'fs/promises';
import * as path from 'path';

export class GitUtils {
    async checkInstallation(): Promise<boolean> {
        try {
            await crossPlatformExecutor.executeGitCommand(['--version']);
            return true;
        } catch (error) {
            return false;
        }
    }

    async initRepository(projectPath: string): Promise<void> {
        try {
            await crossPlatformExecutor.executeGitCommand(['init'], projectPath);
        } catch (error: any) {
            throw new Error(`Failed to initialize Git repository: ${error.message}`);
        }
    }

    async createGitignore(projectPath: string): Promise<void> {
        const gitignoreContent = `# .NET
bin/
obj/
*.user
*.suo
*.userosscache
*.sln.docstates

# Visual Studio Code
.vscode/
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# User-specific files
*.rsuser
*.suo
*.user
*.userosscache
*.sln.docstates

# Build results
[Dd]ebug/
[Dd]ebugPublic/
[Rr]elease/
[Rr]eleases/
x64/
x86/
[Aa][Rr][Mm]/
[Aa][Rr][Mm]64/
bld/
[Bb]in/
[Oo]bj/
[Ll]og/
[Ll]ogs/

# NuGet Packages
*.nupkg
*.snupkg
**/packages/*
!**/packages/build/

# JetBrains Rider
.idea/
*.sln.iml

# Mac
.DS_Store
`;

        const gitignorePath = path.join(projectPath, '.gitignore');
        try {
            await fs.writeFile(gitignorePath, gitignoreContent, 'utf-8');
        } catch (error: any) {
            throw new Error(`Failed to create .gitignore: ${error.message}`);
        }
    }

    async addAll(projectPath: string): Promise<void> {
        try {
            await crossPlatformExecutor.executeGitCommand(['add', '.'], projectPath);
        } catch (error: any) {
            throw new Error(`Failed to add files to Git: ${error.message}`);
        }
    }

    async commit(projectPath: string, message: string): Promise<void> {
        try {
            await crossPlatformExecutor.executeGitCommand(
                ['commit', '-m', message],
                projectPath
            );
        } catch (error: any) {
            throw new Error(`Failed to commit: ${error.message}`);
        }
    }

    async initialCommit(projectPath: string): Promise<void> {
        await this.createGitignore(projectPath);
        await this.addAll(projectPath);
        await this.commit(projectPath, 'Initial commit');
    }
}

export const gitUtils = new GitUtils();
