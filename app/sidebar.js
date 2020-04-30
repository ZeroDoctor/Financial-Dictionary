var divSidebar = document.getElementById('sidebar');
var sidebarStr = '';
var sidebarSize = 24;
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
        divSidebar.scrollTo(divSidebar.scrollTop);
        sidebar.update_sidebar();
    }

}

Sidebar.prototype.update_sidebar = function(langCurr) {
    console.log("update sidebar...");
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
