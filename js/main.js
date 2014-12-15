var todo = document.querySelector('#todo input'),
    tbody = document.querySelector('tbody');

todo.addEventListener('keydown', function (event) {
    if (event.keyCode == 13 && event.target.value) {
        var tr = document.createElement('tr'),
            td = document.createElement('td');

        td.innerHTML = event.target.value;
        tr.appendChild(td);

        if (tbody.childNodes.length % 2) {
            tr.className = 'even';
        }

        tbody.appendChild(tr);
        document.querySelector('table').style.display = tbody.childNodes.length ? "block" : "";

        todo.value = "";
        console.log(tbody.childNodes.length);
    }
});

