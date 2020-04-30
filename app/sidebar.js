var divSidebar = document.getElementById('sidebar');
var sidebarStr = '';
var sidebarSize = 24;
var langCurr;
var sidebar;
var list;

Sidebar.prototype.init = async function(newList) {
    list = newList;
    divSidebar.addEventListener('scroll', sidebar.check_sidebar);
}

function Sidebar() {}

Sidebar.prototype.check_sidebar = function(event) {
    if((divSidebar.scrollHeight - divSidebar.scrollTop) < divSidebar.clientHeight + 1) {
        sidebarSize += 16;
        divSidebar.scrollTo(0, divSidebar.scrollTop);
        sidebar.update_sidebar();
    }

}

Sidebar.prototype.update_sidebar = function(lang) {
    console.log("update sidebar...");
    if(lang != null) langCurr = lang;
    sidebarStr = '';

    var temp;
    for(var i = 0; i < sidebarSize; i++) {
        if(i < list[langCurr].length){
            temp = list[langCurr][i];
            sidebarStr += `
                <p class="sidebar-item" onclick="on_sidebar(${i})"> 
                    ${temp.word}
                </p>
            `;
        }    
    }

    divSidebar.innerHTML = sidebarStr;
}

sidebar = new Sidebar();
exports.sidebar = sidebar;
