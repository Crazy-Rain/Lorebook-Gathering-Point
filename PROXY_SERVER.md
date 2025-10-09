# CORS Proxy Server for Lorebook Generator

This is a built-in CORS proxy server that solves common connection issues when using the Lorebook Generator.

## Why Use the Proxy Server?

The proxy server solves these common problems:

1. **CORS Errors**: Browser security restrictions that block API requests
2. **Browser Extension Blocking**: Ad blockers and privacy tools that interfere with requests
3. **Firewall Issues**: Network restrictions that prevent direct API access
4. **HTTPS Proxy Compatibility**: Some proxy services only support server-to-server requests

**When to use it:**
- ✅ You get CORS errors in the browser console
- ✅ Your setup works in SillyTavern but not in browsers
- ✅ Browser extensions are blocking your API requests
- ✅ Your local API doesn't support CORS configuration
- ✅ You're behind a restrictive firewall

## Installation

```bash
# Navigate to the project directory
cd /path/to/Lorebook-Gathering-Point

# Install dependencies (one-time setup)
npm install
```

## Starting the Server

```bash
npm start
```

You should see:
```
╔═══════════════════════════════════════════════════════════════╗
║  Lorebook Generator CORS Proxy Server                        ║
╚═══════════════════════════════════════════════════════════════╝

✓ Server running at: http://localhost:3000
✓ Web interface:     http://localhost:3000
✓ Proxy endpoint:    http://localhost:3000/proxy/<target-url>
```

## How to Use

### Method 1: Direct URL (Simplest)

1. Start the proxy server: `npm start`
2. Open `http://localhost:3000` in your browser
3. Configure your API endpoint URL as normal (e.g., `https://api.openai.com/v1`)
4. The proxy automatically handles CORS - no special configuration needed!

### Method 2: Explicit Proxy URL

If you need more control, you can use the explicit proxy endpoint:

1. Start the proxy server: `npm start`
2. Open `http://localhost:3000` in your browser
3. In the API settings, use this format for the API Base URL:
   ```
   http://localhost:3000/proxy/https://api.openai.com/v1
   ```
4. Configure your API key and model as normal

## Examples

### Example 1: OpenAI API

**Without Proxy (may have CORS issues):**
- API Base URL: `https://api.openai.com/v1`
- API Key: `sk-your-key-here`

**With Proxy (no CORS issues):**
- API Base URL: `http://localhost:3000/proxy/https://api.openai.com/v1`
- API Key: `sk-your-key-here`

### Example 2: HTTPS Proxy Service

**Without Proxy (often blocked by browser):**
- API Base URL: `https://anas-proxy.xyz/v1`
- API Key: `your-proxy-key`

**With Proxy (bypasses browser restrictions):**
- API Base URL: `http://localhost:3000/proxy/https://anas-proxy.xyz/v1`
- API Key: `your-proxy-key`

### Example 3: Local API (LM Studio, Oobabooga, etc.)

**Without Proxy (requires CORS configuration):**
- API Base URL: `http://localhost:1234/v1`
- Requires CORS enabled on the local API server

**With Proxy (no CORS configuration needed):**
- API Base URL: `http://localhost:3000/proxy/http://localhost:1234/v1`
- No CORS configuration needed on the local API server

## Configuration

### Custom Port

To use a different port, set the `PORT` environment variable:

```bash
# Linux/Mac
PORT=8080 npm start

# Windows (Command Prompt)
set PORT=8080 && npm start

# Windows (PowerShell)
$env:PORT=8080; npm start
```

## Troubleshooting

### "Cannot find module 'express'"

You need to install dependencies first:
```bash
npm install
```

### "Port 3000 is already in use"

Either:
1. Stop the other service using port 3000
2. Use a different port: `PORT=8080 npm start`

### Proxy returns errors

Check the server console output for detailed error messages. Common issues:
- Invalid target URL format
- Target API server is not running or unreachable
- Network/firewall blocking outbound requests from the proxy

## How It Works

1. The proxy server receives your API request
2. It forwards the request to the actual API endpoint
3. The API response is sent back to your browser
4. All CORS headers are properly configured by the proxy

This works because:
- Browser → Proxy: Same origin (localhost), no CORS issues
- Proxy → API: Server-to-server request, no CORS restrictions
- API → Proxy → Browser: Proxy adds proper CORS headers

## Security Note

The proxy server only runs locally on your machine. It does not send your API keys or data anywhere except to the API endpoint you configure. All communication happens between:
- Your browser
- The local proxy server (on your machine)
- Your configured API endpoint

Your API keys and data remain private and secure.

## Advanced Usage

### Using with Custom Headers

The proxy forwards most headers from your browser to the target API, including:
- `Authorization`
- `Content-Type`
- Custom headers

### Accessing from Other Devices

By default, the server only listens on localhost. If you want to access it from other devices on your network:

1. Modify `proxy-server.js` to listen on `0.0.0.0` instead of the default
2. Use your computer's local IP address (e.g., `http://192.168.1.100:3000`)
3. Be aware of security implications (your proxy will be accessible to other devices on your network)

## Support

For issues or questions about the proxy server, please check:
- [SETUP.md](SETUP.md) - Full setup instructions
- [README.md](README.md) - Main documentation
- [TROUBLESHOOTING_HTTPS_PROXIES.md](TROUBLESHOOTING_HTTPS_PROXIES.md) - Proxy-specific troubleshooting
