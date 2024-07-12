# SLA_2024
T-NSA-700-PAR-24

## What's this ?
The goal of this project is to automate the installation, test, build & deployment of a project (CI/CD), with Laravel as back-end and Angular as front end. These parts are available at /app directory.

## About the infrastructure
We decided to do the deployment on 3 Debian 10 VMs (back, front and db).
To initialize these VMs, we first need to launch the `global_playbook` via:

- For VirtualBox environment:
```shell
ansible-playbook -i utm_inventory.yml front_playbook.yml --vault-password-file vault-password-file.txt
```
- For UTM (macOS) environment:
```shell
ansible-playbook -i inventory.yml front_playbook.yml --vault-password-file vault-password-file.txt
```

The `global_playbook` triggers `ssh` role which will insert the local SSH key and set up for future no-password SSH connection. This playbook can be launched on all 3 VMs at the same time.

## About the automation
This project uses Ansible as the tool to install, import, and configure the project via scripts.

For the Laravel back-end, we have `back_playbook` which contains `nginx`, `php` and `composer` roles.
Respectively for others, we have `front_playbook` and `database_playbook`.

These playbooks simulate the setup for a development environment.

## CI/CD

Github Actions is in place for CI/CD part.

### Continuous integration
A ```main.yml``` workflow is used to launch Laravel's unit tests on each push to `dev` branch.

### Continuous deployment
For each part of the project(back and front), we have separate workflows, which will generate artifacts on each push to `main` branch.

## Contributors
- Vu Minh Duc BUI
- Nicolas TRAN
- Chun LAM
- Charles LAMARQUE
- Florian AUTOUR

@2024 This is an Epitech's project
