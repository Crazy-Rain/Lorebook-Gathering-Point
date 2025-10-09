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

    try {
        const response = await fetch(`${apiUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelName,
                messages: [
                    { role: 'user', content: 'Hello! Please respond with "Connection successful" if you receive this message.' }
                ],
                max_tokens: 50
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        showStatus('✅ API connection successful! Model is responding.', 'success');
    } catch (error) {
        showStatus(`❌ Connection failed: ${error.message}`, 'error');
        console.error('Connection test error:', error);
    } finally {
        setLoading(false);
    }
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
        showStatus(`❌ Failed to generate entries: ${error.message}`, 'error');
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
