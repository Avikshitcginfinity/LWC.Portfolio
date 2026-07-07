![LWC Portfolio Screenshot](https://github.com/user-attachments/assets/63bab033-b311-4167-8984-58c850b8e82d)

## Profile Photo

![Avikshit Trivedi](https://media.licdn.com/dms/image/v2/D5603AQHcB_49i62rFw/profile-displayphoto-scale_400_400/B56ZgM6mqbHcAo-/0/1752563348732?e=1784764800&v=beta&t=Q_ArE5ugTh6F0lDO0ZKqLAOPZvOfQI5501fNGm4Aa8w)

# LWC Assignment

This repository contains a Salesforce DX project for a Lightning Web Component portfolio card built on top of Account data. The app includes an Apex controller, an LWC bundle, and a Visualforce page variant for presenting a profile-style portfolio inside Salesforce.

## Preview

The screenshot above shows the rendered portfolio component in Salesforce Lightning Experience.

## Features

- Displays a portfolio card for a configured Account record
- Uses Apex to fetch Account fields for the LWC
- Shows loading, missing configuration, and error states
- Includes a Visualforce page version of the portfolio layout
- Ready to deploy with Salesforce CLI

## Tech Stack

- Salesforce DX
- Lightning Web Components
- Apex
- Visualforce
- Salesforce CLI

## Project Structure

- `force-app/main/default/lwc/myPortfolio/` contains the Lightning Web Component bundle
- `force-app/main/default/classes/` contains Apex controllers
- `force-app/main/default/pages/` contains the Visualforce page
- `manifest/package.xml` contains metadata package references

## Deploy

From the project root, deploy the source with:

```powershell
sf project deploy start --source-dir force-app
```

## Authorize an Org

```powershell
sf org login web
```

## Repo Setup

If you are pushing this project to GitHub for the first time:

```powershell
git init
git branch -M main
git add .
git commit -m "Add Salesforce LWC assignment"
git push -u origin main
```

