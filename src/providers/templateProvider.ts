import * as path from 'path';
import { FileSystemUtils } from '../utils/fileSystem';
import { ProjectTemplate, TemplateCategory, TemplateData } from '../models/projectTemplate';

export class TemplateProvider {
    private templates: TemplateData | null = null;
    private templatesPath: string;

    constructor(extensionPath: string) {
        this.templatesPath = path.join(extensionPath, 'resources', 'templates', 'project-templates.json');
    }

    async loadTemplates(): Promise<TemplateData> {
        if (this.templates) {
            return this.templates;
        }

        try {
            const content = await FileSystemUtils.readFile(this.templatesPath);
            this.templates = JSON.parse(content) as TemplateData;
            return this.templates;
        } catch (error: any) {
            throw new Error(`Failed to load templates: ${error.message}`);
        }
    }

    async getCategories(): Promise<TemplateCategory[]> {
        const templates = await this.loadTemplates();
        return Object.values(templates);
    }

    async getCategory(categoryId: string): Promise<TemplateCategory | undefined> {
        const templates = await this.loadTemplates();
        return (templates as any)[categoryId];
    }

    async getTemplate(categoryId: string, templateId: string): Promise<ProjectTemplate | undefined> {
        const category = await this.getCategory(categoryId);
        return category?.templates.find(t => t.id === templateId);
    }

    async getAllTemplates(): Promise<ProjectTemplate[]> {
        const categories = await this.getCategories();
        return categories.flatMap(c => c.templates.map(t => ({ ...t, category: c.id })));
    }

    async searchTemplates(query: string): Promise<ProjectTemplate[]> {
        const allTemplates = await this.getAllTemplates();
        const lowerQuery = query.toLowerCase();
        
        return allTemplates.filter(t => 
            t.name.toLowerCase().includes(lowerQuery) ||
            t.description.toLowerCase().includes(lowerQuery) ||
            t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }
}
