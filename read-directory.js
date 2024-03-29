async function processDirectory(directoryPath, process) {
    const fs = require('fs/promises');
    const path = require('path');

    const files = await fs.readdir(directoryPath);

    // Process each file in the directory
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        process(await fs.readFile(filePath, 'utf8'));
    }
}