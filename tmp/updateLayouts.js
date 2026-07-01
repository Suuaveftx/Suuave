const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const artistFiles = walk('c:/Users/USER/OneDrive/Desktop/NewSuuaveFtx/Suuave/app/artist-page').filter(f => f.endsWith('layout.js'));

artistFiles.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes('<main className="font-proximanova">')) {
        fs.writeFileSync(f, content.replace('<main className="font-proximanova">', '<main className="font-proximanova max-w-[1400px] w-full mx-auto px-4 sm:px-16">'));
        console.log('Updated Artist Page Layout: ' + f);
    }
});

// Fashion designers layout
const fashionLayoutPath = 'c:/Users/USER/OneDrive/Desktop/NewSuuaveFtx/Suuave/app/fashion-designers/layout.js';
if (fs.existsSync(fashionLayoutPath)) {
    let fashionContent = fs.readFileSync(fashionLayoutPath, 'utf8');
    // Match `className={`font-satoshi ${!isPersonalDetails ? 'pt-[80px]' : ''}`}`
    const targetPattern = "className={`font-satoshi ${!isPersonalDetails ? 'pt-[80px]' : ''}`}";
    const replacePattern = "className={`font-satoshi w-full max-w-[1400px] mx-auto px-4 sm:px-16 ${!isPersonalDetails ? 'pt-[80px]' : ''}`}";

    if (fashionContent.includes(targetPattern)) {
        fs.writeFileSync(fashionLayoutPath, fashionContent.replace(targetPattern, replacePattern));
        console.log('Updated Fashion Designers Layout: ' + fashionLayoutPath);
    } else {
        console.log('Fashion Pattern not found or already applied.');
    }
}
