
  const rangenew = 'Sheet1!H:I'; // Replace with your desired range (columns H and I)

fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangenew}?key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log('Data from Google Sheets:', data); // Check if data is retrieved successfully

    const targetData = [];
    const productionData = [];

    // Extracting data
    data.values.forEach(row => {
      targetData.push(parseInt(row[0])); // Assuming daily target is in column H
      productionData.push(parseInt(row[1])); // Assuming daily production is in column I
    });

    console.log('Target Data:', targetData); // Check if target data is extracted correctly
    console.log('Production Data:', productionData); // Check if production data is extracted correctly

    // Call function to create the chart using ApexCharts
    createGradientCircleChart(targetData, productionData);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


  function createGradientCircleChart(targetData, productionData) {
    const options = {
      chart: {
        type: 'radialBar',
        height: 350,
      },
      series: [{
        name: 'Daily Production',
        data: productionData,
      }],
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: '70%',
            background: 'transparent',
          },
          track: {
            background: 'transparent',
            strokeWidth: '100%',
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: 15,
              color: '#fff',
              fontSize: '30px',
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: ['Daily Production'],
    };

    const chartl = new ApexCharts(document.querySelector('#chart2'), options);
    chartl.render();
  }














  </script>

<!-- Line Wise Production -->
<div class="container">
  <div class="row" id="chartsContainer"><h2 class="title mt-5">Line-Wise Production</h2></div>
</div>
<script>
  const rangeLine1 = 'Production&WIP!L8';
  const rangeLine2 = 'Production&WIP!15';

  // Fetch data from Google Sheets using the Sheets API for range 1
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangeLine1}?key=${apiKey}`)
    .then(response1 => response1.json())
    .then(data1 => {
      // Fetch data from Google Sheets using the Sheets API for range 2
      fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangeLine2}?key=${apiKey}`)
        .then(response2 => response2.json())
        .then(data2 => {
          const chartsContainer = document.getElementById('chartsContainer');

          // Iterate over each cell value in columns L8 and 15 to create charts
          data1.values.slice(1).forEach((row1, index) => {
            const seriesName = row1[0]; // Value from column L8
            const targetData = parseInt(data2.values[index + 1][0]); // Assuming data is in column 15

            // Create a column for each chart using Bootstrap grid system
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-md-6', 'col-lg-3'); // Adjust columns based on your grid layout
            chartsContainer.appendChild(colDiv);

            // Create a div element for each chart
            const chartDiv = document.createElement('div');
            chartDiv.classList.add('chart-container');
            colDiv.appendChild(chartDiv);

            // Create the radial bar chart using ApexCharts for each row data
            createRadialBarChart(chartDiv, seriesName, targetData);
          });
        })
        .catch(error2 => {
          console.error('Error fetching data from range 2:', error2);
        });
    })
    .catch(error1 => {
      console.error('Error fetching data from range 1:', error1);
    });

  // Function to create the radial bar chart
  function createRadialBarChart(container, seriesName, targetData) {
    const options = {
      series: [targetData],
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              show: true,
              fontSize: '22px',
              color: '#888',
              offsetY: -10,
              formatter: function() {
                return seriesName; // Display series name
              }
            }
          }
        }
      }
      // Other chart options...
    };

    const chart = new ApexCharts(container, options);
    chart.render();
  }
</script>











<!-- Line Wise Production -->
<div class="container">
  <div class="row" id="chartsContainer">
    <h2 class="title mt-5">Line-Wise Production</h2>
  </div>
</div>

<script>
  const productionRange = 'Production&WIP!S2:Z';

  // Fetch data from Google Sheets using the Sheets API
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${productionRange}?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const chartsContainer = document.getElementById('chartsContainer');

      // Iterate over each cell value in columns S to Z to create radial bar charts
      data.values.slice(1).forEach(row => {
        const lineName = row[0]; // Value from column S
        const productionValue = parseInt(row[row.length - 1]); // Value from the last column (column Z)

        const colDiv = document.createElement('div');
        colDiv.classList.add('col-md-6', 'col-lg-3');
        chartsContainer.appendChild(colDiv);

        const chartDiv = document.createElement('div');
        chartDiv.classList.add('chart-container');
        colDiv.appendChild(chartDiv);

        createRadialBarChart(chartDiv, lineName, productionValue);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  // Function to create the radial bar chart
  function createRadialBarChart(container, seriesName, targetData) {
    const options = {
      series: [targetData],
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              show: true,
              fontSize: '22px',
              color: '#888',
              offsetY: -10,
              formatter: function() {
                return seriesName; // Display series name
              }
            }
          }
        }
      }
      // Other chart options...
    };

    const chart = new ApexCharts(container, options);
    chart.render();
  }
</script>

