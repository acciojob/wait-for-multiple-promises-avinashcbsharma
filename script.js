function createPromise(min, max) {
      const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(randomTime);
        }, randomTime * 1000);
      });
    }

    // Array to store promises
    const promises = [
      createPromise(1, 3),
      createPromise(1, 3),
      createPromise(1, 3)
    ];

    // Adding a row with loading text
    const loadingRow = document.createElement('tr');
    const loadingCell = document.createElement('td');
    loadingCell.setAttribute('colspan', '2');
    loadingCell.textContent = 'Loading...';
    loadingRow.appendChild(loadingCell);
    document.getElementById('table-body').appendChild(loadingRow);

    // Using Promise.all to wait for all promises to resolve
    Promise.all(promises)
      .then(results => {
        // Removing loading text
        document.getElementById('table-body').removeChild(loadingRow);

        // Populating the table with resolved values
        results.forEach((time, index) => {
          const row = document.createElement('tr');
          const column1 = document.createElement('td');
          const column2 = document.createElement('td');
          column1.textContent = `Promise ${index + 1}`;
          column2.textContent = `${time}`;
          row.appendChild(column1);
          row.appendChild(column2);
          document.getElementById('table-body').appendChild(row);
        });

        // Calculating total time taken
        const totalTime = results.reduce((acc, curr) => acc + curr, 0);
        const totalRow = document.createElement('tr');
        const totalColumn1 = document.createElement('td');
        const totalColumn2 = document.createElement('td');
        totalColumn1.textContent = 'Total';
        totalColumn2.textContent = `${totalTime.toFixed(3)}`;
        totalRow.appendChild(totalColumn1);
        totalRow.appendChild(totalColumn2);
        document.getElementById('table-body').appendChild(totalRow);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
