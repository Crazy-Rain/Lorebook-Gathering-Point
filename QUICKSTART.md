# Quick Start Guide

Get started with the Lorebook Generator in 5 minutes!

## Step 1: Open the Interface

Simply open `index.html` in your web browser. No installation required!

**OR** host it on a web server:
```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve

# Using PHP
php -S localhost:8080
```

Then navigate to `http://localhost:8080` in your browser.

## Step 2: Configure Your API

1. Enter your API endpoint URL
   - **OpenAI**: `https://api.openai.com/v1`
   - **Local (LM Studio)**: `http://localhost:1234/v1`
   - **Text Generation WebUI**: `http://localhost:5000/v1`

2. Enter your API key
   - For OpenAI: Your actual API key (starts with `sk-`)
   - For local models: Can often be left empty or any placeholder

3. Enter your model name
   - **OpenAI**: `gpt-3.5-turbo` or `gpt-4`
   - **Local**: Your model name (e.g., `mistral-7b`, `llama-2-13b`)

4. Click **"Test Connection"** to verify everything works

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
