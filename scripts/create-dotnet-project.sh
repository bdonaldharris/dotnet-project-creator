#!/bin/bash
# .NET Project Creator - macOS/Linux Shell Script
# This script provides cross-platform project creation capabilities

PROJECT_NAME=""
TEMPLATE=""
OUTPUT_PATH=""
FRAMEWORK=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -n|--name)
            PROJECT_NAME="$2"
            shift 2
            ;;
        -t|--template)
            TEMPLATE="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_PATH="$2"
            shift 2
            ;;
        -f|--framework)
            FRAMEWORK="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Validate required parameters
if [ -z "$PROJECT_NAME" ] || [ -z "$TEMPLATE" ] || [ -z "$OUTPUT_PATH" ]; then
    echo "Usage: $0 -n <project-name> -t <template> -o <output-path> [-f <framework>]"
    exit 1
fi

echo "Creating .NET project: $PROJECT_NAME"
echo "Template: $TEMPLATE"
echo "Output: $OUTPUT_PATH"

# Build dotnet command
DOTNET_ARGS="new $TEMPLATE -n $PROJECT_NAME -o $OUTPUT_PATH"
if [ -n "$FRAMEWORK" ]; then
    DOTNET_ARGS="$DOTNET_ARGS --framework $FRAMEWORK"
fi

# Create project
if dotnet $DOTNET_ARGS; then
    echo "Project created successfully!"
else
    echo "Failed to create project"
    exit 1
fi
