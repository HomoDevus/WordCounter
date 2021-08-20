export default class Book {
    constructor(txt) {
        this.txt = txt;
        this.pos = 0;
        this.separatedTxt = [];
        this.separateBook();
    }

    async getLemmas() {
        let results = await this.groupRequests();
        results = this.connectObjects(results);
        return results;
    }

    // ========================= Разделение текста =========================

    // Разделяет книгу на части каждые 3800 символов так как API не принимает слишком большие запросы
    // Запускается при создании элемента класса
    separateBook() {
        if (this.pos + 5000 < this.txt.length) {
            let endPos = this.findSpace(this.pos + 5000);
            this.separatedTxt.push(this.txt.slice(this.pos, endPos));
            this.separatedTxt = this.separatedTxt.filter((stroke) => stroke !== '\n');
            this.pos = endPos;
            this.separateBook();
        } else {
            this.separatedTxt.push(this.txt.slice(this.pos, this.txt.length));
            this.pos = 0;
        }
    }

    // Находит пробел или перевод строки. Нужно для функции separateBook чтобы она не разделила текст на середине слова.
    findSpace(startPoint) {
        let letterPos = startPoint;
        while (true) {
            if (this.txt[letterPos] === ' ' || this.txt[letterPos] === '\n') return letterPos;
            letterPos++;
        }
    }

    /**
     * Groups requests into array and sending them to the API one after another.
     * Returns array of results with objects as API answer.
     * @returns {Promise<any[]>}
     */
    async groupRequests() {
        let requests = [];
        let result;
        for (let part of this.separatedTxt) {
            requests.push(this.sendRequest(part));
        }

        try {
            result = await Promise.all(requests)
        } catch (e) {
            console.error(e);
        }
        return result;
    }

    /**
     * Get's array of answers from different API request.
     * Function either add up to previous word keys or creates new word if it doesn't appeared.
     * @param answers array of API answers
     * @returns {*} object with all answers assigned
     */
    connectObjects(answers) {
        let connectedLemmas;
        for (let part of answers) {
            part = part.lemma;
            if (connectedLemmas == null) {
                connectedLemmas = part;
            } else {
                for (let [word, entry] of Object.entries(part)) {
                    if (word in connectedLemmas) {
                        connectedLemmas[word] += entry;

                    } else {
                        connectedLemmas[word] = entry;
                    }
                }
            }
        }
            return connectedLemmas;
    }

    // Function that sends API request
    async sendRequest(txt) {
        let request = await fetch("https://twinword-lemmatizer1.p.rapidapi.com/extract/?text=" + txt, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "ce775e33e9msh72d7238e084d379p1fd394jsnb2e799e5aac3",
                "x-rapidapi-host": "twinword-lemmatizer1.p.rapidapi.com"
            }
        })
        return request.json()
    }
}
