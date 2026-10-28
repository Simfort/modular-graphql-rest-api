# GraphQL & REST API Server

A lightweight backend project built with Node.js and TypeScript, featuring both REST and GraphQL APIs.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white" alt="GraphQL" />
  <img src="https://img.shields.io/badge/REST_API-005571?style=flat-square" alt="REST API" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite" />
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#api-documentation">API Docs</a>
</p>

---

## Overview

This project is an example of a backend server that exposes the same application through REST and GraphQL. It includes user authentication, post management, pagination, and several measures to help protect the API from abuse.

## Features

- **Authentication** — user registration and cookie-based sessions
- **Post management** — create, retrieve, and delete posts
- **Pagination** — retrieve posts in configurable pages
- **Rate limiting** — limit repeated requests
- **GraphQL query depth protection** — guard against deeply nested queries
- **Input validation** — request validation with Zod
- **API documentation** — interactive REST documentation with Swagger UI

## Tech Stack

| Technology              | Purpose                        |
| ----------------------- | ------------------------------ |
| Node.js                 | JavaScript runtime             |
| Express                 | HTTP server and REST endpoints |
| TypeScript              | Static typing                  |
| GraphQL & Apollo Server | GraphQL API                    |
| SQLite                  | Database                       |
| Zod                     | Input validation               |
| Swagger / OpenAPI       | REST API documentation         |

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone <your-repository-url>
cd <repository-folder>
npm install
```

Create a `.env` file with the environment variables required by the project, then start the server using the appropriate script from `package.json`.

### API Documentation

Once the server is running, open Swagger UI:

<p align="center">
  <a href="http://localhost:3000/api-docs">
    <img src="https://img.shields.io/badge/Open-Swagger_UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Open Swagger UI" />
  </a>
</p>

Local URL: `http://localhost:3000/api-docs`

## Project Structure

```text
src/
├── doc/       # OpenAPI configuration
├── graphql/   # GraphQL server and context
├── http/      # API routing
├── modules/   # Auth and posts modules
└── shared/    # Shared utilities and errors
```

---

<p align="center">
  Built as a hands-on project to explore REST, GraphQL, and backend API security.
</p>
