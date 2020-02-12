
// function to control what happens when an element is dropped
interact('.dropzone')
  .dropzone({
  })
  .on('drop', function (event) {
    // get the dragged item, target drop area, and current large card container
    let previousLargeContainer = document.querySelector('.large-card-container');
    let dropTarget = event.target;
    let draggedItem = document.querySelector('.drag-active');

    let rowA = document.querySelector('.row-a');
    let rowB = document.querySelector('.row-b');
    let rows = [rowA, rowB];

    // check which row has 2 elements and which row has 3 elements, and log the row element as well as its children
    let twoRow = rows.find(row => row.children.length === 2);
    let threeRow = rows.find(row => row.children.length === 3);
    let twoRowChildren = [...twoRow.children];
    let threeRowChildren = [...threeRow.children];

    // each time a drop event is triggered, get the DOM elements and give them an ID based on their position
    twoRowChildren.forEach((child, index) => child.dataset.id = index );
    threeRowChildren.forEach((child, index) => child.dataset.id = index );


        // move small card to small card
      if (draggedItem.classList.contains('small-card') &&
      !dropTarget.classList.contains('large-card-container')) {

        draggedItem.parentNode.appendChild(dropTarget.children[0]);
        dropTarget.appendChild(draggedItem)

      } else if (draggedItem.classList.contains('large-card') &&
      dropTarget.classList.contains('large-card-container')) {
        // move large card to small card
      } else if (draggedItem.classList.contains('large-card')) {
        // if in the same row
          if (draggedItem.parentNode.parentNode === dropTarget.parentNode) {
            draggedItem.parentNode.appendChild(dropTarget.children[0]);
            dropTarget.appendChild(draggedItem);
            largeToSmallWithinRow();
        // if moving to different row
          } else {
            moveLargeCardToNewRow();
          }

        // move small card to large card
      } else {
        // if in the same row
        if (draggedItem.parentNode.parentNode === dropTarget.parentNode) {
          draggedItem.parentNode.appendChild(dropTarget.children[0]);
          dropTarget.appendChild(draggedItem);
          smallToLargeWithinRow();
        } else {
        // if moving to different row
          moveSmallCardToNewRow();
        }
      }

    function largeToSmallWithinRow() {
      if (previousLargeContainer.classList.contains('large-card-right')) {

        previousLargeContainer.classList.remove('large-card-right');
        previousLargeContainer.classList.remove('large-card-container');
        previousLargeContainer.classList.add('card-container');

        dropTarget.classList.add('large-card-left');
        dropTarget.classList.add('large-card-container');
        dropTarget.classList.remove('card-container');

      } else if (previousLargeContainer.classList.contains('large-card-left')) {

        dropTarget.classList.add('large-card-right');
        dropTarget.classList.add('large-card-container');
        dropTarget.classList.remove('card-container');

        previousLargeContainer.classList.remove('large-card-left');
        previousLargeContainer.classList.remove('large-card-container');
        previousLargeContainer.classList.add('card-container');
      }
    }

    function smallToLargeWithinRow() {
      if (dropTarget.classList.contains('large-card-right')) {

        twoRow.children[0].classList.add('large-card-left');
        twoRow.children[0].classList.add('large-card-container');
        dropTarget.classList.remove('large-card-right');
        dropTarget.classList.remove('large-card-container');
        dropTarget.classList.add('card-container');

      } else if (dropTarget.classList.contains('large-card-left')) {

        twoRow.children[1].classList.add('large-card-right');
        twoRow.children[1].classList.add('large-card-container');
        dropTarget.classList.remove('large-card-left');
        dropTarget.classList.remove('large-card-container');
        dropTarget.classList.add('card-container');

      }
    }

    function moveLargeCardToNewRow() {
      draggedItem.parentNode.classList.remove('large-card-container');
      draggedItem.parentNode.classList.add('card-container');
      draggedItem.parentNode.classList.remove('large-card-left');
      draggedItem.parentNode.classList.remove('large-card-right');
      dropTarget.classList.add('large-card-container');

      if (dropTarget.dataset.id === "0") {
        draggedItem.parentNode.appendChild(dropTarget.children[0]);
        draggedItem.parentNode.parentNode.appendChild(threeRowChildren[2]);
        dropTarget.appendChild(draggedItem);
        dropTarget.classList.add('large-card-left')
      } else if (dropTarget.dataset.id === "1") {
        // console.log('second item');
        draggedItem.parentNode.appendChild(dropTarget.children[0]);
        draggedItem.parentNode.parentNode.appendChild(threeRowChildren[0]);
        dropTarget.appendChild(draggedItem);
        dropTarget.classList.add('large-card-left')
      } else if (dropTarget.dataset.id === "2") {
        // console.log('third item');
        draggedItem.parentNode.appendChild(dropTarget.children[0]);
        draggedItem.parentNode.parentNode.appendChild(threeRowChildren[0]);
        dropTarget.appendChild(draggedItem);
        dropTarget.classList.add('large-card-right')
      }
    }

    function moveSmallCardToNewRow() {
      dropTarget.classList.remove('large-card-container');
      dropTarget.classList.remove('large-card-right');
      dropTarget.classList.remove('large-card-left');
      dropTarget.classList.add('card-container');

      if (draggedItem.parentNode.dataset.id === "0") {

        draggedItem.parentNode.appendChild(dropTarget.children[0]);
        dropTarget.appendChild(draggedItem);
        draggedItem.parentNode.parentNode.appendChild(threeRow.children[2]);
        threeRow.children[0].classList.add('large-card-left');
        threeRow.children[0].classList.add('large-card-container');

      } else if (draggedItem.parentNode.dataset.id === "1") {

        draggedItem.parentNode.appendChild(dropTarget.children[0]);
        dropTarget.appendChild(draggedItem);
        draggedItem.parentNode.parentNode.appendChild(threeRow.children[0]);
        threeRow.children[0].classList.add('large-card-left');
        threeRow.children[0].classList.add('large-card-container');

      } else if (draggedItem.parentNode.dataset.id === "2") {
        draggedItem.parentNode.appendChild(dropTarget.children[0]);
        dropTarget.appendChild(draggedItem);
        draggedItem.parentNode.parentNode.appendChild(threeRow.children[0]);
        threeRow.children[1].classList.add('large-card-right');
        threeRow.children[1].classList.add('large-card-container');
      }
    }

    resetItemCoordinates(draggedItem);
  })

// reset coordinates when event is over
  function resetItemCoordinates(item) {
    item.classList.remove('drag-active');
    item.style.removeProperty('transform');
    item.style.removeProperty('translate');
    item.removeAttribute('data-x');
    item.removeAttribute('data-y');
  }

// function to control what happens when an element is dragged
interact('.draggable')
  .draggable({

    // disable inertial throwing
    inertia: false,
    modifiers: [
      interact.modifiers.restrictRect({
        // restriction: '.small-card-container',
        // endOnly: true
      })
    ],
    // disable autoScroll
    autoScroll: false,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    });

// event listener
function dragMoveListener (event) {
  var target = event.target
  target.classList.add('drag-active')

  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

  // return target
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
