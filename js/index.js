(function() {
  
  var table = document.querySelector("#table"),
      heads = table.querySelectorAll("thead th"),
      rows = table.querySelectorAll("tbody tr");
  
  function convertArraylikeToArray(arraylike) {
    return Array.prototype.slice.call(arraylike);
  }
  
  function clearStyles(nodeList){
    for(var i = 0; i < nodeList.length; i++){
      nodeList[i].className = "";
    }
  }
  
  function sortTable(e) {
    var target = e.target,
        headsArr = convertArraylikeToArray(heads),
        rowsArr = convertArraylikeToArray(rows),
        headIndex = headsArr.indexOf(target),
        df = document.createDocumentFragment(),
        tableOrder = (target.className === "" || target.className === "desc") ? "asc" : "desc";
 
    clearStyles(heads);
    
    rowsArr.sort(function(a, b){
      var tdA = a.children[headIndex].textContent,
          tdB = b.children[headIndex].textContent;
      
      if(tdA < tdB) {
        return tableOrder === "asc" ? -1 : 1;
      } else if(tdA > tdB){
        return tableOrder === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
    
    rowsArr.forEach(function(tr){
      df.appendChild(tr);
    });
    
    target.className = tableOrder;
    table.querySelector("tbody").appendChild(df);
  }
  
  for(var i = 0; i < heads.length; i++) {
    heads[i].onclick = sortTable;
  }
  
})();