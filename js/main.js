function show() {
    var dropdownOptions = document.getElementById("m-comboboxValues");
    dropdownOptions.classList.toggle("show");
}


function selectAll(src) {
    var checkboxes = document.getElementsByClassName('m-sub-checkbox');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = src.checked;
    }
};



function collapse() {
    const sidebar = document.getElementById('m-sidebar');
    const content = document.getElementById('m-main-content');
    const btn = document.getElementById("m-back-btn-icon")
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('collapsed');

    if (sidebar.classList.contains('collapsed')) {
        btn.classList.remove('left');
        btn.classList.add('right');
    } else {
        btn.classList.remove('right');
        btn.classList.add('left');
    }
};