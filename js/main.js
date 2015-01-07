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

thRow.appendChild(getElement('th')).appendChild(getInput('checkbox', '')).addEventListener('click', function (e) {
    allRemove.style.display = (e.target.checked && tBody.childElementCount > 0) ? 'table-cell' : '';
    if (!tBody.childElementCount) {
        e.target.checked = false;
        alert('Not entered todo\'s!!!');
    }
});

thRow.appendChild(getElement('th')).appendChild(todoInput);
thRow.lastElementChild.appendChild(getElement('button', 'ADD'));
thRow.appendChild(allRemove);
allRemove.addEventListener('click', function (e) {
    var thChecker = thRow.querySelector('th > input[type="checkbox"]');

    if (thChecker.checked && tBody.childElementCount > 0) {
        tBody.querySelectorAll('tr').forEach(function (val) {
            val.remove();
        });
        countTodo.innerHTML = tBody.childElementCount;
    } else {
        [].slice.call(tBody.querySelectorAll('input[type=checkbox]'), 0).filter(function (val) {
            return val.checked;
        }).forEach(function (val) {
            val.parentNode.parentNode.remove();
        });
    }

    thChecker.checked = false;
    e.target.style.display = '';
});

tfRow.appendChild(getElement('td', 'Counts:'));
tfRow.appendChild(countTodo);

if (!view.querySelector('table')) {
    view.appendChild(table);
}

thRow.querySelector('#todoshka').addEventListener('keydown', function (event) {
    if (event.keyCode == 13 && event.target.value) {
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

        row.appendChild(getElement('td', event.target.value)).addEventListener('click', function (e) {
            var editor = getInput('text', '', e.target.innerHTML),
                sender = getElement('button', 'OK');

            if (e.target == this) {
                sender.addEventListener('click', function (e) {
                    console.log('unfocus');
                });
                e.target.innerHTML = null;
                e.target.appendChild(editor);
                e.target.appendChild(sender);
            }
        });

        rowRemove.addEventListener('click', function (event) {
            event.target.parentNode.remove();
            countTodo.innerHTML = tBody.childElementCount;
        });
        row.appendChild(rowRemove);

        countTodo.innerHTML = tBody.childElementCount;
        event.target.value = "";
    }
});

NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this, callback);
};
