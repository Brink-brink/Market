# Runs the /market entry command on its short paths and saves each answer to tests/output/.
# Run from the repository root: .\tests\run-market-tests.ps1 [-Only <file-name prefix>]

param([string]$Only = '')

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
    @{ File = 'market8-buyer-draft.md'; Prompt = '/market köpare, jag har en frisörsalong och vill skriva ett behovsutkast' },
    @{ File = 'need1-full.md'; Prompt = '/ai-jobb:need-draft Frisörsalong i Göteborg, Kungsgatan 12. Vi missar samtal när vi klipper, kanske 30 i veckan. Vill att en AI svarar i telefon och bokar i Bokadirekt. Har mobiltelefon och hemsida på Wix. Budget 10 000-20 000 kr och max 1 000 kr/mån. Behövs inom en månad. Ring mig på 070-123 45 67, Salong Lisa AB.' },
    @{ File = 'need2-sparse-dental.md'; Prompt = '/ai-jobb:need-draft Tandvårdsklinik, vill ha en chattbot på hemsidan som svarar patienter' },
    @{ File = 'listing1-full.md'; Prompt = '/ai-jobb:listing-draft Bokningsagent för frisörer. Paket: AI svarar i telefon och bokar i Bokadirekt, 3 månaders support. Pris 15 000-25 000 kr uppstart, 1 000 kr/mån. Leverans 10 arbetsdagar. Prototyp, demo: https://example.com/demo. Testa: 1) boka klippning tisdag 14 -> bokning skapas, 2) avboka -> tiden frigörs, 3) fråga om pris -> svarar med prislistan. Data: namn och telefonnummer, lagras i Sverige, använder Retell och OpenAI. GDPR-certifierad lösning. Kontakta mig på anna@example.se.' },
    @{ File = 'listing2-identity.md'; Prompt = '/ai-jobb:listing-draft Chattbot för tandläkare från Anna Berg AB (annaberg.se, @annabergai på Instagram). Paket: chatt på hemsidan som svarar på frågor om öppettider och priser, 1 månads support. Pris 5 000-8 000 kr, ingen månadsavgift. Leverans 5 arbetsdagar. I drift hos en klinik i Malmö. Demo: https://annaberg.se/demo. Testa: 1) fråga om öppettider, 2) fråga om pris för undersökning, 3) be om akuttid -> hänvisar till telefon. Data: inga personuppgifter sparas, OpenAI används.' }
)

foreach ($case in $cases | Where-Object { $_.File -like "$Only*" }) {
    $path = Join-Path $out $case.File
    Write-Host "Running: $($case.Prompt)"
    claude -p $case.Prompt --plugin-dir ./plugin --allowedTools 'Skill' | Out-File -Encoding utf8 $path
    Write-Host "  -> $path (exit $LASTEXITCODE)"
}

Write-Host 'Done.'