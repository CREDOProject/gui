#!/bin/bash

read -rp "Enter the Git repository path: " REPO_PATH

if [ ! -d "$REPO_PATH" ]; then
    echo "Error: Directory $REPO_PATH does not exist."
    exit 1
fi

read -rp "Enter the deployment path: " DEPLOYMENT_PATH

if [ ! -d "$DEPLOYMENT_PATH" ]; then
    echo "Error: Directory $DEPLOYMENT_PATH does not exist."
    exit 1
fi

read -rp "Is this a bare repository? (yes/no): " IS_BARE

if [[ "$IS_BARE" =~ ^[Yy] ]]; then
    HOOK_PATH="$REPO_PATH/hooks/post-receive"
else
    HOOK_PATH="$REPO_PATH/.git/hooks/post-receive"
fi

mkdir -p "$(dirname "$HOOK_PATH")"

cat > "$HOOK_PATH" << EOF
#!/bin/sh

while read oldrev newrev refname
do
    branch=\$(git rev-parse --symbolic --abbrev-ref \$refname)
    if [ "main" = "\$branch" ]; then
        if git diff --quiet HEAD~1 HEAD; then
            echo "No changes detected. Skipping deployment."
            exit 0
        fi

        GIT_WORK_TREE=$DEPLOYMENT_PATH git checkout -f main
        cd $DEPLOYMENT_PATH/deployment/ || exit 1
        docker compose up -d --build &
    fi
done
EOF

chmod +x "$HOOK_PATH"

echo "Post-receive hook installed at $HOOK_PATH"
