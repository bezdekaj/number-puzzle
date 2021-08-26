const size = 3;
const board = document.getElementById('board');

function createBoard() {

    let counter = 1;

    for (let y = 0; y < size; y++) {
        let row = document.createElement('div');
        row.classList.add('row')
        board.appendChild(row);

        for (let x = 0; x < size; x++) {

            if(counter === size*size) counter = null;

            let item = document.createElement('div');
            item.setAttribute('data-x', x);
            item.setAttribute('data-y', y);
            item.setAttribute('data-value', counter);
            item.addEventListener('click', move);

            if(counter == null) {
                item.classList.add('item--empty');
            }
            item.innerText = counter;
            item.classList.add('item')
            row.appendChild(item);

            counter++;
        }
    }

    setMovable();
}
createBoard()

function move(event) {

    let selectedItem = this;
    let selectedItemValue = selectedItem.getAttribute('data-value');

    let emptyItem = document.querySelectorAll("[data-value = null]");
        emptyItem = emptyItem[0];

    let selected_X = parseInt(selectedItem.getAttribute('data-x'));
    let selected_Y = parseInt(selectedItem.getAttribute('data-y'));
    let empty_X    = parseInt(emptyItem.getAttribute('data-x'));
    let empty_Y    = parseInt(emptyItem.getAttribute('data-y'));


    // Check if item can be moved - only X and Y by one step
    let canBeMoved = false;
    if(selected_X + 1 === empty_X && selected_Y === empty_Y) {
        selectedItem.classList.add('animate-right');
        canBeMoved = true;
    }
    if(selected_X - 1 === empty_X && selected_Y === empty_Y) {
        selectedItem.classList.add('animate-left');
        canBeMoved = true;
    }
    if(selected_X === empty_X && selected_Y + 1 === empty_Y) {
        selectedItem.classList.add('animate-bottom');
        canBeMoved = true;
    }
    if(selected_X === empty_X && selected_Y - 1 === empty_Y) {
        selectedItem.classList.add('animate-top');
        canBeMoved = true;
    }

    // Move items
    if(canBeMoved) {
        setTimeout(function () {
            selectedItem.setAttribute('data-value', null);
            selectedItem.innerText = '';

            emptyItem.setAttribute('data-value', selectedItemValue);
            emptyItem.innerText = selectedItemValue;

            selectedItem.classList.add('item--empty');
            emptyItem.classList.remove('item--empty');

            selectedItem.classList.remove('animate-top', 'animate-bottom', 'animate-left', 'animate-right')

            setMovable()

        }, 150);
    }

}

function setMovable() {
    let allItems = document.querySelectorAll("[data-value]");
    let emptyItem = document.querySelectorAll("[data-value = null]");
        emptyItem = emptyItem[0];
    let emptyItem_X = parseInt(emptyItem.getAttribute('data-x'));
    let emptyItem_Y = parseInt(emptyItem.getAttribute('data-y'));

    for(let i = 0; i < allItems.length; i++) {
        allItems[i].classList.remove('item--movable');
        let item = allItems[i];
        let item_X = parseInt(item.getAttribute('data-x'));
        let item_Y = parseInt(item.getAttribute('data-y'));

        if(
            emptyItem_X + 1 === item_X && emptyItem_Y === item_Y
            ||
            emptyItem_X - 1 === item_X && emptyItem_Y === item_Y
            ||
            emptyItem_Y + 1 === item_Y && emptyItem_X === item_X
            ||
            emptyItem_Y - 1 === item_Y && emptyItem_X === item_X
        ) {
            item.classList.add('item--movable');
        }
    }
}




const btnRand = document.getElementById('rand');
btnRand.addEventListener('click', randMix);

function randMix() {
    (function loop(i) {
        setTimeout(function () {

            let allItems = document.querySelectorAll(".item--movable");
            let randItem = allItems[Math.floor(Math.random() * allItems.length)];
            randItem.click();

            if (--i) loop(i);   //  decrement i and call myLoop again if i > 0
        }, 150)
    })(50);
}
