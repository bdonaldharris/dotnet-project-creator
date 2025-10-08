#!/usr/bin/env node
// .NET Project Creator - Node.js Cross-Platform Script
// This script provides cross-platform project creation capabilities

const { spawn } = require('child_process');
const path = require('path');

function createProject(projectName, template, outputPath, framework) {
    return new Promise((resolve, reject) => {
        const args = ['new', template, '-n', projectName, '-o', outputPath];
        
        if (framework) {
            args.push('--framework', framework);
        }

        console.log(`Creating .NET project: ${projectName}`);
        console.log(`Template: ${template}`);
        console.log(`Output: ${outputPath}`);

        const dotnet = spawn('dotnet', args, {
            stdio: 'inherit',
            shell: process.platform === 'win32'
        });

        dotnet.on('close', (code) => {
            if (code === 0) {
                console.log('Project created successfully!');
                resolve();
            } else {
                console.error('Failed to create project');
                reject(new Error(`dotnet command failed with code ${code}`));
            }
        });

        dotnet.on('error', (error) => {
            console.error('Error executing dotnet command:', error);
            reject(error);
        });
    });
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {};

for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--?/, '');
    options[key] = args[i + 1];
}

if (!options.name || !options.template || !options.output) {
    console.error('Usage: node create-dotnet-project.js --name <project-name> --template <template> --output <output-path> [--framework <framework>]');
    process.exit(1);
}

createProject(options.name, options.template, options.output, options.framework)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
