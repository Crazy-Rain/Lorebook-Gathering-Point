# Lorebook Generator for SillyTavern

A web-based interface for creating SillyTavern-compatible lorebooks using AI assistance. This tool allows you to convert any text or information into structured lorebook entries with the help of OpenAI-compatible APIs.

## Features

- 🤖 **AI-Powered Generation**: Use any OpenAI-compatible API to automatically extract and structure lorebook entries from source text
- 📁 **File Import**: Upload TXT, PDF, JSON, Word (.doc/.docx), and Markdown (.md) files as source material
- 🔓 **Uncensored Processing**: No content filtering or restrictions - processes information as-is for maximum accuracy
- ✏️ **Manual Entry Creation**: Add and edit lorebook entries manually when needed
- 💾 **Import/Export**: Full support for SillyTavern lorebook JSON format
- 🔧 **Flexible API Support**: Works with OpenAI, LocalAI, Text Generation WebUI, Oobabooga, and other compatible endpoints
- 🎨 **User-Friendly Interface**: Clean, modern web interface with no installation required
- 💻 **Client-Side Processing**: All data processing happens in your browser - your API keys stay private

## Getting Started

⚠️ **IMPORTANT**: You must run this tool via a web server for API connections to work. See [SETUP.md](SETUP.md) for complete setup instructions.

📚 **Troubleshooting HTTPS Proxies?** See [TROUBLESHOOTING_HTTPS_PROXIES.md](TROUBLESHOOTING_HTTPS_PROXIES.md) for detailed guidance on connecting to proxy services like `https://anas-proxy.xyz/v1`.

🚀 **Having CORS/Firewall Issues?** Use the built-in proxy server! See [PROXY_SERVER.md](PROXY_SERVER.md) for details. Quick start: `npm install && npm start`

### Basic Usage

⚠️ **IMPORTANT**: You must run this tool via a web server for API connections to work.

1. **Open the Interface**
   - **Do NOT** simply open `index.html` in your browser (CORS will block API requests)
   - **DO** serve it via a web server:
   
   ```bash
   # Using Python (simple)
   python3 -m http.server 8080
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8080
   
   # Using Node.js with built-in CORS proxy (BEST for CORS issues!)
   npm install && npm start
   # Then access via http://localhost:3000
   ```
   
   - Then access via `http://localhost:8080` in your browser (or `http://localhost:3000` for proxy)
   - **⭐ Having CORS/Firewall issues?** Use the Node.js proxy option (see [SETUP.md](SETUP.md) Option E)
   - See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions

2. **Configure Your API**
   - Enter your OpenAI-compatible API endpoint URL
   - Provide your API key
   - Select the model you want to use (e.g., gpt-3.5-turbo, gpt-4, or local model)
   - Optional: Click "🔄 Refresh Models" to auto-detect available models from your API
   - Click "Test Connection" to verify settings

3. **Create Lorebook Entries**
   
   **Option A: Upload a File**
   - Click the "📁 Browse Files" button below the source text field
   - Select a file from your computer
   - Supported formats: TXT, PDF, JSON, Word (.doc/.docx), Markdown (.md)
   - The content will be automatically loaded into the source text field
   - Use the loaded content for AI generation or as reference
   
   **Option B: AI-Generated Entries**
   - Paste your source text (character descriptions, world lore, etc.)
   - Optionally customize the processing instructions
   - Click "Generate Entries with AI"
   - The AI will extract key information and create structured entries
   
   **Option C: Manual Entries**
   - Enter trigger keys (comma-separated)
   - Write the entry content
   - Click "Add Entry"

4. **Download Your Lorebook**
   - Review the generated entries
   - Set lorebook name and description
   - Click "Download Lorebook"
   - Import the JSON file into SillyTavern

### Supported API Endpoints

This tool works with any OpenAI-compatible API:

- **OpenAI**: `https://api.openai.com/v1`
- **Anthropic Claude (via proxy)**: `https://anas-proxy.xyz/v1` or other Claude-compatible proxies
- **LocalAI**: `http://localhost:8080/v1`
- **Text Generation WebUI**: `http://localhost:5000/v1`
- **Oobabooga**: `http://localhost:5000/v1`
- **LM Studio**: `http://localhost:1234/v1`
- **Any other OpenAI-compatible endpoint**

**Note**: For Claude models via proxy, use model names like `claude-sonnet-4-5-20250929` or `claude-3-opus-20240229`.

## Lorebook Format

The generated lorebooks are fully compatible with SillyTavern and include:

- **Trigger Keys**: Keywords that activate each entry
- **Content**: The information to inject into context
- **Metadata**: Priority, insertion order, and other settings
- **SillyTavern Extensions**: Full support for all ST lorebook features

### Example Entry Structure

```json
{
  "uid": 1234567890,
  "key": ["character name", "alias"],
  "content": "Detailed character information...",
  "enabled": true,
  "priority": 10,
  "position": "before_char"
}
```

## Tips for Best Results

1. **Clear Source Material**: Provide well-structured source text for better AI extraction
2. **Custom Instructions**: Modify the processing prompt to focus on specific types of information
3. **Review Entries**: Always review AI-generated entries before downloading
4. **Trigger Keys**: Choose keys that are unique and likely to appear in conversations
5. **Content Length**: Keep entries concise but informative for better context usage

## Privacy & Security

- All processing happens in your browser
- API keys are stored locally (localStorage) and never sent to third parties
- Source text is only sent to your configured API endpoint
- No data collection or tracking

## Troubleshooting

### Testing Your API Connection

**Having connection issues?** Use the dedicated test utility:

1. Make sure you're running the tool via a web server (see setup instructions above)
2. Open `test-api-connection.html` in your browser
3. Enter your API details and click "Run Connection Tests"
4. The utility will provide detailed diagnostics about what's working and what's not

This test utility helps you:
- Verify your API URL is correct
- Check if the server is reachable
- Distinguish between CORS issues, network errors, and API errors
- Test both /models and /chat/completions endpoints
- Get specific error messages with troubleshooting steps

**What to expect when testing:**

- ✅ **Valid API with correct key**: "API connection successful!" with response details
- ✅ **Valid API with invalid key**: "Server is reachable! Authentication failed" (401/403) - This is good! It means the connection is working.
- ⚠️ **Valid URL but unsupported endpoint**: 404 error with suggestions to check URL format
- ⚠️ **Invalid model name**: 400 error with note that connection is working
- ❌ **Network/CORS error**: Detailed error with suggestions about web server setup and CORS configuration
- ❌ **Invalid URL**: URL format validation error

**Example: Testing with a proxy service**
- URL: `https://anas-proxy.xyz/v1`
- Model: `claude-sonnet-4-5-20250929`
- Expected: Even without a valid API key, you should get a 401/403 response (not a connection error)
- If you get a connection error instead:
  - Check browser console (F12) for `ERR_BLOCKED_BY_CLIENT` (ad blocker interference)
  - Try disabling browser extensions temporarily
  - Verify you're running via a web server (not file://)

### API Connection Issues

**"Connection Error" or "NetworkError":**
- **Most Common Issue**: If opening `index.html` directly (file:// in browser), CORS will block API requests
  - **Solution**: Serve the tool via a web server:
    ```bash
    # Python
    python3 -m http.server 8080
    
    # Node.js
    npx serve
    
    # PHP
    php -S localhost:8080
    
    # Node.js with built-in CORS proxy (BEST for CORS issues!)
    npm install && npm start
    # Then access via http://localhost:3000
    ```
  - Then access via `http://localhost:8080` (or `http://localhost:3000` for proxy)

- **For Local APIs** (LM Studio, Oobabooga, Text Generation WebUI, etc.):
  - Enable CORS on your API server (see your server's documentation)
  - Verify the server is running and accessible
  - Check that the API URL ends with `/v1` (e.g., `http://localhost:5000/v1`)
  - **⭐ OR**: Use the built-in proxy server (`npm start`) to bypass CORS configuration entirely!

- **For HTTPS Proxy Services** (like `https://anas-proxy.xyz/v1`):
  - **Browser extensions** (ad blockers, privacy tools) may block requests
    - Try disabling extensions temporarily
    - Check browser console (F12) for `ERR_BLOCKED_BY_CLIENT`
  - Some proxies only support server-to-server requests, not browser-based access
  - If it works in SillyTavern but not here:
    - SillyTavern routes through its backend (avoids browser CORS restrictions)
    - Browser-based tools have stricter security constraints
  - **⭐ BEST SOLUTION**: Use the built-in proxy server (`npm install && npm start`) to bypass these issues!

- **Works in SillyTavern but not here?**
  - Check that you're accessing this tool via http:// not file://
  - Try disabling browser extensions (ad blockers, privacy tools)
  - Press F12 to check browser console for specific error messages
  - Verify CORS is configured to allow this origin on your API server
  - Some API servers allow specific origins - you may need to add localhost
  - **⭐ BEST SOLUTION**: Use the built-in proxy server to avoid all browser restrictions!

**Authentication Errors (401/403):**
- Verify your API key is correct and has proper permissions
- For local APIs, some don't require API keys - try any placeholder text

**404 Errors:**
- Check API URL is correct (should typically end with `/v1`)
- Verify the server supports OpenAI-compatible API format
- Try removing or adding `/v1` to your URL

**400 Bad Request:**
- Connection is working! The issue is likely:
  - Invalid or unsupported model name
  - Try clicking "Refresh Models" to see available models
  - Or manually enter your model name

### Generation Issues
- Make sure source text is provided
- Try simplifying the processing instructions
- Check API response format matches expected JSON structure
- Verify your API has sufficient context length for the request

### Import/Export Issues
- Ensure JSON file is valid SillyTavern lorebook format
- Check file permissions when downloading
- Try clearing browser cache if persistent issues occur

## Development

The project consists of two main files:

- `index.html`: User interface and styling
- `app.js`: Application logic and API integration

No build process or dependencies required - just open and use!

## Contributing

Contributions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Submit pull requests
- Share feedback on usability

## License

This project is open source and available for use in creating lorebooks for personal or commercial projects.

## Credits

Built for the SillyTavern community to make lorebook creation easier and more accessible.
