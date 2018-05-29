// Example of call of the function to make the table tree-like:
// tableToTree('#myTable', 'opened', 'visible', '<span class="toggle"></span>');

function tableToTree(table_Selector, tr_OpenedClass, tr_VisibleClass, tr_ToggleButton) {

  // Table elements variables
  var table = document.querySelector(table_Selector);
  var trs = document.querySelectorAll(table_Selector + " tr");

  // Add the buttons above the table
  var buttons = document.createElement('div');
  buttons.innerHTML = '<button>[‒] All</button><button>[+] All</button>';
  table.insertBefore(buttons, table.childNodes[0]);
  buttons = buttons.querySelectorAll('button');
  // Add the actions of these buttons
  buttons[0].addEventListener("click", function() {
    trs.forEach(function(elm) {
      elm.classList.remove(tr_OpenedClass);
      elm.classList.remove(tr_VisibleClass);
    });
  });
  buttons[1].addEventListener("click", function() {
    trs.forEach(function(elm) {
      if (elm.innerHTML.includes(tr_ToggleButton))
        elm.classList.add(tr_OpenedClass);
      elm.classList.add(tr_VisibleClass);
    });
  });

  // Next tr function
  function nextTr(row) {
    while ((row = row.nextSibling) && row.nodeType != 1);
    return row;
  }

  // On creation, automatically add toggle buttons if the tr has childs elements
  trs.forEach(function(tr, index) {
    if (index < trs.length - 1) {
      if (+tr.getAttribute("level") < +trs[index + 1].getAttribute("level")) {
        var elm1 = tr.firstElementChild;
        elm1.innerHTML = tr_ToggleButton + elm1.innerHTML;
      }
    }
  });

  // Use the buttons added by the function above
  table.addEventListener("click", function(e) {
    if (!e) return;
    if (e.target.outerHTML !== tr_ToggleButton) return;
    var row = e.target.closest("tr");
    row.classList.toggle(tr_OpenedClass);
    var lvl = +(row.getAttribute("level"));

    // Loop to make childs visible/hidden
    while ((row = nextTr(row)) && ((+(row.getAttribute("level")) == (lvl + 1)) || row.className.includes(tr_VisibleClass))) {
      row.classList.remove(tr_OpenedClass);
      row.classList.toggle(tr_VisibleClass);
    }
  });

}
