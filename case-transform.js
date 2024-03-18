function toKebabCase(str) {
    return str.replace(/[^\w\s]/gi, '') // Remove non-word characters
        .replace(/\s+/g, '-')      // Replace whitespace with dash
        .toLowerCase();            // Convert to lowercase
}