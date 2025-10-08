import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class CrossPlatformExecutor {
    private isWindows = process.platform === 'win32';
    private isMacOS = process.platform === 'darwin';
    private isLinux = process.platform === 'linux';

    getOperatingSystem(): 'windows' | 'macos' | 'linux' {
        if (this.isWindows) return 'windows';
        if (this.isMacOS) return 'macos';
        return 'linux';
    }

    async executeCommand(command: string, args: string[], cwd?: string): Promise<string> {
        const fullCommand = `${command} ${args.join(' ')}`;
        try {
            const { stdout, stderr } = await execAsync(fullCommand, {
                cwd: cwd,
                shell: this.isWindows ? 'cmd.exe' : '/bin/bash'
            });
            
            if (stderr && !stdout) {
                throw new Error(stderr);
            }
            
            return stdout.trim();
        } catch (error: any) {
            throw new Error(`Command failed: ${error.message}`);
        }
    }

    async executeDotNetCommand(args: string[], cwd?: string): Promise<string> {
        return this.executeCommand('dotnet', args, cwd);
    }

    async executeGitCommand(args: string[], cwd?: string): Promise<string> {
        return this.executeCommand('git', args, cwd);
    }

    getScriptPath(scriptName: string): string {
        if (this.isWindows) {
            return `scripts/${scriptName}.ps1`;
        }
        return `scripts/${scriptName}.sh`;
    }

    getPathSeparator(): string {
        return this.isWindows ? '\\' : '/';
    }

    normalizeLineEndings(text: string): string {
        // Normalize to LF for consistency
        return text.replace(/\r\n/g, '\n');
    }
}

export const crossPlatformExecutor = new CrossPlatformExecutor();
