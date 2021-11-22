let inputBox = document.getElementsByClassName('inputBox')[0];
let fromSelectBox = document.getElementsByClassName('fromSelectBox')[0];
let toSelectBox = document.getElementsByClassName('toSelectBox')[0];
let inputSection = document.getElementsByClassName("input-section")[0];
let resultContainer = document.getElementsByClassName("result-container")[0];
let recordHeading = document.getElementsByClassName("record-heading")[0];
let recordHistory = document.getElementsByClassName('record-history')[0];
let modeChange = document.getElementsByClassName('mode-change')[0];
let thArr = ['Date', 'From', 'To', 'Result'];
let recordArr = [
  {
    date: '',
    from: '',
    to: '',
    result: '',
  },
];
createTableRowAndData(thArr, recordHeading);
showRecordFromStorage();


for (let data in datas.rates){
    createOptionTag(datas.rates[data], data, fromSelectBox);
    createOptionTag(datas.rates[data], data, toSelectBox)
}

function createOptionTag(val, text, tagName) {
    let optTag = document.createElement('option');
    let value = val.replace(',', '');
    optTag.setAttribute('value', value)
    let textNd = document.createTextNode(text);
    optTag.appendChild(textNd);
    tagName.appendChild(optTag);
}

inputSection.addEventListener('submit', (event)=>{
    event.preventDefault();
    let inputValue = inputBox.value;
    let fromBOxValue = fromSelectBox.value;
    let toBoxValue = toSelectBox.value;
    let result = ((inputValue * fromBOxValue) / toBoxValue).toFixed(2);
    resultContainer.textContent = result;

    AddRecordHistory(inputValue, result);
    inputBox.value = '';
})

function AddRecordHistory(inputValue, result){
    let date = new Date().toLocaleString();
    let fromValueText = inputValue + ' ' +fromSelectBox.options[fromSelectBox.options.selectedIndex].textContent;
    let toValue = toSelectBox.options[toSelectBox.options.selectedIndex].textContent;
    let resultText = result + ' ' + toValue;

    recordArr = [
        {
            date : date,
            from : fromValueText,
            to : toValue,
            result : resultText
        }
    ];
    createTableRowAndData(recordArr, recordHistory);

    // Check Localstorage
    if (localStorage.length > 0) {
      let recordFromStorage = JSON.parse(localStorage.getItem("record"));
      recordFromStorage[recordFromStorage.length] = recordArr[0];
      return localStorage.setItem("record", JSON.stringify(recordFromStorage));
    }

    let recordJsonStr = JSON.stringify(recordArr);
    localStorage.setItem('record', recordJsonStr);
}

function createTableRowAndData(tagArr, tagName){
    let tableRow = document.createElement("tr");
    tableRow.classList = "animate__animated animate__fadeIn";
    if (tagName === recordHeading) {
        tableRow.classList.remove("animate__bounce");
        tagArr.forEach((text) => {
            let tableData = document.createElement("td");
            let tableDtText = document.createTextNode(text);
            tableData.appendChild(tableDtText);
            tableRow.appendChild(tableData);
        });
    } else {
        tagArr.forEach((text) => {
          for (let data in text) {
            let tableData = document.createElement("td");
            let tableDtText = document.createTextNode(text[data]);
            tableData.appendChild(tableDtText);
            tableRow.appendChild(tableData);
          }
        });
    }
    
    tagName.appendChild(tableRow);
}

function showRecordFromStorage(){
    if (localStorage.length == 0) {
        return;
    }
    let recordFromStorage = JSON.parse(localStorage.getItem("record"));
    recordFromStorage.forEach(el =>{
        let tableRow = document.createElement("tr");
          for (let data in el) {
            let tableData = document.createElement("td");
            let tableDtText = document.createTextNode(el[data]);
            tableData.appendChild(tableDtText);
            tableRow.appendChild(tableData);
          }
          recordHistory.appendChild(tableRow);
    });
    
}

modeChange.addEventListener('click', ()=>{
    document.getElementsByTagName('body')[0].classList.toggle('night-mode');
    document.getElementsByClassName('night')[0].classList.toggle('hide');
    document.getElementsByClassName('day')[0].classList.toggle('hide');
});