var todo = document.querySelector('#todo input'),
    table = document.createElement('table'),
    thead = table.createTHead(),
    thRow = thead.insertRow(-1),
    tbody = table.createTBody(),
    view = document.querySelector('#view');

function getInput(type, name) {
    var el = document.createElement('input');

    el.type = type;
    el.name = name;

    return el;
}
function getElement(tagName, value) {
    var el = document.createElement(tagName);

    el.innerHTML = value;

    return el;

}
thRow.appendChild(document.createElement('th')).appendChild(getInput('checkbox', ''));
thRow.appendChild(document.createElement('th'));
thRow.appendChild(document.createElement('th')).appendChild(getElement('button', 'X'));

if (!tbody.length) {
    table.style.display = 'none';
}

if (!view.querySelector('table')) {
    view.appendChild(table);
}

todo.addEventListener('keydown', function (event) {
    if (event.keyCode == 13 && event.target.value) {
        console.log(table);
        var row = tbody.insertRow(-1);

        row.appendChild(getElement('td', '')).appendChild(getInput('checkbox', ''));
        row.appendChild(getElement('td', event.target.value));
        row.appendChild(getElement('td', 'X'));

        if (tbody.childNodes.length % 2) {
            row.className = 'even';
        }

        table.style.display = tbody.childNodes.length ? 'block' : 'none';

        event.target.value = "";
    }
});