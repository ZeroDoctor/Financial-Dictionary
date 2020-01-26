var lang = "English";
var lang_tran = "Spanish";
var select = document.getElementById("translation");
var template = document.getElementById('result').innerHTML;

// for now
function update_lang() {
	if (select.selectedIndex == 1) {
		lang = "Spanish";
		lang_tran = "English";
	} else {
		lang = "English";
		lang_tran = "Spanish";
	}

	init_autoComplete();
}

function update_match(selection) {
	console.log(selection);
    var wordSelection = selection.word;
    var wordResult = selection.lang[lang_tran];
    var wordDefinition = selection.defintion;
	var langDefinition = (lang == "English") ? "Definition of" : "Definicion de";
	
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

function init_autoComplete() {
    new autoComplete({
        data: { // Data src [Array, Function, Async] | (REQUIRED)
            src: async () => {
                document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");
                const source = await fetch("assets/translation.json");
                const list = await source.json();
                return list[lang];
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

            update_lang();
            update_match(feedback.selection.value);
        }
    });
}



window.onload = function () {

    // we can make a file of different languages later
    var option = document.createElement('option');
    option.text = "English to Spanish";
    select.add(option, 0);

    var option = document.createElement('option');
    option.text = "Spanish to English";
	select.add(option, 1);
	
	document.getElementById("translation").addEventListener('change', update_lang);
	init_autoComplete();
}