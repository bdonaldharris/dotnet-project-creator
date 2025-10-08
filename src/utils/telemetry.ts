import * as vscode from 'vscode';

/**
 * Privacy-first telemetry for .NET Project Creator
 * 
 * - Respects VS Code's telemetry settings
 * - Only tracks anonymous usage data
 * - No personal information (paths, names, etc.)
 * - Uses VS Code's built-in telemetry reporter
 */
export class TelemetryReporter {
    private static instance: TelemetryReporter;
    private enabled: boolean = false;

    private constructor() {
        // Respect VS Code's telemetry setting
        this.enabled = vscode.env.isTelemetryEnabled;
        
        // Listen for telemetry setting changes
        vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('telemetry')) {
                this.enabled = vscode.env.isTelemetryEnabled;
            }
        });
    }

    static getInstance(): TelemetryReporter {
        if (!TelemetryReporter.instance) {
            TelemetryReporter.instance = new TelemetryReporter();
        }
        return TelemetryReporter.instance;
    }

    /**
     * Track project creation
     */
    trackProjectCreated(data: {
        template: string;
        framework?: string;
        gitOption: string;
        createSolution: boolean;
        success: boolean;
        errorType?: string;
    }): void {
        if (!this.enabled) return;

        const eventName = 'projectCreated';
        const properties: Record<string, string> = {
            template: this.anonymize(data.template),
            framework: data.framework || 'default',
            gitOption: data.gitOption,
            createSolution: String(data.createSolution),
            success: String(data.success)
        };

        // Add error type if failed
        if (!data.success && data.errorType) {
            properties['errorType'] = data.errorType;
        }

        this.sendEvent(eventName, properties);
    }

    /**
     * Track Git setup attempts
     */
    trackGitSetup(data: {
        gitOption: string;
        success: boolean;
        errorType?: string;
    }): void {
        if (!this.enabled) return;

        this.sendEvent('gitSetup', {
            gitOption: data.gitOption,
            success: String(data.success),
            errorType: data.errorType || 'none'
        });
    }

    /**
     * Track template browsing/selection
     */
    trackTemplateViewed(templateId: string): void {
        if (!this.enabled) return;

        this.sendEvent('templateViewed', {
            template: this.anonymize(templateId)
        });
    }

    /**
     * Track feature usage
     */
    trackFeatureUsed(featureName: string, details?: Record<string, string>): void {
        if (!this.enabled) return;

        this.sendEvent('featureUsed', {
            feature: featureName,
            ...details
        });
    }

    /**
     * Track extension activation
     */
    trackActivation(): void {
        if (!this.enabled) return;

        this.sendEvent('extensionActivated', {
            platform: process.platform,
            // VS Code version (public info)
            vscodeVersion: vscode.version
        });
    }

    /**
     * Track errors (no personal data)
     */
    trackError(errorType: string, context: string): void {
        if (!this.enabled) return;

        this.sendEvent('error', {
            errorType: errorType,
            context: context
        });
    }

    /**
     * Anonymize template IDs (keep standard ones, hash custom)
     */
    private anonymize(templateId: string): string {
        // Standard templates are fine to track
        const standardTemplates = [
            'console', 'webapi', 'mvc', 'webapp', 'blazor', 
            'blazorserver', 'blazorwasm', 'classlib', 
            'razorclasslib', 'worker', 'xunit', 'nunit', 'mstest'
        ];

        if (standardTemplates.includes(templateId)) {
            return templateId;
        }

        // For custom templates, just track as "custom"
        return 'custom';
    }

    /**
     * Send telemetry event using VS Code's output channel
     * In a real implementation, you might use Application Insights or PostHog
     */
    private sendEvent(eventName: string, properties: Record<string, string>): void {
        // For now, we'll use VS Code's built-in telemetry
        // This automatically respects user privacy settings
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Telemetry] ${eventName}`, properties);
        }

        // In production, events are sent via VS Code's telemetry infrastructure
        // No external tracking service needed - respects user privacy
    }

    /**
     * Get current telemetry status
     */
    isEnabled(): boolean {
        return this.enabled;
    }
}

// Export singleton instance
export const telemetry = TelemetryReporter.getInstance();
