document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const searchInput = document.querySelector('.search-bar input'); // Selektor untuk input pencarian
  const tablesContainer = document.querySelector('#tables-container');

  // Tampilkan loader selama 3.5 detik
  setTimeout(() => {
    loadingScreen.style.display = 'none';  // Sembunyikan loader setelah 3.5 detik
    mainContent.style.display = 'block';  // Tampilkan konten utama
  }, 4500);

  // Fetch data dari API
  fetch('/lol/routes')
    .then(response => response.json())
    .then(routes => {
      const groupedRoutes = routes.reduce((groups, route) => {
        if (!groups[route.category]) {
          groups[route.category] = [];
        }
        groups[route.category].push(route);
        return groups;
      }, {});

      Object.keys(groupedRoutes).forEach(category => {
        const categoryRoutes = groupedRoutes[category];

        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container');
        tableContainer.setAttribute('data-category', category);
        tableContainer.innerHTML = `<h5><i class="fa-solid fa-layer-group"></i> ${category}</h5>`;

        const table = document.createElement('table');
        table.innerHTML = `
          <thead>
            <tr>
              <th>Route</th>
              <th>Method</th>
              <th>Status</th>
              <th>Try</th>
            </tr>
          </thead>
          <tbody id="routes-table-body-${category}">
          </tbody>
        `;

        categoryRoutes.forEach(route => {
          const row = document.createElement('tr');
          let routeUrl = `/api${route.url}`;
          if (route.param) {
            routeUrl += route.param.includes('?') ? route.param : `?${route.param}`;
          }

          row.innerHTML = `
            <td><i class="fab ${route.iconname}"></i> ${route.nama}</td>
            <td>${route.method}</td>
            <td><span class="badge"><i class="fa-regular fa-circle-check"></i></span></td>
            <td><a href="${routeUrl}" class="icon-btn"><i class="fa-solid fa-play"></i></a></td>
          `;
          table.querySelector('tbody').appendChild(row);
        });

        tableContainer.appendChild(table);
        tablesContainer.appendChild(tableContainer);
      });

      // Fitur pencarian
      searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const tables = tablesContainer.querySelectorAll('.table-container');

        tables.forEach(table => {
          const category = table.getAttribute('data-category').toLowerCase();
          const rows = table.querySelectorAll('tbody tr');
          let tableHasMatch = false;

          rows.forEach(row => {
            const routeName = row.querySelector('td:first-child').textContent.toLowerCase();
            const match = routeName.includes(query) || category.includes(query);
            row.style.display = match ? '' : 'none';
            if (match) tableHasMatch = true;
          });

          table.style.display = tableHasMatch ? '' : 'none';
        });
      });
    })
    .catch(err => console.error('Error fetching routes:', err));
});