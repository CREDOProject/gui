#!/bin/bash

set -euo pipefail

DEPENCENCIES="/credo_env/dependencies.txt"

mkdir -p /credo_env
cd /credo_env

if [[ ! -f "$DEPENCENCIES" ]]; then
    echo "Dependencies file not found!"
    exit 1
fi

for line in $(cat $DEPENCENCIES); do
    IFS=':' read -r repo package <<< "$line"
    credo $repo $package
done

credo save
