# LLMS.md - JSDoc Parser Library Guide

## Quick Start for LLMs

This Python library parses JavaScript documentation comments (JSDoc) into structured data objects.

### Installation & Import
```python
pip install jsdoc
from jsdoc import parse
```

### Core Function
```python
parse(jsdoc_string: str, include_code: bool = True) -> JSDocComment
```

### Basic Usage
```python
# Parse JSDoc comment with function code
jsdoc_string = '''/**
 * Adds two numbers together.
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} The sum of a and b
 * @example
 * add(1, 2); // returns 3
 */
function add(a, b) {
    return a + b;
}'''

result = parse(jsdoc_string)

# Access parsed data
result.description.summary     # "Adds two numbers together."
result.params[0].name         # "a"
result.params[0].types        # ["number"]
result.returns[0].types       # ["number"]
result.examples[0].code       # "add(1, 2); // returns 3"
result.function_name          # "add"
result.code                   # "function add(a, b) {\n    return a + b;\n}"
```

### Supported JSDoc Tags
- `@param {type} name - description` - Function parameters
- `@returns/@return {type} description` - Return values
- `@typedef {type} Name - description` - Custom type definitions
- `@property {type} name - description` - Object properties
- `@example code` - Usage examples
- `@throws {type} description` - Possible exceptions

### Key Features
1. **Multiple TypeDef Support**: Parse multiple `@typedef` blocks
2. **Union Types**: Handles `string|number|null` syntax
3. **Optional Parameters**: Supports `[param]` and `[param=default]`
4. **Function Name Extraction**: Auto-extracts function names from various JS patterns
5. **Type Safety**: Returns Pydantic BaseModel objects

### Output Structure
```python
JSDocComment {
    description: Description,
    params: List[Parameter],
    returns: List[ReturnValue], 
    examples: List[Example],
    throws: List[Throws],
    typedefs: List[TypeDef],
    properties: List[Property],
    code: str,
    function_name: str,
    raw_comment: str
}
```

### Common Patterns
```python
# Parse without code extraction
result = parse(jsdoc_string, include_code=False)

# Handle optional parameters
# @param {string} [name] - Optional parameter
result.params[0].optional  # True

# Handle union types  
# @param {string|number} value
result.params[0].types  # ["string", "number"]

# Access typedef properties
# @typedef {object} User
# @property {string} name
result.typedefs[0].properties[0].name  # "name"
```

This library is ideal for extracting structured documentation from JavaScript codebases or generating documentation from JSDoc comments.