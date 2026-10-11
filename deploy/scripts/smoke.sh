#!/usr/bin/env bash
set -euo pipefail

echo "==> Running smoke check against http://localhost:8006..."
curl -fsS "http://localhost:8006/healthz"
echo ""
echo "==> Smoke check passed!"
