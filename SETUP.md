# Setup Guide

Complete setup instructions for running the Lorebook Generator.

## Prerequisites

- A web browser (Chrome, Firefox, Safari, Edge, etc.)
- Python 3, Node.js, or PHP installed (for running the web server)
- An API endpoint (OpenAI, local model server, or proxy service)

## Step 1: Get the Files

Download or clone this repository:
```bash
git clone https://github.com/Crazy-Rain/Lorebook-Gathering-Point.git
cd Lorebook-Gathering-Point
```

Or download the ZIP file and extract it.

## Step 2: Start the Web Server

⚠️ **CRITICAL**: You MUST run this tool via a web server. Opening `index.html` directly (file://) will NOT work due to CORS restrictions.

Choose one of the following methods:

### Option A: Python (Recommended - Works on Windows, Mac, Linux)

```bash
# Navigate to the project directory
cd /path/to/Lorebook-Gathering-Point

# Start the server
python3 -m http.server 8080

# On Windows, you might need to use:
python -m http.server 8080
```

You should see:
```
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```

### Option B: Node.js

```bash
# Navigate to the project directory
cd /path/to/Lorebook-Gathering-Point

# Install serve globally (one-time setup)
npm install -g serve

# Or use npx (no installation needed)
npx serve
```

### Option C: PHP

```bash
# Navigate to the project directory
cd /path/to/Lorebook-Gathering-Point

# Start the server
php -S localhost:8080
```

### Option D: Visual Studio Code (if you use VS Code)

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Step 3: Open in Browser

Open your web browser and navigate to:
```
http://localhost:8080
```

**Verify the setup:**
- Check that your browser's address bar shows `http://localhost:8080` (not `file://...`)
- The page should load without errors
- Open the browser console (F12) and check for any CORS errors

## Step 4: Configure Your API

### For OpenAI

1. **API Base URL**: `https://api.openai.com/v1`
2. **API Key**: Your OpenAI API key (starts with `sk-`)
3. **Model Name**: `gpt-3.5-turbo` or `gpt-4`
4. Click **"Test Connection"**

### For Anthropic Claude (via Proxy)

1. **API Base URL**: `https://anas-proxy.xyz/v1` (or your proxy URL)
2. **API Key**: Your proxy service API key
3. **Model Name**: `claude-sonnet-4-5-20250929` or other Claude model
4. Click **"Test Connection"**

**Note**: Even with an invalid API key, you should get a 401/403 error (not a connection error). This confirms the server is reachable.

### For LM Studio (Local)

1. Start LM Studio and load a model
2. In LM Studio, go to "Local Server" tab
3. Click "Start Server" (default port is usually 1234)
4. In the Lorebook Generator:
   - **API Base URL**: `http://localhost:1234/v1`
   - **API Key**: Any placeholder text (e.g., `lm-studio`)
   - **Model Name**: Check LM Studio for the exact model name
5. Click **"Test Connection"**

### For Text Generation WebUI / Oobabooga (Local)

1. Start Text Generation WebUI with the `--api` flag
2. Make sure it's running on the expected port (usually 5000 or 5001)
3. In the Lorebook Generator:
   - **API Base URL**: `http://localhost:5000/v1`
   - **API Key**: Any placeholder text
   - **Model Name**: Your loaded model name
4. Click **"Test Connection"**

**Important for local APIs**: You may need to enable CORS in your API server's settings.

## Step 5: Test the Connection

### Quick Test
1. Click the **"Test Connection"** button in the main interface
2. Check the status message:
   - ✅ Success: "API connection successful!"
   - ❌ Error: Read the error message for troubleshooting tips

### Detailed Diagnostic Test

If the quick test fails, use the diagnostic utility:

1. Open `http://localhost:8080/test-api-connection.html`
2. Enter your API details:
   - API Base URL
   - API Key
   - Model Name (optional)
3. Click **"🚀 Run Connection Tests"**
4. Review the detailed results:
   - Step 1: URL format validation
   - Step 2: `/models` endpoint test
   - Step 3: `/chat/completions` endpoint test

The diagnostic tool provides specific error messages and troubleshooting suggestions for each failure point.

## Troubleshooting

### "Connection Error: Unable to reach the API endpoint"

**Cause**: This usually means:
1. You're accessing via `file://` instead of `http://localhost`
2. CORS is not configured on your local API server
3. The API server is not running
4. Firewall is blocking the connection

**Solution**:
1. ✅ Verify you're accessing via `http://localhost:8080` (check browser address bar)
2. ✅ If using a local API, enable CORS in the server settings
3. ✅ Check that your API server is running and accessible
4. ✅ Check firewall settings

### "Authentication failed (401/403)"

**This is actually good news!** It means:
- ✅ The connection is working
- ✅ The server is reachable
- ❌ The API key is invalid or lacks permissions

**Solution**: Check your API key is correct.

### "Endpoint not found (404)"

**Cause**: The API URL is incorrect or doesn't support the requested endpoint.

**Solution**:
1. Verify the URL ends with `/v1` (most OpenAI-compatible APIs)
2. Check your API provider's documentation for the correct endpoint
3. Try removing or adding `/v1` to the URL

### "Bad request (400)"

**This means the connection is working!** The issue is likely:
- Invalid model name
- Unsupported request format

**Solution**:
1. Click "🔄 Refresh Models" to see available models
2. Verify the model name matches what your API expects
3. Check your API server logs for more details

### CORS Errors in Browser Console

If you see CORS errors in the browser console (F12):

**For local APIs**:
1. Enable CORS in your API server settings
2. Add your origin (`http://localhost:8080`) to the allowed origins
3. Restart your API server

**For cloud APIs**:
- Make sure you're accessing via `http://localhost` (not `file://`)
- Cloud APIs should already have CORS properly configured

## Next Steps

Once your API connection is working:

1. **Create Lorebook Entries**:
   - Upload a file or paste source text
   - Click "🤖 Generate Entries with AI"
   - Review the generated entries

2. **Download Your Lorebook**:
   - Set a name and description
   - Click "💾 Download Lorebook"

3. **Import into SillyTavern**:
   - Open SillyTavern
   - Navigate to the lorebook section
   - Import your downloaded JSON file

## Additional Resources

- [Quick Start Guide](QUICKSTART.md) - 5-minute overview
- [README](README.md) - Full documentation
- [Examples](EXAMPLES.md) - Usage examples
- [Test Utility](http://localhost:8080/test-api-connection.html) - Diagnostic tool (after starting web server)

## Getting Help

If you're still having issues:

1. Use the diagnostic test utility at `test-api-connection.html`
2. Check the browser console (F12) for error messages
3. Review the troubleshooting section in README.md
4. Open an issue on GitHub with:
   - Your setup (OS, browser, API type)
   - Error messages from the test utility
   - Browser console logs (F12)
