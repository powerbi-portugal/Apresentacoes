# #############################################################################
# NAME: DemoScript.ps1
# 
# AUTHOR:  Pedro Morais
# EMAIL: fernando.morais@devscope.net
# DATE: 2019-03-26
# 
# COMMENT:  This script will extract the json model of a Power BI file
#
# #############################################################################

## Make sure to have the latest version of PowerBI.PSTools
## Needs to be run as administrator
# Install-Module PowerBIPS.Tools
# Update-Module PowerBIPS.Tools

# Load the Module
Import-Module PowerBIPS.Tools

# Get script current path
$currentPath = (Split-Path $MyInvocation.MyCommand.Definition -Parent)

# Extract the model to the folder SSAS. Make sure you have your Power BI file open
Convert-PowerBIDesktopToASTabular -pbiDesktopWindowName "DemoFile*" -outputPath "$currentPath\SSAS\" -removeInternalPBITables -Verbose

################################################################################
# Diffing
# Extract the altered model to the folder SSASV2. Make sure you have your Power BI file open
Convert-PowerBIDesktopToASTabular -pbiDesktopWindowName "DemoFile2*" -outputPath "$currentPath\SSASV2\" -removeInternalPBITables -Verbose

# Call the diff viewer
$fileV1 = "$currentPath\SSAS\model.bim"
$fileV2 = "$currentPath\SSASV2\model.bim"   

Invoke-Command  -ScriptBlock {& 'C:\Program Files (x86)\KDiff3\kdiff3.exe' $fileV1 $fileV2} 
#Compare-Object (Get-Content $fileV1) (Get-Content $fileV2) -SyncWindow 10                  # Powershell Way
