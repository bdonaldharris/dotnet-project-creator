# .NET Project Creator - Windows PowerShell Script
# This script provides cross-platform project creation capabilities

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectName,
    
    [Parameter(Mandatory=$true)]
    [string]$Template,
    
    [Parameter(Mandatory=$true)]
    [string]$OutputPath,
    
    [string]$Framework
)

Write-Host "Creating .NET project: $ProjectName"
Write-Host "Template: $Template"
Write-Host "Output: $OutputPath"

# Create project
$args = @("new", $Template, "-n", $ProjectName, "-o", $OutputPath)
if ($Framework) {
    $args += @("--framework", $Framework)
}

& dotnet $args

if ($LASTEXITCODE -eq 0) {
    Write-Host "Project created successfully!" -ForegroundColor Green
} else {
    Write-Host "Failed to create project" -ForegroundColor Red
    exit 1
}
