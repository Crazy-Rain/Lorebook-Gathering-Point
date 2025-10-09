// Lorebook entries storage
let lorebookEntries = [];

// Show status message
function showStatus(message, type = 'info') {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;
    statusEl.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusEl.style.display = 'none';
    }, 5000);
}

// Show/hide loading indicator
function setLoading(isLoading) {
    const loadingEl = document.getElementById('loading');
    loadingEl.style.display = isLoading ? 'block' : 'none';
}

// Test API connection
async function testConnection() {
    const apiUrl = document.getElementById('apiUrl').value.trim();
    const apiKey = document.getElementById('apiKey').value.trim();
    const modelName = document.getElementById('modelName').value.trim();

    if (!apiUrl || !apiKey) {
        showStatus('Please enter both API URL and API Key', 'error');
        return;
    }

    setLoading(true);
    console.log('Testing connection to:', apiUrl);

    try {
        // First, try a simple GET request to /models endpoint to check basic connectivity
        console.log('Step 1: Testing basic connectivity with /models endpoint...');
        let modelsResponse;
        try {
            modelsResponse = await fetch(`${apiUrl}/models`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            console.log('Models endpoint response status:', modelsResponse.status);
        } catch (modelsError) {
            console.log('Models endpoint failed:', modelsError);
            // Models endpoint failed, but let's continue to chat/completions as some endpoints don't support /models
        }

        // If models endpoint worked, great! If not, continue with chat/completions test
        console.log('Step 2: Testing chat completions endpoint...');
        
        // Use a minimal request that should work with most OpenAI-compatible endpoints
        const testModel = modelName || 'gpt-3.5-turbo'; // Fallback model if none specified
        const response = await fetch(`${apiUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: testModel,
                messages: [
                    { role: 'user', content: 'test' }
                ],
                max_tokens: 5
            })
        });

        console.log('Chat completions response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMsg = errorData.error?.message || response.statusText;
            
            // Provide specific guidance based on error type
            if (response.status === 401 || response.status === 403) {
                throw new Error(`Authentication failed (${response.status}): ${errorMsg}\n\nPlease check:\n• Your API key is correct\n• The API key has the necessary permissions`);
            } else if (response.status === 404) {
                throw new Error(`Endpoint not found (404): ${errorMsg}\n\nPlease check:\n• API URL is correct (should end with /v1 for most providers)\n• The server supports OpenAI-compatible API`);
            } else if (response.status === 400) {
                throw new Error(`Bad request (400): ${errorMsg}\n\nThis might indicate:\n• Invalid model name\n• Unsupported request format\n\nNote: The connection to the server is working! Try adjusting the model name or check server logs.`);
            } else {
                throw new Error(`API Error: ${response.status} - ${errorMsg}`);
            }
        }

        const data = await response.json();
        console.log('Connection test successful!', data);
        
        // Show success with helpful info
        let successMessage = '✅ API connection successful! ';
        if (modelsResponse && modelsResponse.ok) {
            successMessage += 'Both /models and /chat/completions endpoints are working.';
        } else {
            successMessage += '/chat/completions endpoint is working.';
        }
        showStatus(successMessage, 'success');
    } catch (error) {
        // Better error handling for network errors
        let errorMessage = error.message;
        
        // Check if this is a network/CORS error
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error('Network or CORS error detected:', error);
            
            // Try to provide more specific guidance based on the URL
            const isHttps = apiUrl.toLowerCase().startsWith('https://');
            const isLocalhost = apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1');
            
            errorMessage = 'Connection Error: Unable to reach the API endpoint.\n\n';
            
            if (isHttps && !isLocalhost) {
                // HTTPS endpoint (like a proxy)
                errorMessage += 'For HTTPS endpoints (like proxies):\n' +
                              '• Browser or browser extension (ad blocker) may be blocking the request\n' +
                              '  → Try disabling ad blockers/privacy extensions temporarily\n' +
                              '  → Check browser console (F12) for specific error details\n' +
                              '• CORS may not be configured on the proxy server\n' +
                              '  → Some proxies require specific CORS configuration\n' +
                              '• Server may be temporarily unavailable\n' +
                              '  → Verify the URL is correct and the service is online\n\n' +
                              'If this works in SillyTavern but not here:\n' +
                              '• SillyTavern may have a proxy/backend that handles CORS\n' +
                              '• Check that you\'re accessing this tool via http:// (not file://)\n' +
                              '• Try accessing the API URL directly in your browser to verify it responds\n' +
                              '• Some proxy services may require additional headers or authentication\n\n' +
                              '💡 Tip: Press F12 to open browser console and look for detailed error messages';
            } else if (isLocalhost) {
                // Local API
                errorMessage += 'For local APIs:\n' +
                              '• CORS must be enabled on your local API server\n' +
                              '  → Configure CORS headers on your API server\n' +
                              '  → Add this origin to allowed origins: ' + window.location.origin + '\n' +
                              '• Server may not be running\n' +
                              '  → Verify your API server is started and accessible\n' +
                              '• Wrong port or URL\n' +
                              '  → Check that the port number is correct\n\n' +
                              'Important: You must access this tool via http://localhost (not file://)\n' +
                              'Current access method: ' + window.location.protocol + '//' + window.location.host;
            } else {
                // Other cases
                errorMessage += 'This could be due to:\n' +
                              '• CORS not configured on the server\n' +
                              '  → If running locally, access via http://localhost, not file://\n' +
                              '  → Configure CORS headers on your API server\n' +
                              '• Server not running or not accessible\n' +
                              '• Firewall or browser blocking the connection\n' +
                              '• Wrong API URL (check for typos)\n\n' +
                              'If this works in SillyTavern:\n' +
                              '• Make sure you\'re accessing this tool via http:// (not file://)\n' +
                              '• Check your API server CORS settings allow this origin\n' +
                              '• Try disabling browser extensions temporarily';
            }
        }
        
        showStatus(`❌ Connection failed: ${errorMessage}`, 'error');
        console.error('Connection test error:', error);
    } finally {
        setLoading(false);
    }
}

// Fetch available models from API
async function fetchAvailableModels() {
    const apiUrl = document.getElementById('apiUrl').value.trim();
    const apiKey = document.getElementById('apiKey').value.trim();

    if (!apiUrl || !apiKey) {
        showStatus('Please enter both API URL and API Key first', 'error');
        return;
    }

    setLoading(true);
    const refreshBtn = document.getElementById('refreshModelsBtn');
    if (refreshBtn) {
        refreshBtn.disabled = true;
    }

    try {
        const response = await fetch(`${apiUrl}/models`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch models: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        // Extract model IDs from response
        let models = [];
        if (data.data && Array.isArray(data.data)) {
            models = data.data.map(model => model.id || model.name || model).filter(m => m);
        } else if (Array.isArray(data)) {
            models = data.map(model => model.id || model.name || model).filter(m => m);
        }

        if (models.length === 0) {
            showStatus('⚠️ No models found. You can still enter a model name manually.', 'info');
            return;
        }

        // Save models to localStorage
        localStorage.setItem('availableModels', JSON.stringify(models));
        
        // Update the datalist
        updateModelDatalist(models);
        
        showStatus(`✅ Found ${models.length} available model(s)`, 'success');
    } catch (error) {
        // Better error handling for network errors
        let errorMessage = error.message;
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            errorMessage = 'NetworkError: Unable to fetch models. This endpoint may not support the /models API. You can still enter a model name manually.';
        }
        showStatus(`⚠️ ${errorMessage}`, 'info');
        console.error('Model fetch error:', error);
        
        // Try to load cached models from localStorage
        const cachedModels = localStorage.getItem('availableModels');
        if (cachedModels) {
            try {
                const models = JSON.parse(cachedModels);
                updateModelDatalist(models);
                showStatus('⚠️ Could not fetch models, using cached list. You can still enter a model name manually.', 'info');
            } catch (e) {
                console.error('Error parsing cached models:', e);
            }
        }
    } finally {
        setLoading(false);
        if (refreshBtn) {
            refreshBtn.disabled = false;
        }
    }
}

// Update the model datalist with available models
function updateModelDatalist(models) {
    let datalist = document.getElementById('modelList');
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = 'modelList';
        document.body.appendChild(datalist);
        document.getElementById('modelName').setAttribute('list', 'modelList');
    }
    
    datalist.innerHTML = models.map(model => `<option value="${escapeHtml(model)}">`).join('');
}

// Generate lorebook entries using AI
async function generateEntries() {
    const apiUrl = document.getElementById('apiUrl').value.trim();
    const apiKey = document.getElementById('apiKey').value.trim();
    const modelName = document.getElementById('modelName').value.trim();
    const sourceText = document.getElementById('sourceText').value.trim();
    const processingPrompt = document.getElementById('processingPrompt').value.trim();

    if (!apiUrl || !apiKey) {
        showStatus('Please configure API settings first', 'error');
        return;
    }

    if (!sourceText) {
        showStatus('Please enter source text to process', 'error');
        return;
    }

    setLoading(true);

    try {
        const fullPrompt = processingPrompt ? `${processingPrompt}\n\n${sourceText}` : sourceText;
        
        const response = await fetch(`${apiUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelName,
                messages: [
                    { 
                        role: 'system', 
                        content: 'You are an expert at extracting and organizing information into structured lorebook entries. You process all content without censorship or filtering to maintain accuracy. Always respond with valid JSON.'
                    },
                    { role: 'user', content: fullPrompt }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // Try to extract JSON from the response
        let entries;
        try {
            // Try direct parsing first
            entries = JSON.parse(content);
        } catch (e) {
            // Try to extract JSON from markdown code blocks or text
            const jsonMatch = content.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/) || 
                            content.match(/(\[[\s\S]*\])/);
            if (jsonMatch) {
                entries = JSON.parse(jsonMatch[1]);
            } else {
                throw new Error('Could not parse JSON from API response. Please check the processing instructions or try again.');
            }
        }

        if (!Array.isArray(entries)) {
            throw new Error('API response is not an array of entries');
        }

        // Add entries to the lorebook
        let addedCount = 0;
        entries.forEach(entry => {
            if (entry.keys && entry.content) {
                const keys = Array.isArray(entry.keys) ? entry.keys : [entry.keys];
                addEntry(keys, entry.content);
                addedCount++;
            }
        });

        showStatus(`✅ Successfully generated and added ${addedCount} lorebook entries!`, 'success');
        
        // Clear source text after successful generation
        document.getElementById('sourceText').value = '';
        
    } catch (error) {
        // Better error handling for network and API errors
        let errorMessage = error.message;
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            const apiUrl = document.getElementById('apiUrl').value.trim();
            const isHttps = apiUrl.toLowerCase().startsWith('https://');
            const isLocalhost = apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1');
            
            errorMessage = 'Connection Error: Unable to reach the API endpoint.\n\n';
            
            if (isHttps && !isLocalhost) {
                errorMessage += 'For HTTPS endpoints:\n' +
                              '• Browser extensions (ad blockers) may be blocking requests\n' +
                              '• If the connection test worked, the model might be overloaded\n' +
                              '• Try a smaller source text or check server logs\n\n';
            } else {
                errorMessage += 'If the connection test worked but generation fails:\n' +
                              '• The model might be overloaded or timing out\n' +
                              '• Try a smaller source text\n' +
                              '• Check server logs for errors\n\n';
            }
            
            errorMessage += 'If you\'re seeing CORS errors:\n' +
                          '• Access this tool via http:// not file://\n' +
                          '• Check CORS settings on your API server';
        }
        showStatus(`❌ Failed to generate entries: ${errorMessage}`, 'error');
        console.error('Generation error:', error);
    } finally {
        setLoading(false);
    }
}

// Add manual entry
function addManualEntry() {
    const keysInput = document.getElementById('manualKeys').value.trim();
    const content = document.getElementById('manualContent').value.trim();

    if (!keysInput || !content) {
        showStatus('Please enter both keys and content for the entry', 'error');
        return;
    }

    const keys = keysInput.split(',').map(k => k.trim()).filter(k => k);
    
    if (keys.length === 0) {
        showStatus('Please enter at least one valid key', 'error');
        return;
    }

    addEntry(keys, content);
    
    // Clear input fields
    document.getElementById('manualKeys').value = '';
    document.getElementById('manualContent').value = '';
    
    showStatus('✅ Entry added successfully!', 'success');
}

// Add entry to lorebook
function addEntry(keys, content, uid = null) {
    const entry = {
        uid: uid || Date.now() + Math.random(),
        keys: keys,
        content: content,
        enabled: true,
        case_sensitive: false,
        name: keys[0] || 'Unnamed Entry',
        priority: 10,
        insertion_order: 100,
        comment: '',
        selective: false,
        constant: false,
        position: 'before_char'
    };

    lorebookEntries.push(entry);
    renderEntries();
}

// Render all entries
function renderEntries() {
    const container = document.getElementById('entriesContainer');
    const countEl = document.getElementById('entryCount');
    
    countEl.textContent = lorebookEntries.length;

    if (lorebookEntries.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No entries yet. Generate entries with AI or add them manually.</p>';
        return;
    }

    container.innerHTML = lorebookEntries.map((entry, index) => `
        <div class="entry-card">
            <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
            <h3>${escapeHtml(entry.name)}</h3>
            <div class="keys">
                <strong>Keys:</strong> ${entry.keys.map(k => escapeHtml(k)).join(', ')}
            </div>
            <div class="content">
                <strong>Content:</strong><br>
                ${escapeHtml(entry.content)}
            </div>
        </div>
    `).join('');
}

// Delete entry
function deleteEntry(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        lorebookEntries.splice(index, 1);
        renderEntries();
        showStatus('Entry deleted', 'info');
    }
}

// Clear all entries
function clearAllEntries() {
    if (lorebookEntries.length === 0) {
        showStatus('No entries to clear', 'info');
        return;
    }

    if (confirm('Are you sure you want to delete all entries? This cannot be undone.')) {
        lorebookEntries = [];
        renderEntries();
        showStatus('All entries cleared', 'info');
    }
}

// Download lorebook as JSON file
function downloadLorebook() {
    if (lorebookEntries.length === 0) {
        showStatus('No entries to download. Add some entries first.', 'error');
        return;
    }

    const lorebookName = document.getElementById('lorebookName').value.trim() || 'Untitled Lorebook';
    const lorebookDescription = document.getElementById('lorebookDescription').value.trim() || '';

    // Create SillyTavern-compatible lorebook structure
    const lorebook = {
        name: lorebookName,
        description: lorebookDescription,
        scan_depth: 100,
        token_budget: 2048,
        recursive_scanning: false,
        extensions: {},
        entries: lorebookEntries.reduce((acc, entry) => {
            acc[entry.uid] = {
                uid: entry.uid,
                key: entry.keys,
                keysecondary: [],
                comment: entry.comment,
                content: entry.content,
                constant: entry.constant,
                selective: entry.selective,
                selectiveLogic: 0,
                order: entry.insertion_order,
                position: entry.position,
                disable: !entry.enabled,
                addMemo: true,
                excludeRecursion: false,
                delayUntilRecursion: false,
                probability: 100,
                useProbability: false,
                depth: entry.priority,
                group: '',
                groupOverride: false,
                groupWeight: 100,
                scanDepth: null,
                caseSensitive: entry.case_sensitive,
                matchWholeWords: false,
                useGroupScoring: false,
                automationId: '',
                role: 0,
                vectorized: false,
                preventRecursion: false
            };
            return acc;
        }, {})
    };

    // Create and download the file
    const blob = new Blob([JSON.stringify(lorebook, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lorebookName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showStatus(`✅ Lorebook "${lorebookName}" downloaded successfully!`, 'success');
}

// Import lorebook
function importLorebook() {
    document.getElementById('importFile').click();
}

// Handle file import
function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const lorebook = JSON.parse(e.target.result);
            
            // Validate lorebook structure
            if (!lorebook.entries) {
                throw new Error('Invalid lorebook format: missing entries');
            }

            // Clear current entries
            lorebookEntries = [];

            // Import metadata
            if (lorebook.name) {
                document.getElementById('lorebookName').value = lorebook.name;
            }
            if (lorebook.description) {
                document.getElementById('lorebookDescription').value = lorebook.description;
            }

            // Import entries
            Object.values(lorebook.entries).forEach(entry => {
                const keys = Array.isArray(entry.key) ? entry.key : [entry.key];
                addEntry(
                    keys,
                    entry.content,
                    entry.uid
                );
            });

            showStatus(`✅ Successfully imported lorebook with ${lorebookEntries.length} entries!`, 'success');
            
            // Reset file input
            event.target.value = '';
            
        } catch (error) {
            showStatus(`❌ Failed to import lorebook: ${error.message}`, 'error');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load saved settings from localStorage
function loadSettings() {
    const savedApiUrl = localStorage.getItem('apiUrl');
    const savedApiKey = localStorage.getItem('apiKey');
    const savedModelName = localStorage.getItem('modelName');

    if (savedApiUrl) document.getElementById('apiUrl').value = savedApiUrl;
    if (savedApiKey) document.getElementById('apiKey').value = savedApiKey;
    if (savedModelName) document.getElementById('modelName').value = savedModelName;
    
    // Load cached models if available
    const cachedModels = localStorage.getItem('availableModels');
    if (cachedModels) {
        try {
            const models = JSON.parse(cachedModels);
            updateModelDatalist(models);
        } catch (e) {
            console.error('Error loading cached models:', e);
        }
    }
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('apiUrl', document.getElementById('apiUrl').value);
    localStorage.setItem('apiKey', document.getElementById('apiKey').value);
    localStorage.setItem('modelName', document.getElementById('modelName').value);
}

// Auto-save settings when they change
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    
    ['apiUrl', 'apiKey', 'modelName'].forEach(id => {
        document.getElementById(id).addEventListener('change', saveSettings);
    });
});

// Browse for source file
function browseSourceFile() {
    document.getElementById('sourceFileInput').click();
}

// Handle source file upload
async function handleSourceFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = `Loading: ${file.name}...`;
    
    setLoading(true);

    try {
        let text = '';
        const fileName = file.name.toLowerCase();

        if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
            // Handle plain text and markdown files
            text = await readTextFile(file);
        } else if (fileName.endsWith('.pdf')) {
            // Handle PDF files
            text = await readPdfFile(file);
        } else if (fileName.endsWith('.json')) {
            // Handle JSON files
            const jsonText = await readTextFile(file);
            try {
                const jsonData = JSON.parse(jsonText);
                // Check if it's a SillyTavern lorebook
                if (jsonData.entries) {
                    // This is a lorebook file, offer to import it instead
                    if (confirm('This appears to be a SillyTavern lorebook file. Would you like to import it as a lorebook instead?')) {
                        // Create a new File object and trigger import
                        const blob = new Blob([jsonText], { type: 'application/json' });
                        const newFile = new File([blob], file.name, { type: 'application/json' });
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(newFile);
                        document.getElementById('importFile').files = dataTransfer.files;
                        handleImport({ target: document.getElementById('importFile') });
                        fileNameDisplay.textContent = '';
                        event.target.value = '';
                        return;
                    }
                }
                // Otherwise, use as pretty-printed JSON text
                text = JSON.stringify(jsonData, null, 2);
            } catch (e) {
                // If not valid JSON, use raw text
                text = jsonText;
            }
        } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
            // For Word documents, we'll extract what we can
            showStatus('⚠️ Word document support is limited. For best results, please save as TXT or PDF first.', 'info');
            text = await readTextFile(file);
        } else {
            throw new Error('Unsupported file format. Please use TXT, PDF, JSON, MD, or Word files.');
        }

        if (text.trim()) {
            document.getElementById('sourceText').value = text;
            fileNameDisplay.textContent = `✓ Loaded: ${file.name}`;
            showStatus(`✅ Successfully loaded content from ${file.name}`, 'success');
        } else {
            throw new Error('No text content could be extracted from the file.');
        }
    } catch (error) {
        fileNameDisplay.textContent = `✗ Failed to load: ${file.name}`;
        showStatus(`❌ Error loading file: ${error.message}`, 'error');
        console.error('File upload error:', error);
    } finally {
        setLoading(false);
        // Reset file input
        event.target.value = '';
    }
}

// Read text file
function readTextFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

// Read PDF file using PDF.js
async function readPdfFile(file) {
    if (typeof pdfjsLib === 'undefined') {
        throw new Error('PDF library not loaded. Please refresh the page and try again.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n\n';
    }
    
    return fullText.trim();
}

