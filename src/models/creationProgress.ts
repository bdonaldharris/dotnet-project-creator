export interface CreationProgress {
    step: number;
    totalSteps: number;
    message: string;
    status: 'running' | 'completed' | 'failed';
    error?: string;
}

export interface CreationStep {
    name: string;
    description: string;
    execute: () => Promise<void>;
}

export interface CreationResult {
    success: boolean;
    projectPath?: string;
    message?: string;
    error?: string;
}

export enum CreationStepType {
    VALIDATE = 'Validating configuration',
    CREATE_DIRECTORY = 'Creating project directory',
    CREATE_PROJECT = 'Creating .NET project',
    CREATE_SOLUTION = 'Creating solution file',
    ADD_TO_SOLUTION = 'Adding project to solution',
    INIT_GIT = 'Initializing Git repository',
    RESTORE_PACKAGES = 'Restoring NuGet packages',
    COMPLETE = 'Project creation complete'
}
