var template = document.getElementById('result').innerHTML;
var translation;
var list;

Translation.prototype.init = async function(newList) {
    list = newList;
}

function Translation() {}

Translation.prototype.update_match = function(selection, langCurr, langTran) {
    console.log('update match...' + langTran);
    var wordSelection = selection.word;
    var wordResult = selection.lang[langTran];
    var wordDefinition = selection.defintion;
    var langDefinition = (langCurr == "English") ? "Definition of" : "Definicion de";
	
    console.log(wordSelection + " " + wordResult + " " + wordDefinition + " " + langDefinition);

    var rendered = Mustache.render(template, 
    {
		wordSelection: wordSelection, 
		wordResult: wordResult, 
		wordDefinition: wordDefinition, 
		langDefinition: langDefinition 
	});

    $('#completeResults').html(rendered);
}

Translation.prototype.update_autoComplete = function(langCurr, langTran) {
    var result = {};

    new autoComplete({
        data: { // Data src [Array, Function, Async] | (REQUIRED)
            src: async () => {
                document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");
                return list[langCurr];
            },
            key: ["word"],
            cache: false
        },
        sort: (a, b) => { // Sort rendered results ascendingly | (Optional)
            if (a.match < b.match) return -1;
            if (a.match > b.match) return 1;
            return 0;
        },
        placeHolder: "Search...", // Place Holder text                 | (Optional)
        selector: "#autoComplete", // Input field selector              | (Optional)
        threshold: 0, // Min. Chars length to start Engine | (Optional)
        debounce: 300,
        searchEngine: "strict", // Search Engine type/mode           | (Optional)
        resultsList: { // Rendered results list object      | (Optional)
            container: source => {
                resultsListID = "word_List";
                return resultsListID;
            },
            destination: document.querySelector("#autoCompleteResults"),
            position: "afterend"
        },
        resultItem: (data, source) => {
            return `${data.match}`;
        },
        highlight: true, // Highlight matching results      | (Optional)
        maxResults: 5, // Max. number of rendered results | (Optional)
        onSelection: feedback => { // Action script onSelection event | (Optional)
            const selection = feedback.selection.value.word;
            document.querySelector("#autoComplete").value = "";
            document.querySelector("#autoComplete").setAttribute("placeholder", selection);

            result = feedback.selection.value;
            translation.update_match(result, langCurr, langTran);
        }
    });
}

translation = new Translation();
exports.translation = translation;
