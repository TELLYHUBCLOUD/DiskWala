/**
 * TeraBox API v2 Encryption Utility
 * Compatible with the backend encryption implementation
 * Uses CryptoJS for AES-256-CBC encryption with PBKDF2 key derivation
 */

import CryptoJS from 'crypto-js';

class APIEncryption {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    /**
     * Encrypt data dictionary and return URL-encoded encrypted string
     * Format: "Salted__" + salt + encrypted_data (base64 encoded)
     */
    encryptData(data) {
        try {
            // Convert data to JSON string
            const jsonData = JSON.stringify(data);
            
            // Generate random salt (8 bytes)
            const salt = CryptoJS.lib.WordArray.random(8);
            
            // Derive key and IV using PBKDF2 (compatible with Python implementation)
            const keyIv = CryptoJS.PBKDF2(this.secretKey, salt, {
                keySize: 12, // 48 bytes = 32 bytes key + 16 bytes IV
                iterations: 1,
                hasher: CryptoJS.algo.SHA1
            });
            
            // Split into key (32 bytes) and IV (16 bytes)
            const key = CryptoJS.lib.WordArray.create(keyIv.words.slice(0, 8)); // 32 bytes
            const iv = CryptoJS.lib.WordArray.create(keyIv.words.slice(8, 12)); // 16 bytes
            
            // Encrypt using AES-256-CBC
            const encrypted = CryptoJS.AES.encrypt(jsonData, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            
            // Create the final format: "Salted__" + salt + encrypted_data
            const saltedPrefix = CryptoJS.enc.Utf8.parse("Salted__");
            const finalData = saltedPrefix.concat(salt).concat(encrypted.ciphertext);
            
            // Base64 encode and URL encode
            const base64Data = CryptoJS.enc.Base64.stringify(finalData);
            const urlEncoded = encodeURIComponent(base64Data);
            
            return urlEncoded;
        } catch (error) {
            throw new Error(`Encryption failed: ${error.message}`);
        }
    }

    /**
     * Decrypt URL-encoded encrypted string back to data dictionary
     */
    decryptData(encryptedData) {
        try {
            // URL decode and base64 decode
            const urlDecoded = decodeURIComponent(encryptedData);
            const decodedData = CryptoJS.enc.Base64.parse(urlDecoded);
            
            // Check for "Salted__" prefix
            const saltedPrefix = CryptoJS.enc.Utf8.parse("Salted__");
            if (decodedData.words.slice(0, 2).join(',') !== saltedPrefix.words.join(',')) {
                throw new Error("Invalid encrypted data format");
            }
            
            // Extract salt and encrypted data
            const salt = CryptoJS.lib.WordArray.create(decodedData.words.slice(2, 4)); // 8 bytes
            const encryptedContent = CryptoJS.lib.WordArray.create(decodedData.words.slice(4));
            
            // Derive key and IV
            const keyIv = CryptoJS.PBKDF2(this.secretKey, salt, {
                keySize: 12,
                iterations: 1,
                hasher: CryptoJS.algo.SHA1
            });
            
            const key = CryptoJS.lib.WordArray.create(keyIv.words.slice(0, 8));
            const iv = CryptoJS.lib.WordArray.create(keyIv.words.slice(8, 12));
            
            // Decrypt using AES-256-CBC
            const decrypted = CryptoJS.AES.decrypt(
                { ciphertext: encryptedContent },
                key,
                {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }
            );
            
            // Convert to string and parse JSON
            const jsonData = decrypted.toString(CryptoJS.enc.Utf8);
            return JSON.parse(jsonData);
        } catch (error) {
            throw new Error(`Decryption failed: ${error.message}`);
        }
    }
}

/**
 * Get current timestamp in seconds
 */
export function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
}

/**
 * Create encrypted payload for v2 API
 * @param {string} url - TeraBox URL
 * @param {string} apiKey - Client API key
 * @param {string} secretKey - Encryption secret key
 * @returns {string} Encrypted payload
 */
export function createEncryptedPayload(url, apiKey, secretKey) {
    const encryption = new APIEncryption(secretKey);
    const timestamp = getCurrentTimestamp();
    
    const payload = {
        url: url,
        api_id: apiKey,
        ts: timestamp
    };
    
    return encryption.encryptData(payload);
}

/**
 * Send encrypted request to v2 API
 * @param {string} apiUrl - Base API URL
 * @param {string} url - TeraBox URL
 * @param {string} apiKey - Client API key
 * @param {string} secretKey - Encryption secret key
 * @returns {Promise<Object>} API response
 */
export async function sendEncryptedRequest(apiUrl, url, apiKey, secretKey) {
    try {
        const encryptedData = createEncryptedPayload(url, apiKey, secretKey);
        
        const response = await fetch(`${apiUrl}/v2/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: encryptedData })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API request failed: ${response.status} ${response.statusText}${errorData.error ? ` - ${errorData.error}` : ''}`);
        }

        const data = await response.json();
        
        if (data.errno !== 0) {
            throw new Error(data.error || "Failed to fetch video data");
        }

        return data;
    } catch (error) {
        console.error("Encrypted API request failed:", error);
        throw error;
    }
}

export default APIEncryption;
