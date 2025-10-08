export interface ProjectTemplate {
    id: string;
    name: string;
    description: string;
    dotnetTemplate: string;
    tags: string[];
    category?: string;
}

export interface TemplateCategory {
    id: string;
    displayName: string;
    icon: string;
    templates: ProjectTemplate[];
}

export interface TemplateData {
    console: TemplateCategory;
    web: TemplateCategory;
    library: TemplateCategory;
    test: TemplateCategory;
}
