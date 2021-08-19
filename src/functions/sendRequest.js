class Book {
    constructor(txt) {
        this.txt = txt;
        this.pos = 0;
        this.separatedTxt = [];
        this.separateBook();
    }

    async getLemmas() {

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

    connectObjects(answers) {
        let connectedTxt;
        let prevAnswer;
        for (let part of answers) {
            if (prevAnswer == null) {
                prevAnswer = part;
            } else {
                // for (let [word, ent] of Object.entries()) {
                //     console.log(word, ent)
                // }
            }
        }
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

let testBook = new Book('“No. Drive to 11 Tomte Street.”\n' +
    'I was in a most violent frenzy, which rubbed off on the coachman too—he evidently believed it was a matter of life and death and drove off without further question. He lashed his horse on.\n' +
    '“What is the man’s name?” he asked, turning around on the cox.\n' +
    '“Kierulf, the wool trader, Kierulf.”\n' +
    'The coachman also seemed to think there was no mistaking that man. Didn’t he usually wear a light-colored coat?\n' +
    '“What’s that?” I cried. “A light coat? Are you crazy? Do you imagine I’m looking for a teacup?” This light coat was extremely unwelcome and spoiled the image of the man I had made for myself.\n' +
    '“What did you say his name was? Kierulf?”\n' +
    '“Certainly,” I answered. “Is there anything strange about that? What’s in a name anyway?”\n' +
    '“Doesn’t he have red hair?”\n' +
    'It might very well be that he had red hair, and now that the coachman mentioned it, I was instantly convinced he was right. I felt grateful to the poor driver and told him he had caught the spitting image of the man; what he had said was perfectly correct. It would be something quite exceptional, I said, to see such a man without red hair.\n' +
    '“It must be the same person I’ve driven a couple of times,” the coachman said. “He even had an ashplant.”\n' +
    'This made the man come vividly alive to me, and I said, “Ha-ha, to be sure, no one has ever yet seen that man without his ashplant in his hand. You may rest assured as far as that goes, quite assured.”\n' +
    'Yes, it was obviously the same man he had driven. He had recognized him. . . .\n' +
    'We tore along, making the horse’s shoes throw off sparks.\n' +
    'In the midst of this agitated state I hadn’t for a single moment lost my presence of mind. We pass a police officer, and I notice his number is 69. This figure hits me with a terrible accuracy, it sticks in my brain instantly, like a splinter. Sixty-nine, exactly 69, I would never forget it!\n' +
    'A prey to the wildest fancies, I leaned back in the carriage, curled up under the oilskin hood so that no one could see I was moving my lips, and took to chattering idiotically to myself. Madness rages through my brain and I let it rage, fully aware of being subject to influences I cannot control. I began to laugh, noiselessly and passionately, without a trace of a reason, still jolly and drunk from the couple of glasses of beer I had had. Gradually my agitation subsides, my calm returns more and more. Feeling a chill in my sore finger, I stuck it inside my neck band to warm it a bit. We arrived thus at Tomte Street. The coachman reins up.\n' +
    'I alight from the carriage without haste, absent-mindedly, limply, my head heavy. I walk in through the gate, come into a back yard, which I cross, run into a door which I open and pass through, and find myself in a hallway, a kind of anteroom with two windows. In one corner stand two trunks, one on top of the other, and against the long wall an old, unpainted sofa bed with a blanket on it. In the next room, to the right, I can hear voices and the squalling of babies and, above me, on the second floor, the sound of someone hammering on an iron slab. I notice all this as soon as I enter.\n' +
    'I walk quietly straight across the room, over to the opposite door, without hurrying, without any thought of flight, open it too and step out into Vognmand Street. I glance up at the house I have just walked through and read above the door: “Refreshments and Lodging for Travelers.”\n' +
    'It never enters my head to try and get away, giving the coachman waiting for me the slip. I walk sedately through Vognmand Street without fear and without being conscious of having done anything wrong. Kierulf, this trader in wool who had been haunting my brain for so long, this person who I thought existed and whom I perforce had to see, had vanished from my thoughts, erased together with other mad inventions that came and went by turns. I didn’t remember him anymore except as a vague feeling, a memory.\n' +
    'I sobered up more and more as I wandered on, feeling heavy and limp and dragging my feet. The snow was still falling in big, wet dollops. I got to the Grønland section at last, as far as the church, where I sat down on a bench to rest. All who walked past looked at me in great surprise. I became lost in thought.\n' +
    'Good God, what an awful state I was in! I was so thoroughly sick and tired of my whole wretched life that I didn’t find it worth my while to go on fighting in order to hang on to it. The hardships had got the better of me, they had been too gross; I was so strangely ruined, nothing but a shadow of what I once was. My shoulders had slumped completely to one side, and I had fallen into the habit of leaning over sharply when I walked, in order to spare my chest what little I could. I had examined my body a few days ago, at noon up in my room, and I had stood there and cried over it the whole time. I had been wearing the same shirt for weeks on end, it was stiff with old sweat and had gnawed my navel to bits. A little blood and water was oozing from the wound, though it didn’t hurt; but it was so sad to have this wound in the middle of one’s stomach. I had no remedy for it, and it refused to heal by itself; I washed it, wiped it carefully and put on the same old shirt again. There was nothing to be done about it. . . .\n' +
    'I sit there on the bench mulling over all this and feeling quite dismal. I am disgusted with myself, even my hands appear loathsome to me. That flabby, shameless expression on the backs of my hands pains me, makes me uneasy. I feel rudely affected by the sight of my bony fingers, and I hate my whole slack body and shudder at having to carry it, to feel it around me. God, if only it would end! I yearned to die.\n' +
    'Completely defeated, defiled, and degraded in my own estimation, I got mechanically to my feet and began to walk homeward. On my way I passed a gate where one could read the following: “Shrouds at Madam Andersen’s, main entrance to the right.” Old memories! I said, remembering my previous room at Hammersborg, the little rocking chair, the newspaper wall-covering down by the door, the ad from the Director of Lighthouses and the freshly baked bread of Fabian Olsen, the baker. Well, yes, I had been much better off then; one night I had written a story worth ten kroner, now I couldn’t write anything anymore—I was completely unable to, my head grew empty as soon as I tried. Yes, I wanted to end it all! I walked and walked.\n' +
    'As I got closer and closer to the grocery store, I had a semiconscious feeling that I was approaching a danger; but I stuck to my purpose: I was going to give myself up. I walked calmly up the steps. In the doorway I meet a little girl carrying a cup in her hand, and I let her pass and close the door. The clerk and I stand face to face for the second time.\n' +
    '“Why,” he says, “some awful weather we’re having.” What was the point of this detour? Why didn’t he just nab me at once? I became furious and said, “I haven’t come here to chat about the weather.”\n' +
    'My anger takes him aback, his little huckster’s brain breaks down; it had never even crossed his mind that I had cheated him out of five kroner.')

// testBook.extractLemmas().then((ans) => {console.log(ans)}).catch(e => console.error(e))
