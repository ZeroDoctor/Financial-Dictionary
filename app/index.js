const t = require('./translation.js').translation;
const s = require('./sidebar.js').sidebar;

var langCurr = "English";
var langTran = "Spanish";
var currentLang = false; // since there is only two
var list;

var btnEdit = document.getElementById('edit');
var btnSelect = document.getElementById('btnTranslation');

function on_sidebar(index) {
    t.update_match(list[langCurr][index], langCurr, langTran);
}

function on_translation() {
	currentLang = !currentLang;
	if (currentLang) {
		langCurr = "Spanish";
		langTran = "English";
	} else {
		langCurr = "English";
		langTran = "Spanish";
    }

	btnSelect.innerHTML = langCurr + " to " + langTran;
    t.update_autoComplete(langCurr, langTran);
    s.update_sidebar(langCurr);
}

window.onload = async function () {
    const source = await fetch("assets/translation.json");
    list = await source.json();

    t.init(list); s.init(list);

    t.update_autoComplete(langCurr, langTran);
    s.update_sidebar(langCurr);
}