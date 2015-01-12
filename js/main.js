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
    checker = 0,
    dragEl;

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

    row.appendChild(getElement('td', '<span>' + todoshka.value + '</span>'));
    row.querySelector('span').addEventListener('click', function (e) {
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

    function endEdit() {
        var newTodo = oldTodo.value;

        target.childNodes.forEach(function (val) {
            val.remove();
        });

        target.innerHTML = newTodo;
    }

    sender.addEventListener('click', function () {
        endEdit();
    });

    oldTodo.addEventListener('keydown', function (e) {
        if (e.keyCode == 13 && e.target.value) {
            endEdit();
        }
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
