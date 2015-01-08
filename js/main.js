var table = document.createElement('table'),
    tHead = table.createTHead(),
    thRow = tHead.insertRow(-1),
    tBody = table.createTBody(),
    tFooter = table.createTFoot(),
    tfRow = tFooter.insertRow(-1),
    countTodo = getElement('td', tBody.childElementCount + '', 'count'),
    view = document.querySelector('#view'),
    todoInput = getInput('text', 'todoshka'),
    allRemove = getElement('th', ' X ', 'delete'),
    checker = 0;

function getInput(type, name, value) {
    var el = document.createElement('input');

    el.type = type ? type : 'text';

    if (name) {
        el.id = name;
    }

    if (value) {
        el.value = value;
    }

    return el;
}

function getElement(tagName, value, addCssClass, name) {
    var el = document.createElement(tagName);

    if (value) {
        el.innerHTML = value;
    }

    if (addCssClass) {
        el.className = addCssClass;
    }

    if (name) {
        el.id = name;
    }

    return el;
}

function newTodo(todoshka) {
    var row = tBody.insertRow(0),
        rowRemove = getElement('td', ' X ', 'delete'),
        rowChecker = getInput('checkbox', '');

    rowChecker.addEventListener('click', function (e) {
        thRow.querySelector('th > input[type="checkbox"]').checked = false;

        rowRemove.style.display = (e.target.checked && tBody.childElementCount > 0) ? 'table-cell' : '';

        if (e.target.checked === true) {
            checker++;
        }
        if (e.target.checked === false) {
            checker--;
        }

        if (checker > 1 && !allRemove.style.display) {
            allRemove.style.display = 'table-cell';
        }
        if (checker < 2 && allRemove.style.display) {
            allRemove.style.display = '';
        }

    });
    row.appendChild(getElement('td', '')).appendChild(rowChecker);

    row.appendChild(getElement('td', todoshka.value)).addEventListener('click', function (e) {
        if (e.target == this) {
            editTodo(e.target);
        }
    });

    rowRemove.addEventListener('click', function () {
        row.remove();
        countTodo.innerHTML = tBody.childElementCount;
        checker--;
        if (checker < 2) {
            allRemove.style.display = '';
        }
    });
    row.appendChild(rowRemove);

    countTodo.innerHTML = tBody.childElementCount;
    todoshka.value = "";
}

function editTodo(target) {
    var oldTodo = getInput('text', '', target.innerHTML),
        sender = getElement('button', 'OK');

    sender.addEventListener('click', function () {
        var newTodo = oldTodo.value;

        target.childNodes.forEach(function (val) {
            val.remove();
        });

        target.innerHTML = newTodo;
    });
    target.innerHTML = null;
    target.appendChild(oldTodo);
    target.appendChild(sender);
}

thRow.appendChild(getElement('th')).appendChild(getInput('checkbox', '')).addEventListener('click', function (e) {
    allRemove.style.display = (e.target.checked && tBody.childElementCount > 0) ? 'table-cell' : '';
    if (!tBody.childElementCount) {
        e.target.checked = false;
        alert('Not entered todo\'s!!!');
    }
});

thRow.appendChild(getElement('th')).appendChild(todoInput);
thRow.lastElementChild.appendChild(getElement('button', 'ADD', null, 'todoshkaButton'));
thRow.appendChild(allRemove);
allRemove.addEventListener('click', function (e) {
    var thChecker = thRow.querySelector('th > input[type="checkbox"]');

    if (thChecker.checked && tBody.childElementCount > 0) {
        tBody.querySelectorAll('tr').forEach(function (val) {
            val.remove();
        });
    } else {
        [].slice.call(tBody.querySelectorAll('input[type=checkbox]'), 0).filter(function (val) {
            return val.checked;
        }).forEach(function (val) {
            val.parentNode.parentNode.remove();
        });
    }

    countTodo.innerHTML = tBody.childElementCount;
    thChecker.checked = false;
    e.target.style.display = '';
});

tfRow.appendChild(getElement('td', 'Counts:'));
tfRow.appendChild(countTodo);

if (!view.querySelector('table')) {
    view.appendChild(table);
}

thRow.querySelector('#todoshka').addEventListener('keydown', function (e) {
    if (e.keyCode == 13 && e.target.value) {
        newTodo(e.target);
    }
});
thRow.querySelector('#todoshkaButton').addEventListener('click', function (e) {
    var todoshka = thRow.querySelector('#todoshka');
    if (e.target == thRow.querySelector('#todoshkaButton') && todoshka.value) {
        newTodo(todoshka);
    }
});

NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this, callback);
};
