# Quick Start Guide

Get started with the Lorebook Generator in 5 minutes!

## Step 1: Open the Interface

⚠️ **IMPORTANT**: For API connections to work properly, you **must** run this tool via a web server (not by opening `index.html` directly).

### Recommended Setup (Choose one method):

**Option 1: Using Python (Simple)**
```bash
# Navigate to the project directory
cd /path/to/Lorebook-Gathering-Point

# Start the web server
python3 -m http.server 8080

# Or on Windows, you might need:
python -m http.server 8080
```

**Option 2: Using Node.js**
```bash
# Navigate to the project directory
cd /path/to/Lorebook-Gathering-Point

# Install and run serve (if not already installed)
npx serve

# Or if you have serve installed globally:
serve
```

**Option 3: Using PHP**
```bash
# Navigate to the project directory
cd /path/to/Lorebook-Gathering-Point

# Start the web server
php -S localhost:8080
```

**Option 4: Using Node.js with Built-in CORS Proxy (⭐ BEST for CORS/Firewall Issues!)**
```bash
# Navigate to the project directory
cd /path/to/Lorebook-Gathering-Point

# Install dependencies (one-time setup)
npm install

# Start the server with proxy
npm start
```

**Then navigate to:**
- `http://localhost:8080` for Options 1-3
- `http://localhost:3000` for Option 4 (proxy server)

**⭐ Why use the Proxy Server (Option 4)?**
- ✅ Automatically handles ALL CORS issues
- ✅ Bypasses browser extension blocking
- ✅ Works around firewall restrictions
- ✅ No API server configuration needed
- ✅ Perfect if your setup works in SillyTavern but not in browsers

### Why is this necessary?

- **CORS Protection**: Modern browsers block API requests from `file://` URLs for security
- **API Compatibility**: Most API endpoints expect requests from `http://` or `https://` origins
- **Local Testing**: Even local APIs like LM Studio need proper HTTP origins

### Verification

You'll know it's working correctly when:
- Your browser's address bar shows `http://localhost:8080` (not `file://`)
- The "Test Connection" button can successfully reach your API
- No CORS errors appear in the browser console (press F12 to check)

## Step 2: Configure Your API

### API Endpoint Examples

Choose the endpoint that matches your setup:

**OpenAI (Official)**
- URL: `https://api.openai.com/v1`
- API Key: Your OpenAI API key (starts with `sk-`)
- Model: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, etc.

**Anthropic Claude via Proxy**
- URL: `https://anas-proxy.xyz/v1` (or other Claude proxy)
- API Key: Your proxy API key
- Model: `claude-sonnet-4-5-20250929`, `claude-3-opus-20240229`, etc.
- ⚠️ **Note**: Browser extensions (ad blockers) may interfere with HTTPS proxies. If connection fails, try disabling extensions and check browser console (F12).

**Local Models**
- **LM Studio**: 
  - URL: `http://localhost:1234/v1`
  - API Key: Not required (use any placeholder like `lm-studio`)
  - Model: Your loaded model name
  
- **Text Generation WebUI / Oobabooga**: 
  - URL: `http://localhost:5000/v1`
  - API Key: Not required (use any placeholder)
  - Model: Check your loaded model

**Other OpenAI-Compatible APIs**
- Any service that implements the OpenAI API format
- URL should typically end with `/v1`
- Check your provider's documentation for the correct endpoint

### Setup Steps

1. **Enter your API endpoint URL** in the "API Base URL" field

2. **Enter your API key**
   - Required for: OpenAI, proxy services, and most cloud APIs
   - Optional for: Local APIs (LM Studio, Text Generation WebUI)
   - If unsure, try entering any placeholder text for local APIs

3. **Enter your model name**
   - Must match exactly what your API expects
   - Use "🔄 Refresh Models" to auto-detect available models
   - Or check your API provider's documentation

4. **Click "Test Connection"** to verify everything works
   - ✅ Success: You'll see "API connection successful!"
   - ❌ Error: Follow the troubleshooting tips in the error message
   
### Troubleshooting Connection Tests

**What you should see:**
- **Valid connection**: "API connection successful!" (even without a valid API key, you might see 401/403)
- **Invalid URL/CORS issue**: "Connection Error: Unable to reach the API endpoint"

**If you get a connection error:**
1. Make sure you're accessing via `http://localhost:8080` (not `file://`)
2. Check that the API URL is correct (typos, missing `/v1`, etc.)
3. For local APIs, ensure the server is running
4. For cloud APIs, check your internet connection

**If you get authentication errors (401/403):**
- ✅ **Good news**: The connection is working!
- Check your API key is correct
- Verify the key has proper permissions

## Step 3: Create Lorebook Entries

### Option A: Upload a Document

1. Click the **"📁 Browse Files"** button

2. Select a file from your computer
   - Supported formats: TXT, PDF, JSON, Word (.doc/.docx), Markdown (.md)
   - The file content will load automatically into the source text field

3. Review the loaded content

4. Click **"🤖 Generate Entries with AI"** to process the content

### Option B: Use AI to Generate Entries

1. Paste your source text in the "Source Text/Information" field
   ```
   Example: Character descriptions, world lore, background information
   ```

2. (Optional) Customize the processing instructions

3. Click **"🤖 Generate Entries with AI"**

4. Wait for the AI to process and create entries

5. Review the generated entries

### Option B: Use AI to Generate Entries

1. Paste your source text in the "Source Text/Information" field
   ```
   Example: Character descriptions, world lore, background information
   ```

2. (Optional) Customize the processing instructions

3. Click **"🤖 Generate Entries with AI"**

4. Wait for the AI to process and create entries

5. Review the generated entries

### Option C: Add Entries Manually

1. Enter trigger keys (comma-separated)
   ```
   Example: character name, nickname, alias
   ```

2. Enter the entry content
   ```
   Example: Character description and background
   ```

3. Click **"Add Entry"**

## Step 4: Download Your Lorebook

1. (Optional) Set a lorebook name and description

2. Review all entries in the "Current Lorebook Entries" section

3. Click **"💾 Download Lorebook"**

4. Save the `.json` file

## Step 5: Import into SillyTavern

1. Open SillyTavern

2. Navigate to the lorebook/world info section

3. Import your downloaded `.json` file

4. Your lorebook is now ready to use!

## Common Use Cases

### Creating a Character Lorebook
Perfect for RPG characters, novel characters, or any fictional persona.

### Building World Lore
Great for fantasy worlds, sci-fi universes, or any creative setting.

### Organizing Campaign Notes
Ideal for D&D campaigns, story arcs, or ongoing narratives.

### Converting Existing Documents
Transform character sheets, wikis, or notes into structured lorebooks.

## Tips for Success

✅ **Start Small**: Begin with a few entries to test your setup
✅ **Review AI Output**: Always check what the AI generates
✅ **Use Good Keys**: Choose trigger words that appear naturally
✅ **Keep Entries Focused**: One concept per entry works best
✅ **Save Often**: Download your lorebook regularly

## Need Help?

### Troubleshooting Connection Issues

If the "Test Connection" button isn't working:

1. **Use the diagnostic tool**: Open `test-api-connection.html` in your browser
   - This provides detailed step-by-step diagnostics
   - Shows exactly where the connection is failing
   - Provides specific troubleshooting advice

2. **Check your setup**:
   - Are you accessing via `http://localhost:8080` (not `file://`)?
   - Is your API server running (for local APIs)?
   - Is your API URL correct (check for typos)?
   - Is your API key valid?

3. **Common solutions**:
   - Restart your web server
   - Check firewall settings
   - Enable CORS on your API server (for local APIs)
   - Verify your internet connection (for cloud APIs)

### Additional Resources

- Check the main [README.md](README.md) for detailed documentation
- See [EXAMPLES.md](EXAMPLES.md) for specific examples
- Issues? Check the troubleshooting section in the README

## Privacy Note

🔒 All processing happens in your browser
🔒 Your API keys are stored locally only
🔒 No data is sent to third parties
🔒 Source text only goes to your configured API

---

**You're ready to create amazing lorebooks! 🎉**
