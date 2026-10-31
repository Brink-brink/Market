# Runs the market-analysis skill on a few niches and saves each answer to tests/output/.
# Run from the repository root: .\tests\run-tests.ps1

$ErrorActionPreference = 'Stop'
# Windows PowerShell 5.1 decodes native output with the console code page; claude prints UTF-8.
[Console]::OutputEncoding = [Text.UTF8Encoding]::new($false)
$root = Split-Path $PSScriptRoot -Parent
$out = Join-Path $PSScriptRoot 'output'
New-Item -ItemType Directory -Force $out | Out-Null
Set-Location $root

$cases = @(
    @{ File = 'test1-frisor.md';      Tools = 'WebSearch WebFetch';       Prompt = '/ai-jobb:market-analysis bokningsagent för frisörer' },
    @{ File = 'test2-tandlakare.md';  Tools = 'WebSearch WebFetch Skill'; Prompt = 'Lönar det sig att sälja AI-receptionister till tandläkare?' },
    @{ File = 'test3-realestate.md';  Tools = 'WebSearch WebFetch';       Prompt = '/ai-jobb:market-analysis lead follow-up agent for real estate agents' }
)

foreach ($case in $cases) {
    $path = Join-Path $out $case.File
    Write-Host "Running: $($case.Prompt)"
    claude -p $case.Prompt --plugin-dir ./plugin --allowedTools $case.Tools | Out-File -Encoding utf8 $path
    Write-Host "  -> $path (exit $LASTEXITCODE)"
}

Write-Host 'Done.'
