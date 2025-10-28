# Deployment Guide - Alpha Assessoria Dashboard

## 🚀 Production URLs

**Frontend (Netlify):** https://alpha-assessoria-dashboard.netlify.app
**Backend (Localtunnel):** https://eighty-streets-allow.loca.lt
**Admin:** https://app.netlify.com/projects/alpha-assessoria-dashboard

---

## 📋 Architecture

```
┌─────────────────────────────────────────────────┐
│  Frontend (Netlify)                             │
│  https://alpha-assessoria-dashboard.netlify.app │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Backend (Local + Localtunnel)                  │
│  localhost:3000 → https://eighty-streets-allow.loca.lt
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Evolution API (Local)                          │
│  localhost:8080                                 │
└─────────────────────────────────────────────────┘
```

---

## 🏃 Running the System

### Prerequisites

1. Evolution API must be running on localhost:8080
2. Backend server must be running on localhost:3000
3. Localtunnel must expose backend to the internet

### Start All Services

```bash
# Terminal 1 - Evolution API
cd /Users/juanminni/meu-repositorio/evolution-api
npm start

# Terminal 2 - Alpha Dashboard Backend
cd /Users/juanminni/meu-repositorio/alpha-web-dashboard
npm start

# Terminal 3 - Localtunnel (expose backend)
lt --port 3000
```

### Important Notes

- **Localtunnel URL changes on restart**: Every time you restart Localtunnel, you get a new URL
- If the backend URL changes, you need to:
  1. Update `public/env-config.js` with the new URL
  2. Redeploy to Netlify: `netlify deploy --prod --dir=public`

---

## 🔄 Redeployment Process

### When Backend URL Changes

```bash
# 1. Stop Localtunnel (Ctrl+C)

# 2. Start new Localtunnel
lt --port 3000
# Note the new URL (e.g., https://new-url.loca.lt)

# 3. Update env-config.js
# Edit file: /Users/juanminni/meu-repositorio/alpha-web-dashboard/public/env-config.js
# Change: window.ALPHA_API_URL = 'https://NEW-URL.loca.lt';

# 4. Redeploy to Netlify
cd /Users/juanminni/meu-repositorio/alpha-web-dashboard
netlify deploy --prod --dir=public

# 5. Commit changes
git add .
git commit -m "Update backend URL"
```

### Full Deployment from Scratch

```bash
# 1. Create Netlify site (first time only)
netlify sites:create --name alpha-assessoria-dashboard

# 2. Link to site
netlify link --name alpha-assessoria-dashboard

# 3. Deploy
netlify deploy --prod --dir=public
```

---

## 🔧 Configuration Files

### netlify.toml
```toml
[build]
  publish = "public"
  command = "echo 'No build required'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### public/env-config.js
```javascript
window.ALPHA_API_URL = 'https://eighty-streets-allow.loca.lt';
```

This file controls which backend URL the frontend connects to.

---

## 🛠️ Maintenance

### Check Backend Status

```bash
# Test backend API
curl https://eighty-streets-allow.loca.lt/api/status

# Expected response:
# {"status":"ok","whatsapp":{"state":"open"}}
```

### View Netlify Logs

```bash
netlify logs
```

### View Backend Logs

Backend runs in Terminal 2, logs appear there in real-time.

### Restart Everything

```bash
# Stop all services (Ctrl+C in each terminal)
# Then restart in order:

# 1. Evolution API
cd /Users/juanminni/meu-repositorio/evolution-api
npm start

# 2. Alpha Backend
cd /Users/juanminni/meu-repositorio/alpha-web-dashboard
npm start

# 3. Localtunnel
lt --port 3000

# 4. Update env-config.js with new Localtunnel URL
# 5. Redeploy to Netlify
```

---

## 📱 Access Dashboard

**Production URL:** https://alpha-assessoria-dashboard.netlify.app

Account managers can access this URL from any device with internet connection.

The dashboard will:
- Show real-time WhatsApp connection status
- Display all groups created
- Allow creating new groups
- Show daily/weekly statistics

---

## 🚨 Troubleshooting

### "API Offline" in Dashboard

**Problem:** Frontend can't reach backend

**Solutions:**
1. Check backend is running: `lsof -i :3000`
2. Check Localtunnel is running
3. Verify env-config.js has correct URL
4. Test backend directly: `curl [LOCALTUNNEL_URL]/api/status`

### "WhatsApp Desconectado"

**Problem:** Evolution API lost WhatsApp connection

**Solution:**
```bash
# Reconnect WhatsApp
curl http://localhost:8080/instance/connect/shieldcar \
  -H "apikey: shieldcar_evolution_2024_secure_key_12345"

# Scan QR code with WhatsApp
```

### Localtunnel "Connection Closed"

**Problem:** Localtunnel disconnected

**Solution:**
```bash
# Restart Localtunnel
lt --port 3000

# Update env-config.js with new URL
# Redeploy to Netlify
```

### Groups Not Saving

**Problem:** Backend can't write to grupos-criados/ folder

**Solution:**
```bash
# Check folder exists and has write permissions
ls -la /Users/juanminni/meu-repositorio/alpha-web-dashboard/grupos-criados/

# Create if needed
mkdir -p /Users/juanminni/meu-repositorio/alpha-web-dashboard/grupos-criados/
chmod 755 /Users/juanminni/meu-repositorio/alpha-web-dashboard/grupos-criados/
```

---

## 🔐 Security Considerations

**Current Setup (Development):**
- Backend API is open (no authentication)
- Evolution API key is in .env
- Localtunnel URLs are public but hard to guess

**For Production (Future):**
- Add authentication to dashboard
- Use HTTPS reverse proxy instead of Localtunnel
- Deploy backend to cloud service (Render, Railway, Heroku)
- Use environment variables in Netlify for API URL
- Add rate limiting to API endpoints

---

## 📊 Monitoring

### Current Services Status

```bash
# Check all services running
lsof -i :8080  # Evolution API
lsof -i :3000  # Alpha Backend
ps aux | grep "lt --port 3000"  # Localtunnel

# Check Netlify deployment
netlify status
```

### View Recent Groups

```bash
ls -lt /Users/juanminni/meu-repositorio/alpha-web-dashboard/grupos-criados/ | head -10
```

---

## 🎯 Next Steps for Production

1. **Replace Localtunnel** with permanent solution:
   - Deploy backend to Railway/Render
   - Use custom domain
   - Add SSL certificate

2. **Add Authentication:**
   - Implement login system
   - Role-based access (admin, account manager, viewer)

3. **Environment Variables:**
   - Use Netlify env vars instead of env-config.js
   - Inject API URL during build

4. **Monitoring:**
   - Set up uptime monitoring
   - Error tracking (Sentry)
   - Analytics

---

## 📝 Changelog

**2024-10-27 - Initial Deployment**
- Deployed frontend to Netlify
- Backend exposed via Localtunnel
- All services running and connected
- Dashboard accessible at production URL

---

**Desenvolvido por:** Juan Minni
**Para:** Assessoria Alpha - Blumenau
**Data:** Outubro 2024
