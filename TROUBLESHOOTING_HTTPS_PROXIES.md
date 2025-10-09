# Troubleshooting HTTPS Proxy Endpoints

This document provides detailed guidance for connecting to HTTPS proxy services like `https://anas-proxy.xyz/v1` from this browser-based tool.

## Understanding the Issue

### Why HTTPS Proxies Can Be Challenging

When you use this tool to connect to an HTTPS proxy endpoint (like `https://anas-proxy.xyz/v1`), you may encounter connection errors even though the same endpoint works perfectly in SillyTavern. This happens because:

1. **Browser Security Model**: Browser-based tools make direct requests from JavaScript, which are subject to:
   - CORS (Cross-Origin Resource Sharing) restrictions
   - Browser security policies
   - Extension interference (ad blockers, privacy tools)
   - Mixed content policies

2. **SillyTavern's Architecture**: SillyTavern typically routes API requests through its own backend/proxy, which:
   - Avoids browser CORS restrictions
   - Bypasses browser extension blocking
   - Has different security constraints

3. **Browser Extensions**: Ad blockers and privacy extensions often block requests to proxy services, resulting in `ERR_BLOCKED_BY_CLIENT` errors.

## Common Error Messages and Solutions

### "Failed to fetch" or "Connection Error"

**Symptom**: You see a generic "Failed to fetch" error when testing the connection.

**Browser Console Shows**: `ERR_BLOCKED_BY_CLIENT` (Press F12 to check)

**Solutions**:
1. **Disable browser extensions temporarily**
   - Disable ad blockers (uBlock Origin, AdBlock Plus, etc.)
   - Disable privacy extensions (Privacy Badger, Ghostery, etc.)
   - Try in an incognito/private window (which often disables extensions by default)

2. **Try a different browser**
   - Some browsers have stricter security policies
   - Firefox, Chrome, Edge, and Brave may behave differently

3. **Verify the proxy is accessible**
   - Open the API URL directly in your browser (e.g., `https://anas-proxy.xyz/v1/models`)
   - You should get a JSON response or a 401/403 error (not a connection error)
   - If you get a connection error, the service may be down

### CORS Errors

**Symptom**: Browser console shows CORS-related errors like "No 'Access-Control-Allow-Origin' header"

**Explanation**: The proxy server may not be configured to accept requests from browser-based clients.

**Solutions**:
1. **Check proxy documentation**: Some proxies only support server-to-server requests
2. **Contact proxy provider**: Ask if they support direct browser access
3. **Consider alternatives**:
   - Use a local CORS proxy
   - Use SillyTavern instead (which has its own proxy mechanism)
   - Use the API from a backend/server rather than browser

### Authentication Errors (401/403)

**Good news!** If you get a 401 or 403 error, it means:
- ✅ The connection is working
- ✅ The server is reachable
- ❌ Your API key is invalid or lacks permissions

**Solution**: Verify your API key is correct.

## Testing Steps

### 1. Basic Connectivity Test

Use the [API Connection Test Utility](test-api-connection.html) to diagnose the issue:

```
1. Open test-api-connection.html in your browser
2. Enter the proxy URL (e.g., https://anas-proxy.xyz/v1)
3. Enter your API key (or "test-key" for testing)
4. Click "Run Connection Tests"
5. Review the detailed diagnostics
```

### 2. Browser Console Check

Press **F12** to open browser developer tools:

1. Go to the **Console** tab
2. Look for error messages when you test the connection
3. Common errors:
   - `ERR_BLOCKED_BY_CLIENT` → Browser extension blocking
   - `CORS error` → Server doesn't allow browser requests
   - `Failed to fetch` → Generic network error

### 3. Extension Isolation

Test in an incognito/private window:

1. Open an incognito/private browser window
2. Navigate to `http://localhost:8080`
3. Try the connection test again
4. If it works here but not in regular mode, an extension is interfering

### 4. Direct API Access

Test the API directly in your browser:

1. Open a new tab
2. Navigate to: `https://anas-proxy.xyz/v1/models`
3. What you should see:
   - **JSON response**: Server is working and accessible
   - **401/403 error**: Server is working (just needs valid auth)
   - **Connection error**: Server may be down or unreachable
   - **CORS error**: Server doesn't allow direct browser access

## Alternative Solutions

If the proxy doesn't work from this browser-based tool:

### Option 1: Use SillyTavern

SillyTavern is designed to handle proxy connections and has its own backend that avoids browser restrictions.

### Option 2: Set Up a Local CORS Proxy

You can set up a simple CORS proxy on your machine:

```bash
# Using Node.js CORS-anywhere
npx cors-anywhere
```

Then configure the tool to use: `http://localhost:8080/https://anas-proxy.xyz/v1`

### Option 3: Use a Different Endpoint

Consider using:
- OpenAI's official API (if you have an account)
- A local model via LM Studio or Text Generation WebUI
- A different proxy service that supports browser access

## Summary

**The tool is working correctly** - the issue is the combination of:
1. Browser security restrictions (CORS, extensions, policies)
2. The proxy service's configuration (may not allow browser clients)
3. Extension interference (ad blockers)

**This is normal behavior** for browser-based tools connecting to HTTPS proxies. The improved error messages now help you:
- Identify the specific issue
- Get actionable troubleshooting steps
- Understand why it works in SillyTavern but not here

## Need More Help?

If you've tried all the solutions above and still can't connect:

1. Check the proxy service's documentation
2. Contact the proxy service provider
3. Use the detailed diagnostics in the test utility
4. Consider using SillyTavern instead for proxy endpoints

---

**Note**: This tool works great with:
- OpenAI's official API
- Local APIs (LM Studio, Text Generation WebUI, Oobabooga)
- Any OpenAI-compatible API that supports browser CORS
- Proxy services that are configured for browser access
