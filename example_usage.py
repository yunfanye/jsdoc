#!/usr/bin/env python3
"""
Example usage of the JSDoc Parser package.

This script demonstrates all the supported JSDoc tags and features.
"""

from jsdoc_parser import parse
import json

def main():
    print("JSDoc Parser - Example Usage")
    print("=" * 40)
    
    # Example 1: Complete function with all supported tags
    example1 = '''/**
     * Processes user authentication with comprehensive error handling.
     * This function validates credentials, checks permissions, and logs activity.
     * 
     * @param {string} username - The user's login name
     * @param {string|number} password - The user's password (string or numeric PIN)
     * @param {boolean} [rememberMe=false] - Whether to persist the session
     * @param {Object} [options] - Additional authentication options
     * @returns {Promise<User>} A promise that resolves to authenticated user data
     * @throws {AuthenticationError} When credentials are invalid
     * @throws {PermissionError} When user lacks required permissions
     * @example
     * // Basic login
     * const user = await authenticate('john_doe', 'secret123');
     * 
     * @example
     * // Login with options
     * const user = await authenticate('jane', 12345, true, {
     *   timeout: 30000,
     *   mfa: true
     * });
     */
    async function authenticate(username, password, rememberMe = false, options = {}) {
        // Authentication logic here
        return { id: 1, username, authenticated: true };
    }'''
    
    result1 = parse(example1)
    print("Example 1 - Complete Function:")
    print(f"  Description: {result1.description.summary}")
    print(f"  Parameters: {len(result1.params)}")
    print(f"  Returns: {result1.returns[0].types if result1.returns else 'None'}")
    print(f"  Throws: {len(result1.throws)} exceptions")
    print(f"  Examples: {len(result1.examples)}")
    print(f"  Code extracted: {'Yes' if result1.code else 'No'}")
    print()
    
    # Example 2: TypeDef with properties
    example2 = '''/**
     * @typedef {Object} DatabaseConfig
     * @property {string} host - Database host address
     * @property {number} port - Database port number
     * @property {string} database - Database name
     * @property {string|null} username - Database username (null for no auth)
     * @property {string|null} password - Database password
     * @property {boolean} [ssl=true] - Whether to use SSL connection
     * @property {number} [timeout=5000] - Connection timeout in milliseconds
     */'''
    
    result2 = parse(example2, include_code=False)
    print("Example 2 - TypeDef with Properties:")
    print(f"  TypeDef: {result2.typedef.name if result2.typedef else 'None'}")
    print(f"  Properties: {len(result2.properties)}")
    for prop in result2.properties[:3]:  # Show first 3
        print(f"    - {prop.name}: {prop.types} {'(optional)' if prop.optional else ''}")
    print()
    
    # Example 3: Simple function with union types
    example3 = '''/**
     * Converts a value to string representation.
     * @param {string|number|boolean|null} value - Value to convert
     * @returns {string} String representation of the value
     */'''
    
    result3 = parse(example3, include_code=False)
    print("Example 3 - Union Types:")
    print(f"  Parameter types: {result3.params[0].types if result3.params else 'None'}")
    print(f"  Return type: {result3.returns[0].types if result3.returns else 'None'}")
    print()
    
    # Show complete structure as JSON
    print("Complete Structure for Example 1:")
    print("-" * 30)
    
    # Convert to dict for JSON serialization
    def model_to_dict(obj):
        if hasattr(obj, 'model_dump'):
            return obj.model_dump()
        return obj
    
    complete_structure = model_to_dict(result1)
    print(json.dumps(complete_structure, indent=2))

if __name__ == "__main__":
    main()