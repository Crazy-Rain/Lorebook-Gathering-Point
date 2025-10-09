/**
 * CORS Proxy Server for Lorebook Generator
 * 
 * This server acts as a proxy to bypass CORS restrictions when accessing
 * external APIs from the browser. It's particularly useful when:
 * - Your API provider doesn't have CORS configured
 * - Browser extensions are blocking requests
 * - Firewall or network restrictions prevent direct access
 * 
 * Usage:
 * 1. Install dependencies: npm install
 * 2. Start the server: npm start
 * 3. In the Lorebook Generator, use http://localhost:3000/proxy as the API Base URL
 * 4. Set your actual API URL in the "Proxy Target URL" field (or configure below)
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Serve static files (the actual web app)
app.use(express.static('.'));

// Proxy endpoint
app.all('/proxy/*', async (req, res) => {
    try {
        // Extract the target URL from the request path
        // URL format: /proxy/https://api.example.com/v1/chat/completions
        const targetPath = req.url.replace('/proxy/', '');
        
        // Allow target URL to be passed as a header as well
        const targetUrl = req.headers['x-target-url'] || targetPath;
        
        if (!targetUrl) {
            return res.status(400).json({
                error: {
                    message: 'No target URL specified. Use /proxy/<url> or set X-Target-URL header'
                }
            });
        }

        console.log(`[Proxy] ${req.method} ${targetUrl}`);

        // Forward the request to the target API
        const headers = {};
        
        // Copy relevant headers (exclude some that shouldn't be forwarded)
        const excludeHeaders = ['host', 'connection', 'x-target-url'];
        Object.keys(req.headers).forEach(key => {
            if (!excludeHeaders.includes(key.toLowerCase())) {
                headers[key] = req.headers[key];
            }
        });

        const options = {
            method: req.method,
            headers: headers
        };

        // Add body for POST/PUT/PATCH requests
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            options.body = JSON.stringify(req.body);
        }

        const response = await fetch(targetUrl, options);
        
        // Get response data
        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        // Forward the response
        res.status(response.status);
        
        // Copy response headers
        response.headers.forEach((value, key) => {
            res.set(key, value);
        });
        
        res.send(data);
        
        console.log(`[Proxy] Response: ${response.status} ${response.statusText}`);
    } catch (error) {
        console.error('[Proxy] Error:', error.message);
        res.status(500).json({
            error: {
                message: `Proxy error: ${error.message}`,
                type: 'proxy_error'
            }
        });
    }
});

// Simple health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Lorebook Generator CORS Proxy is running',
        port: PORT
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║  Lorebook Generator CORS Proxy Server                        ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log(`✓ Server running at: http://localhost:${PORT}`);
    console.log(`✓ Web interface:     http://localhost:${PORT}`);
    console.log(`✓ Proxy endpoint:    http://localhost:${PORT}/proxy/<target-url>`);
    console.log('');
    console.log('Usage:');
    console.log('1. Open http://localhost:' + PORT + ' in your browser');
    console.log('2. Use proxy URL format: http://localhost:' + PORT + '/proxy/https://api.openai.com/v1');
    console.log('3. Or configure your API normally - the server handles CORS automatically');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('');
});
