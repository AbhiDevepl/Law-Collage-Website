# ============================================================
# GITHUB SECRETS LIST (B2)
# ============================================================
# Add these secrets in GitHub repository:
# Settings → Secrets and variables → Actions → New repository secret

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| VPS_HOST | VPS public IP or domain | 123.456.789.10 or ssnlc.in |
| VPS_USER | SSH username for deployment | devx |
| SSH_PRIVATE_KEY | Private SSH key for VPS access (id_ed25519) | -----BEGIN OPENSSH PRIVATE KEY-----\n...\n-----END OPENSSH PRIVATE KEY----- |
| JWT_SECRET | Secret key for JWT tokens (optional, can also be in .env) | your_super_secure_random_string_here |
| DISCORD_WEBHOOK | Discord webhook URL for notifications (optional) | https://discord.com/api/webhooks/... |

# ============================================================
# HOW TO SET UP SSH PRIVATE KEY SECRET
# ============================================================

# 1. On your LOCAL machine (not VPS), generate SSH key:
ssh-keygen -t ed25519 -C "github-actions@ssnlc.in" -f ~/.ssh/ssnlc_deploy

# 2. Copy PUBLIC key to VPS:
ssh-copy-id -i ~/.ssh/ssnlc_deploy.pub devx@YOUR_VPS_IP

# 3. Test connection:
ssh -i ~/.ssh/ssnlc_deploy devx@YOUR_VPS_IP

# 4. Add PRIVATE key content to GitHub Secret (SSH_PRIVATE_KEY):
# Copy the entire content of ~/.ssh/ssnlc_deploy (without newlines if needed)

# 5. Add public key to VPS authorized_keys if not done via ssh-copy-id

# ============================================================
# VERIFY SSH ACCESS FROM GITHUB ACTIONS
# ============================================================

# Add this to your workflow to test SSH access:
# - name: Test SSH Connection
#   uses: appleboy/ssh-action@v1.0.3
#   with:
#     host: ${{ secrets.VPS_HOST }}
#     username: ${{ secrets.VPS_USER }}
#     key: ${{ secrets.SSH_PRIVATE_KEY }}
#     script: |
#       echo "SSH connection successful!"
#       whoami
#       pwd