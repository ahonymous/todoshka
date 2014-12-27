var todo = document.querySelector('#todo input'),
    table = document.createElement('table'),
    tHead = table.createTHead(),
    thRow = tHead.insertRow(-1),
    tBody = table.createTBody(),
    view = document.querySelector('#view');

function getInput(type, name) {
    var el = document.createElement('input');

    el.type = type;
    el.name = name;

    return el;
}

function getElement(tagName, value, addCssClass) {
    var el = document.createElement(tagName);

    if (value) {
        el.innerHTML = value;
    }

    if (addCssClass) {
        el.className = addCssClass;
    }

    return el;
}

thRow.appendChild(getElement('th').appendChild(getInput('checkbox', '')));
thRow.appendChild(getElement('th'));
thRow.appendChild(getElement('th', ' X ', 'delete'));

thRow.querySelector('th.delete').addEventListener('click', function (event) {
    if (tBody.childElementCount > 0) {
        tBody.querySelectorAll('tr').forEach(function (val) {
            val.remove();
        });
    }

    table.style.display = 'none';
});

if (!tBody.childNodes.length) {
    table.style.display = 'none';
}

if (!view.querySelector('table')) {
    view.appendChild(table);
}

todo.addEventListener('keydown', function (event) {
    if (event.keyCode == 13 && event.target.value) {
        var row = tBody.insertRow(0);

        row.appendChild(getElement('td', '')).appendChild(getInput('checkbox', ''));
        row.appendChild(getElement('td', event.target.value));
        row.appendChild(getElement('td', ' X ', 'delete'));

        table.style.display = tBody.childNodes.length ? 'table' : 'none';

        event.target.value = "";
        row.querySelectorAll('td.delete').forEach(function (val) {
            val.addEventListener('click', function (event) {
                event.target.parentNode.remove();
                if (!tBody.childNodes.length) {
                    table.style.display = 'none';
                }
            });
        });

    }
});

NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this, callback);
};
