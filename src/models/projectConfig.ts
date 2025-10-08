export interface ProjectConfig {
    name: string;
    path: string;
    template: string;
    framework?: string;
    language?: string;
    useSolution: boolean;
    initGit: boolean;
    openAfterCreate: boolean;
    additionalOptions?: Record<string, any>;
}

export interface ProjectCreationOptions {
    projectName: string;
    projectPath: string;
    templateId: string;
    framework?: string;
    language?: string;
    createSolution?: boolean;
    initializeGit?: boolean;
    openInNewWindow?: boolean;
}
