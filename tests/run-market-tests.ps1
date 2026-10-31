# Runs the /market entry command on its short paths and saves each answer to tests/output/.
# Run from the repository root: .\tests\run-market-tests.ps1

$ErrorActionPreference = 'Stop'
# Windows PowerShell 5.1 decodes native output with the console code page; claude prints UTF-8.
[Console]::OutputEncoding = [Text.UTF8Encoding]::new($false)
$root = Split-Path $PSScriptRoot -Parent
$out = Join-Path $PSScriptRoot 'output'
New-Item -ItemType Directory -Force $out | Out-Null
Set-Location $root

$cases = @(
    @{ File = 'market1-no-args.md'; Prompt = '/market' },
    @{ File = 'market2-buyer.md';   Prompt = '/market köpare' },
    @{ File = 'market3-seller.md';  Prompt = '/market säljare' },
    @{ File = 'market4-buyer-en.md'; Prompt = '/market I am a buyer, I run a dental clinic' },
    @{ File = 'market5-seller-en.md'; Prompt = '/market I build AI agents and want to sell them' }
)

foreach ($case in $cases) {
    $path = Join-Path $out $case.File
    Write-Host "Running: $($case.Prompt)"
    claude -p $case.Prompt --plugin-dir ./plugin --allowedTools 'Skill' | Out-File -Encoding utf8 $path
    Write-Host "  -> $path (exit $LASTEXITCODE)"
}

Write-Host 'Done.'