import * as fs from 'fs';
import * as path from 'path';

const docsPath = path.join(__dirname, 'public', 'docs');
const jsonPath = path.join(__dirname, 'src', 'json', 'docs.json');

const updateDocsJson = () => {
    const docsData = generateDocsData(docsPath);

    const jsonData = JSON.stringify(docsData, null, 2);

    fs.writeFileSync(jsonPath, jsonData);
};

const generateDocsData = (basePath) => {
    const docs = fs.readdirSync(basePath);

    const docsData = docs.map((doc) => {
        const filePath = path.join(basePath, doc);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            return {
                file: doc,
                type: 'FOLDER',
                children: generateDocsData(filePath),
            };
        } else {
            return {
                file: doc,
                type: 'FILE',
            };
        }
    });

    return docsData;
};

updateDocsJson();
