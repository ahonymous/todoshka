var table = document.createElement('table'),
    tHead = table.createTHead(),
    thRow = tHead.insertRow(-1),
    tBody = table.createTBody(),
    tFooter = table.createTFoot(),
    tfRow = tFooter.insertRow(-1),
    countTodo = getElement('td', 'counts: '),
    countChecked = getElement('td', 'checked: '),
    view = document.querySelector('#view'),
    todoInput = getInput('text', 'todoshka'),
    allRemove = getElement('th', ' X ', 'delete'),
    checker = 0,
    apikey = 'testApiKey',
    response;

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
        rowChecker = getInput('checkbox', '');

    if (todoshka.id > 0) {
        row.id = todoshka.id;
    }
    row.draggable = true;
    row.addEventListener('dragstart', function (e) {
        row.classList.add('drag');
        dragEl = row;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', row.innerHTML);
    });

    row.addEventListener('dragenter', function (e) {
        row.classList.add('over');
        e.preventDefault();
    });

    row.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    row.addEventListener('dragleave', function () {
        row.classList.remove('over');
    });

    row.addEventListener('drop', function (e) {
        if (dragEl != row) {
            dragEl.innerHTML = row.innerHTML;
            row.innerHTML = e.dataTransfer.getData('text/html');
            dragEl.querySelector('input[type=checkbox]').addEventListener('click', rowCheckerListener);
            row.querySelector('input[type=checkbox]').addEventListener('click', rowCheckerListener);
            dragEl.querySelector('span').addEventListener('click', editTodo);
            row.querySelector('span').addEventListener('click', editTodo);
            row.classList.remove('over');
        }

        return false;
    });

    row.addEventListener('dragend', function () {
        this.classList.remove('over');
        this.classList.remove('drag');
    });

    function rowCheckerListener(e) {
        thRow.querySelector('th > input[type="checkbox"]').checked = false;

        if (e.target.checked === true) {
            checker++;
            row.classList.add('done');
        }
        if (e.target.checked === false) {
            checker--;
            this.parentNode.parentNode.classList.remove('done');
        }

        if (checker > 0 && !allRemove.style.display) {
            allRemove.style.display = 'table-cell';
        }
        if (checker < 1 && allRemove.style.display) {
            allRemove.style.display = '';
        }

        countChecked.querySelector('span.check').innerText = tBody.querySelectorAll('input[type="checkbox"]:checked').length + '';
    }

    rowChecker.addEventListener('click', rowCheckerListener);
    if (todoshka.checked == 1) {
        rowChecker.click();
    }

    row.appendChild(getElement('td', '')).appendChild(rowChecker);
    row.appendChild(getElement('td', '<span>' + todoshka.value + '</span>'));

    row.querySelector('span').addEventListener('click', editTodo);

    countTodo.querySelector('span.count').innerHTML = tBody.childElementCount + '';
    todoshka.value = "";
}

function editTodo(e) {
    var target = e.target,
        oldest = target.innerHTML,
        editor = getInput('text', '', oldest),
        sender = getElement('button', 'OK'),
        canceler = getElement('button', 'Cancel');

    function endEdit(newTodo) {

        [].slice.call(target.childNodes, 0).forEach(function (val) {
            val.remove();
        });


        target.innerHTML = newTodo;
    }

    sender.addEventListener('click', function () {
        endEdit(editor.value);
    });

    canceler.addEventListener('click', function () {
        target.innerHTML = oldest;
    });

    editor.addEventListener('keydown', function (e) {
        if (e.keyCode == 13 && e.target.value) {
            endEdit(e.target.value);
        }

        if (e.keyCode == 27) {
            target.innerHTML = oldest;
        }
    });
    target.innerHTML = null;
    target.appendChild(editor);
    target.appendChild(sender);
    target.appendChild(canceler);
}

countTodo.appendChild(getElement('span', tBody.childElementCount + '', 'count'));
countChecked.appendChild(getElement('span', tBody.querySelectorAll('input[type="checkbox"]:checked').length + '', 'check'));

allRemove.addEventListener('click', function (e) {
    var thChecker = thRow.querySelector('th > input[type="checkbox"]');

    [].slice.call(tBody.querySelectorAll('input[type=checkbox]'), 0).filter(function (val) {
        return val.checked;
    }).forEach(function (val) {
        val.parentNode.parentNode.remove();
    });

    countTodo.querySelector('span.count').innerText = tBody.childElementCount + '';
    countChecked.querySelector('span.check').innerText = tBody.querySelectorAll('input[type="checkbox"]:checked').length + '';
    thChecker.checked = false;
    e.target.style.display = '';
});

thRow.appendChild(getElement('th')).appendChild(getInput('checkbox', '')).addEventListener('click', function (e) {
    allRemove.style.display = (e.target.checked && tBody.childElementCount > 0) ? 'table-cell' : '';
    if (!tBody.childElementCount) {
        e.target.checked = false;
        alert('Not entered todo\'s!!!');
    } else {
        [].slice.call(tBody.childNodes, 0).filter(function (val) {
            if (e.target.checked) {
                val.classList.add('done');
            } else {
                val.classList.remove('done');
            }
            val.querySelector('td > input[type="checkbox"]').checked = e.target.checked;
        });
    }

    countChecked.querySelector('span.check').innerText = tBody.querySelectorAll('input[type="checkbox"]:checked').length + '';
});

thRow.appendChild(getElement('th')).appendChild(todoInput);
thRow.lastElementChild.appendChild(getElement('button', 'ADD', null, 'todoshkaButton'));
thRow.appendChild(allRemove);

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

tfRow.appendChild(countChecked);
tfRow.appendChild(countTodo);

function getTodo() {
    var server = getXmlHttp();

    server.open('GET', document.URL + 'index.php/todos', true);
    server.setRequestHeader('apikey', apikey);
    server.onreadystatechange = function () {
        if (server.readyState == 4) {
            if (server.status == 200) {
                response = JSON.parse(server.responseText);

                if (response.length) {
                    response.forEach(function (val) {
                        newTodo(val);
                    });
                }
            }
        }
    };
    server.send();
}

function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

if (!view.querySelector('table')) {
    view.appendChild(table);
    getTodo();
}

NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this, callback);
};
