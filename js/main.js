var todo = document.querySelector('#todo input'),
    table = document.createElement('table'),
    tHead = table.createTHead(),
    thRow = tHead.insertRow(-1),
    tBody = table.createTBody(),
    tFooter = table.createTFoot(),
    tfRow = tFooter.insertRow(-1),
    countTodo = getElement('td', tBody.childElementCount + '', 'count'),
    view = document.querySelector('#view'),
    todoChecked = [],
    removeList = function (list) {
        list.forEach(function (val) {
            val.remove();
        });
    };

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

thRow.appendChild(getElement('th')).appendChild(getInput('checkbox', ''));
thRow.appendChild(getElement('th', 'TODO'));
thRow.appendChild(getElement('th', ' X ', 'delete'));

thRow.querySelector('th.delete').addEventListener('click', function () {
    //if (thRow.querySelector('th > input[type="checkbox"]').checked) {
    //    tBody.querySelectorAll('td > input[type="checkbox"]').filter(function (val) {
    //        return val.checked;
    //    }).forEach(removeList);
    //}
    if (tBody.childElementCount > 0) {
        tBody.querySelectorAll('tr').forEach(function (val) {
            val.remove();
        });
        countTodo.innerHTML = tBody.childElementCount;
    }
});

tfRow.appendChild(getElement('td', 'Counts:'));
tfRow.appendChild(countTodo);
tfRow.appendChild(getElement('td'));

if (!view.querySelector('table')) {
    view.appendChild(table);
}

todo.addEventListener('keydown', function (event) {
    if (event.keyCode == 13 && event.target.value) {
        var row = tBody.insertRow(0);

        row.appendChild(getElement('td', '')).appendChild(getInput('checkbox', ''));
        row.appendChild(getElement('td', event.target.value));
        row.appendChild(getElement('td', ' X ', 'delete'));

        countTodo.innerHTML = tBody.childElementCount;
        event.target.value = "";
        row.querySelectorAll('td.delete').forEach(function (val) {
            val.addEventListener('click', function (event) {
                event.target.parentNode.remove();
                countTodo.innerHTML = tBody.childElementCount;
            });
        });
    }
});

NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this, callback);
};
NodeList.prototype.filter = function (callback) {
    Array.prototype.filter.call(this, callback);
};
