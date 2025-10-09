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

### Basic Usage

1. **Open the Interface**
   - Simply open `index.html` in your web browser
   - Or host it on any web server for remote access

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
- **LocalAI**: `http://localhost:8080/v1`
- **Text Generation WebUI**: `http://localhost:5000/v1`
- **Oobabooga**: `http://localhost:5000/v1`
- **LM Studio**: `http://localhost:1234/v1`
- **Any other OpenAI-compatible endpoint**

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

### API Connection Issues
- Verify your API URL includes the `/v1` path
- Check that your API key is valid
- Ensure CORS is enabled on local API endpoints
- For network errors, the app will provide detailed troubleshooting steps
- If you see "NetworkError", verify your server is running and accessible
- For local APIs, you may need to configure CORS headers

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
