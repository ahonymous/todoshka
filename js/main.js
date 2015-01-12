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
    //
    //row.draggable = true;
    //row.addEventListener('dragstart', function (e) {
    //    row.classList.add('drag');
    //
    //    dragEl = this;
    //
    //    e.dataTransfer.effectAllowed = 'move';
    //    e.dataTransfer.setData('text/html', this.innerHTML);
    //});
    //row.addEventListener('dragenter', function () {
    //    row.classList.add('over');
    //});
    //row.addEventListener('dragover', function (e) {
    //    if (e.preventDefault) {
    //        e.preventDefault(); // Necessary. Allows us to drop.
    //    }
    //
    //    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    //
    //    return false;
    //});
    //row.addEventListener('dragleave', function () {
    //    row.classList.remove('over');
    //});
    //row.addEventListener('drop', function (e) {
    //    if (e.stopPropagation) {
    //        e.stopPropagation(); // stops the browser from redirecting.
    //    }
    //
    //    // See the section on the DataTransfer object.
    //    if (dragEl != this) {
    //        // Set the source column's HTML to the HTML of the columnwe dropped on.
    //        dragEl.innerHTML = this.innerHTML;
    //        this.innerHTML = e.dataTransfer.getData('text/html');
    //    }
    //
    //    return false;
    //});
    //row.addEventListener('dragend', function () {
    //    this.classList.remove('over');
    //    this.classList.remove('drag');
    //});

    rowChecker.addEventListener('click', function (e) {
        thRow.querySelector('th > input[type="checkbox"]').checked = false;

        rowRemove.style.display = (e.target.checked && tBody.childElementCount > 0) ? 'table-cell' : '';

        if (e.target.checked === true) {
            checker++;
            row.classList.add('done');
        }
        if (e.target.checked === false) {
            checker--;
            row.classList.remove('done');
        }

        if (checker > 0 && !allRemove.style.display) {
            allRemove.style.display = 'table-cell';
        }
        if (checker < 1 && allRemove.style.display) {
            allRemove.style.display = '';
        }

        countChecked.querySelector('span.check').innerText = tBody.querySelectorAll('input[type="checkbox"]:checked').length + '';
    });

    row.appendChild(getElement('td', '')).appendChild(rowChecker);
    row.appendChild(getElement('td', '<span>' + todoshka.value + '</span>'));

    row.querySelector('span').addEventListener('click', function (e) {
        if (e.target == this) {
            editTodo(e.target);
        }
    });
    countTodo.querySelector('span.count').innerHTML = tBody.childElementCount + '';
    todoshka.value = "";
}

function editTodo(target) {
    var oldest = target.innerHTML,
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

if (!view.querySelector('table')) {
    view.appendChild(table);
}

NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this, callback);
};
