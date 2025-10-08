import * as vscode from 'vscode';
import { TemplateProvider } from './templateProvider';
import { ProjectTemplate, TemplateCategory } from '../models/projectTemplate';

export class ProjectTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly itemType: 'category' | 'template',
        public readonly data?: any
    ) {
        super(label, collapsibleState);
        
        if (itemType === 'template') {
            this.contextValue = 'projectTemplate';
            this.command = {
                command: 'dotnetCreator.openTemplate',
                title: 'Configure Project',
                arguments: [this.data]
            };
            this.tooltip = this.data.description;
        } else {
            this.contextValue = 'category';
        }
    }
}

export class ProjectTreeProvider implements vscode.TreeDataProvider<ProjectTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<ProjectTreeItem | undefined | null | void> = 
        new vscode.EventEmitter<ProjectTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<ProjectTreeItem | undefined | null | void> = 
        this._onDidChangeTreeData.event;

    constructor(private templateProvider: TemplateProvider) {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: ProjectTreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: ProjectTreeItem): Promise<ProjectTreeItem[]> {
        if (!element) {
            // Root level - show categories
            const categories = await this.templateProvider.getCategories();
            return categories.map(category => 
                new ProjectTreeItem(
                    category.displayName,
                    vscode.TreeItemCollapsibleState.Collapsed,
                    'category',
                    category
                )
            );
        } else if (element.itemType === 'category') {
            // Category level - show templates
            const category = element.data as TemplateCategory;
            return category.templates.map(template =>
                new ProjectTreeItem(
                    template.name,
                    vscode.TreeItemCollapsibleState.None,
                    'template',
                    template
                )
            );
        }
        
        return [];
    }
}
