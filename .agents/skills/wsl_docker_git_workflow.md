---
name: wsl_docker_git_workflow
description: Best practices and tool execution patterns for Git SSH, Docker builds/pulls, VS Code CLI, and localhost port testing in WSL environments.
---

# WSL, Docker & Git Remote Workflow Guidelines

## 1. Git Remote Operations (GitHub / SSH)
- Run standard local git commands (`git status`, `git diff`, `git log`) in standard sandbox mode (`BypassSandbox: false`).
- Use `BypassSandbox: true` specifically for network-bound git operations (`git fetch`, `git pull`, `git push`) when using remote SSH/HTTPS repos.

## 2. Docker Build & Registry Access
- Standard sandbox mode blocks outbound access to `auth.docker.io` / `registry.docker.io`.
- Always execute `docker build` or `docker pull` with `BypassSandbox: true` when base images need to be fetched from external registries.

## 3. Host VS Code CLI Launching
- To open files or workspace folders in VS Code (`code <path>`), execute with `BypassSandbox: true` to access host binary paths and execution contexts.

## 4. Localhost Port Verification
- When inspecting web services bound to host ports (e.g. `docker run -p 8080:80`), run verification commands like `curl http://localhost:8080/` with `BypassSandbox: true` to bridge the containerized sandbox network namespace.

