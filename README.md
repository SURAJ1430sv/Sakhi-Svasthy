# Sakhi-Svasthy
Sakhi-Svasthy: A Women’s Digital Health Awareness Platform aimed at promoting awareness, education, and support regarding women’s health, hygiene, and wellness.

# How to run 
Step 1 : Download it into your device 
Step 2 : Open it into code editor and open terminal of it
Step 3 : Run this command in terminal "npm install"
Step 4 : Then run "npm run dev"

## Importent Notice ##
Download postgresql for the database where your data is going to add and show it.
 # In  .env file you have to make small change  you have to add your sql id link and sql password 
Example : DATABASE_URL="postgresql://postgres:suraj@localhost:5432/sakhisvasthya"


modules = ["nodejs-20", "bash", "web"]
run = "npm run dev"
hidden = [".config", ".git", "generated-icon.png", "node_modules", "dist"]

[nix]
channel = "stable-24_05"

[deployment]
deploymentTarget = "cloudrun"
run = ["sh", "-c", "npm run dev"]

[[ports]]
localPort = 5000
externalPort = 80

[workflows]
runButton = "Project"

[[workflows.workflow]]
name = "Sakhi-Svasthy"
mode = "parallel"
author = "Suraj"

[[workflows.workflow.tasks]]
task = "workflow.run"
args = "Start application"

[[workflows.workflow]]
name = "Start application"
author = "agent"

[workflows.workflow.metadata]
agentRequireRestartOnSave = false

[[workflows.workflow.tasks]]
task = "packager.installForAll"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm run dev"
waitForPort = 5000
