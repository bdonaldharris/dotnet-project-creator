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

    async checkGitHubCLI(): Promise<boolean> {
        try {
            await crossPlatformExecutor.executeCommand('gh', ['--version']);
            return true;
        } catch (error) {
            return false;
        }
    }

    async isGitHubCLIAuthenticated(): Promise<boolean> {
        try {
            const result = await crossPlatformExecutor.executeCommand('gh', ['auth', 'status']);
            return result.includes('Logged in');
        } catch (error) {
            return false;
        }
    }

    async createGitHubRepository(
        projectPath: string,
        projectName: string,
        isPublic: boolean = true,
        description?: string
    ): Promise<string> {
        try {
            const visibility = isPublic ? '--public' : '--private';
            const args = ['repo', 'create', projectName, visibility, '--source=.', '--push'];
            
            if (description) {
                args.push('--description', description);
            }

            const result = await crossPlatformExecutor.executeCommand('gh', args, projectPath);
            
            // Extract repository URL from output
            const urlMatch = result.match(/https:\/\/github\.com\/[^\s]+/);
            return urlMatch ? urlMatch[0] : `https://github.com/${projectName}`;
        } catch (error: any) {
            throw new Error(`Failed to create GitHub repository: ${error.message}`);
        }
    }

    async addRemote(projectPath: string, remoteName: string, remoteUrl: string): Promise<void> {
        try {
            await crossPlatformExecutor.executeGitCommand(
                ['remote', 'add', remoteName, remoteUrl],
                projectPath
            );
        } catch (error: any) {
            throw new Error(`Failed to add remote: ${error.message}`);
        }
    }

    async push(projectPath: string, remoteName: string = 'origin', branch: string = 'main'): Promise<void> {
        try {
            // Try to push
            await crossPlatformExecutor.executeGitCommand(
                ['push', '-u', remoteName, branch],
                projectPath
            );
        } catch (error: any) {
            // If main doesn't exist, try master
            if (branch === 'main') {
                try {
                    await crossPlatformExecutor.executeGitCommand(
                        ['push', '-u', remoteName, 'master'],
                        projectPath
                    );
                } catch {
                    throw new Error(`Failed to push to remote: ${error.message}`);
                }
            } else {
                throw new Error(`Failed to push to remote: ${error.message}`);
            }
        }
    }

    async setBranchName(projectPath: string, branchName: string): Promise<void> {
        try {
            await crossPlatformExecutor.executeGitCommand(
                ['branch', '-M', branchName],
                projectPath
            );
        } catch (error: any) {
            throw new Error(`Failed to set branch name: ${error.message}`);
        }
    }
}

export const gitUtils = new GitUtils();
