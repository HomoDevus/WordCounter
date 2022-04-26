let express = require('express');
let app = express();
let multer = require('multer')
let cors = require('cors');
let {parseEpub, parseHTML} = require('@gxl/epub-parser');
const path = require('path');

const PORT = process.env.PORT || 8080

app.use(cors())

const storage = multer.memoryStorage()
let upload = multer({ storage: storage }).single('file')

// Have Node serve the files for built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/epub',function(req, res) {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        epubToString(req.file.buffer)
            .then(stringRes => {
                return res.status(200).send(stringRes)
            })
    })
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`);
});

async function epubToString(buffer) {
    // Parse epub. Getting html in string type
    const epubObj = await parseEpub(buffer, {
        type: 'buffer',
    })

    let textStr = '';
    let htmlObjects = [];
    // Parse html string to object with html tags and innerHTML
    for (let section of epubObj.sections) {
        htmlObjects.push(parseHTML(section.htmlString))
    }

    // Take only innerHTML from html object. Getting pure string of text
    for (let part of htmlObjects) {
        for (let tag of part) {
            getTagText(tag);
        }
    }

    function getTagText(tagObj) {
        if (tagObj.children) {
            return tagObj.children.forEach(tag => getTagText(tag))
        } else if (tagObj.text) {
            textStr += tagObj.text[tagObj.text.length - 1] === ' ' ? tagObj.text: tagObj.text + ' '
        }
    }

    return textStr
}