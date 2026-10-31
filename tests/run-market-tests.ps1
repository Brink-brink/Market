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
    @{ File = 'market5-seller-en.md'; Prompt = '/market I build AI agents and want to sell them' },
    @{ File = 'market6-seller-listing.md'; Prompt = '/market säljare, jag vill skapa en annons' },
    @{ File = 'market7-seller-interest.md'; Prompt = '/market säljare, visa köparnas intresse' },
    @{ File = 'listing1-full.md'; Prompt = '/ai-jobb:listing-draft Bokningsagent för frisörer. Paket: AI svarar i telefon och bokar i Bokadirekt, 3 månaders support. Pris 15 000-25 000 kr uppstart, 1 000 kr/mån. Leverans 10 arbetsdagar. Prototyp, demo: https://example.com/demo. Testa: 1) boka klippning tisdag 14 -> bokning skapas, 2) avboka -> tiden frigörs, 3) fråga om pris -> svarar med prislistan. Data: namn och telefonnummer, lagras i Sverige, använder Retell och OpenAI. GDPR-certifierad lösning. Kontakta mig på anna@example.se.' }
)

foreach ($case in $cases) {
    $path = Join-Path $out $case.File
    Write-Host "Running: $($case.Prompt)"
    claude -p $case.Prompt --plugin-dir ./plugin --allowedTools 'Skill' | Out-File -Encoding utf8 $path
    Write-Host "  -> $path (exit $LASTEXITCODE)"
}

Write-Host 'Done.'