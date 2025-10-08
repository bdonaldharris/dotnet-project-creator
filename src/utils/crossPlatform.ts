import { spawn } from 'child_process';

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
        return new Promise((resolve, reject) => {
            const child = spawn(command, args, {
                cwd: cwd,
                shell: false // Use spawn directly without shell to avoid argument parsing issues
            });

            let stdout = '';
            let stderr = '';

            child.stdout?.on('data', (data) => {
                stdout += data.toString();
            });

            child.stderr?.on('data', (data) => {
                stderr += data.toString();
            });

            child.on('close', (code) => {
                if (code === 0) {
                    resolve(stdout.trim());
                } else {
                    const errorMessage = stderr || stdout || `Command exited with code ${code}`;
                    reject(new Error(errorMessage));
                }
            });

            child.on('error', (error) => {
                reject(new Error(`Failed to execute command: ${error.message}`));
            });
        });
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
