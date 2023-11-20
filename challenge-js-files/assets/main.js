//TABLEAU1-------------------------------------------------------------------------------------------------------------------------
const canvasTable1 = document.createElement('canvas');
canvasTable1.id = 'Chart1'; 
const ctx1 = canvasTable1.getContext('2d');
const table1 = document.getElementById('table1');
table1.parentNode.insertBefore(canvasTable1, table1);

// déclare les variables des années, du pays et des données pour chaque pays du tableau1
const thElements = Array.from(document.querySelector('th[dir="ltr"]').parentElement.querySelectorAll('th'));
console.table(thElements);
const years = thElements.slice(2).map(th => th.innerText);
const countries = Array.from(table1.querySelectorAll('tbody td:nth-child(2)')).map(td => td.textContent);
const data = [];
for (let i = 2; i < table1.rows.length; i++) {
    const row = table1.rows[i];
    const datacountries=[];
  for (let j = 2; j < row.cells.length;j++)
  {
    datacountries.push(parseFloat(row.cells[j].textContent.replace(",", ".")));
  }
  data.push(datacountries);
}

// création d'un graphique à l'aide de chart.js pour voir toutes les dates de chaque pays chaque année
const Chart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: countries,
        datasets: years.map((year, index) => ({
            label: year,
            data: data.map(row => row[index]),
        }))
    }
  });


// TABLEAU 2------------------------------------------------------------------------------------------------------------
const table2 = document.querySelector("#table2");
const canvasTable2 = document.createElement('canvas');
const parentTables = document.getElementById('mw-content-text');
canvasTable2.setAttribute('id', 'idCanvas2');
parentTables.insertBefore(canvasTable2, table2);

const tableFunction2 = () => {
  let countries = [];
  let years = [];
  let dataDigits = [];
  const topTable2 = table2.rows[0];

  for(let i= 2; i< topTable2.cells.length; i++){
    years.push(topTable2.cells[i].textContent);
  }
  console.log("years");

  for (let i= 1; i< table2.rows.length;i++){
    const row = table2.rows[i];
    countries.push(row.cells[1].textContent);
    
    const dataCell = [];
    for( let j = 2; j< row.cells.length; j++){
      dataCell.push(parseFloat(row.cells[j].textContent.replace(",",".")));
    }
    dataDigits.push(dataCell);
  }
  tableData = { countries, years, dataDigits };
  const ctx = document.getElementById("idCanvas2");

  const barChart = new Chart(ctx, {
    type: 'bar',
    data : {
      labels: tableData.countries,
      datasets: tableData.years.map((year, index) => ({
        label: year,
        data: tableData.dataDigits.map(digit => digit[index]),
        borderWidth: 1
      }))
    },
    options: {
      scales: {
        y:{
          beginAtZero: true
        }
      }
    }
  });
}



//AJAX_FETCH------------------------------------------------------------------------------------------------
const table3 = document.createElement('canvas');
table3.id = 'Chart3';
const ctx3 = table3.getContext('2d');
const heading1 = document.getElementById('firstHeading');
heading1.parentNode.insertBefore(table3, heading1);

let dataPoints = [];
let Chart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Data Points',
            data: dataPoints,
            fill: false,
            borderColor: 'black',
            tension: 0.1
        }]
    },
});

function fetchData() {
    let url = "https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1]) + "&length=1&type=json";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                dataPoints.push(data[0][1]);
                Chart3.data.labels.push(data[0][0]);
                Chart3.update();
            }
            console.log(dataPoints)
        })
        .catch(error => console.error("Error fetching data: " + error));

    setTimeout(fetchData, 1000); 
}

fetchData(); 
tableFunction2();
tableFunction1();