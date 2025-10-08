import * as fs from 'fs/promises';
import * as path from 'path';
import { crossPlatformExecutor } from './crossPlatform';

export class FileSystemUtils {
    static normalizePath(inputPath: string): string {
        return path.resolve(inputPath);
    }

    static async pathExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    static async createDirectory(dirPath: string): Promise<void> {
        try {
            await fs.mkdir(dirPath, { recursive: true });
        } catch (error: any) {
            throw new Error(`Failed to create directory: ${error.message}`);
        }
    }

    static async deleteDirectory(dirPath: string): Promise<void> {
        try {
            await fs.rm(dirPath, { recursive: true, force: true });
        } catch (error: any) {
            throw new Error(`Failed to delete directory: ${error.message}`);
        }
    }

    static async readFile(filePath: string): Promise<string> {
        try {
            return await fs.readFile(filePath, 'utf-8');
        } catch (error: any) {
            throw new Error(`Failed to read file: ${error.message}`);
        }
    }

    static async writeFile(filePath: string, content: string): Promise<void> {
        try {
            await fs.writeFile(filePath, content, 'utf-8');
        } catch (error: any) {
            throw new Error(`Failed to write file: ${error.message}`);
        }
    }

    static async setExecutable(filePath: string): Promise<void> {
        if (process.platform !== 'win32') {
            try {
                await fs.chmod(filePath, 0o755);
            } catch (error: any) {
                throw new Error(`Failed to set executable permission: ${error.message}`);
            }
        }
    }

    static async isDirectory(dirPath: string): Promise<boolean> {
        try {
            const stats = await fs.stat(dirPath);
            return stats.isDirectory();
        } catch {
            return false;
        }
    }

    static async isDirectoryEmpty(dirPath: string): Promise<boolean> {
        try {
            const files = await fs.readdir(dirPath);
            return files.length === 0;
        } catch {
            return true;
        }
    }

    static joinPath(...paths: string[]): string {
        return path.join(...paths);
    }

    static getBaseName(filePath: string): string {
        return path.basename(filePath);
    }

    static getDirName(filePath: string): string {
        return path.dirname(filePath);
    }

    static getExtension(filePath: string): string {
        return path.extname(filePath);
    }
}
