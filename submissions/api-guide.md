# ECSoC_2026: Submissions Interactive API Guide

This page explains how to interact with the backend API endpoints exposed by the Furnix web portal server.

## Endpoints

### POST `/api/contact`
Submit messages to the support channel.

#### Parameters:
- `name` (string, min 2 chars)
- `email` (valid email string)
- `message` (string, min 10 chars)
