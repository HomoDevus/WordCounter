async function sendRequest(text) {
     let response = await fetch("https://twinword-lemmatizer1.p.rapidapi.com/extract/?text=" + text, {
         "method": "GET",
         "headers": {
             "x-rapidapi-key": "ce775e33e9msh72d7238e084d379p1fd394jsnb2e799e5aac3",
             "x-rapidapi-host": "twinword-lemmatizer1.p.rapidapi.com"
         }
     })
    return await response.json();
}

// sendRequest('The frogs hopped from rock to rock.').then(response => {
//     console.log(response);
// })
//     .catch(err => {
//         console.error(err);
//     });

export default sendRequest()