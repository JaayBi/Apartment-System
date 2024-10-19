// Update room count
function updateRoomCount() {
    const tenants = JSON.parse(localStorage.getItem('tenants')) || [];
    document.getElementById('nRooms').innerText = tenants.length; // Update the count
}

// Load tenants from local storage
function loadTenants() {
    const tenants = JSON.parse(localStorage.getItem('tenants')) || [];
    const tenantTableBody = document.getElementById('tenant-table-body');
    tenantTableBody.innerHTML = ''; // Clear existing entries

    tenants.forEach((tenant, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="tenantTb">
                <img src="jb.jpg" alt="Tenant Image">
                <p>${tenant.name}</p>
            </td>
            <td>${tenant.date}</td>
            <td><span class="status ${tenant.status.toLowerCase()}">${tenant.status}</span></td>
            <td class="btn">
                <button class="viewBtn" data-index="${index}">View</button>
                <button class="editBtn" data-index="${index}">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        `;
        tenantTableBody.appendChild(row);
    });
    updateRoomCount(); // Update the room count after loading tenants
}

// Save tenants to local storage
function saveTenants(tenants) {
    localStorage.setItem('tenants', JSON.stringify(tenants));
}

// Load activity logs from local storage
function loadActivityLogs() {
    const activityLogs = JSON.parse(localStorage.getItem('activityLogs')) || [];
    const activityLogBody = document.getElementById('activity-table-body');
    activityLogBody.innerHTML = ''; // Clear existing logs

    activityLogs.forEach((log, index) => {
        const row = document.createElement('tr');
        row.style.color = log.action === 'Deleted' ? 'red' : log.action === 'Edited' ? 'green' : 'blue';
        row.innerHTML = `
            <td>${log.action}</td>
            <td>${log.tenantName}</td>
            <td>${log.date}</td>
            <td>${log.details}</td>
            <td><button onclick="deleteActivity(${index})">Delete</button></td>
        `;
        activityLogBody.appendChild(row);
    });
}

// Function to delete a specific activity row
function deleteActivity(index) {
    const activityLogs = JSON.parse(localStorage.getItem('activityLogs')) || [];
    
    // Remove the log at the specified index
    activityLogs.splice(index, 1);
    
    // Update local storage
    localStorage.setItem('activityLogs', JSON.stringify(activityLogs));
    
    // Reload activity logs to reflect the changes in the UI
    loadActivityLogs();
}

// Function to log recent activities
function logActivity(action, tenantName, details) {
    const activityLogs = JSON.parse(localStorage.getItem('activityLogs')) || [];
    const date = new Date().toLocaleString();

    const newLog = { action, tenantName, date, details };
    activityLogs.push(newLog);
    localStorage.setItem('activityLogs', JSON.stringify(activityLogs));
}

// Show Home content
function showHome() {
    document.getElementById('homeContent').style.display = 'block';
    document.getElementById('historyContent').style.display = 'none';
    document.getElementById('teamContent').style.display = 'none'; // Hides the team section
    document.querySelector('.box-info').style.display = 'block';
    document.getElementById('table-data').style.display = 'block';
}

// Show History content
function showHistory() {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('historyContent').style.display = 'block';
    document.getElementById('teamContent').style.display = 'none'; // Hides the team section
    document.querySelector('.box-info').style.display = 'none';
    document.getElementById('table-data').style.display = 'none';
}

// Show My Team content
function showTeam() {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('historyContent').style.display = 'none';
    document.getElementById('teamContent').style.display = 'block';
    document.querySelector('.box-info').style.display = 'none'; // Hides tenant info
    document.getElementById('table-data').style.display = 'none'; // Hides the room list table
}

// On page load
window.onload = function() {
    loadTenants();
    loadActivityLogs();
};

// Add Tenant
document.getElementById('addTenantForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newTenant = { 
        name: document.getElementById('tenantName').value, 
        date: document.getElementById('tenantDate').value, 
        status: document.getElementById('tenantStatus').value,
        contact: document.getElementById('tenantContact').value,
        age: document.getElementById('tenantAge').value,
        gender: document.getElementById('tenantGender').value,
        address: document.getElementById('tenantAddress').value 
    };
    
    const tenants = JSON.parse(localStorage.getItem('tenants')) || [];
    tenants.push(newTenant);
    saveTenants(tenants);
    
    logActivity('Added', newTenant.name, 'New tenant added.');

    // Reload the page to reflect changes
    location.reload();
});

// Edit Tenant
document.getElementById('editTenantForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tenantIndex = document.getElementById('editTenantIndex').value;
    const updatedTenant = { 
        name: document.getElementById('editTenantName').value, 
        date: document.getElementById('editTenantDate').value, 
        status: document.getElementById('editTenantStatus').value,
        contact: document.getElementById('editTenantContact').value,
        age: document.getElementById('editTenantAge').value,
        gender: document.getElementById('editTenantGender').value,
        address: document.getElementById('editTenantAddress').value 
    };

    const tenants = JSON.parse(localStorage.getItem('tenants')) || [];
    tenants[tenantIndex] = updatedTenant;
    saveTenants(tenants);
    
    logActivity('Edited', updatedTenant.name, 'Tenant details updated.');

    // Reload the page to reflect changes
    location.reload();
});

// View Tenant Modal Handling
document.getElementById('tenant-table-body').addEventListener('click', function(e) {
    if (e.target.classList.contains('viewBtn')) {
        const index = e.target.dataset.index;
        const tenants = JSON.parse(localStorage.getItem('tenants')) || [];
        const tenant = tenants[index];

        document.getElementById('viewTenantName').textContent = tenant.name;
        document.getElementById('viewTenantDate').textContent = tenant.date;
        document.getElementById('viewTenantStatus').textContent = tenant.status;
        document.getElementById('viewTenantContact').textContent = tenant.contact;
        document.getElementById('viewTenantAge').textContent = tenant.age;
        document.getElementById('viewTenantGender').textContent = tenant.gender;
        document.getElementById('viewTenantAddress').textContent = tenant.address;
        
        document.getElementById('viewTenantModal').style.display = 'block'; // Show the view modal
    }
});

// Delete Tenant
document.getElementById('tenant-table-body').addEventListener('click', function(e) {
    if (e.target.classList.contains('deleteBtn')) {
        const tenantName = e.target.closest('tr').cells[0].textContent.trim();
        const tenants = JSON.parse(localStorage.getItem('tenants')) || [];
        const indexToDelete = Array.from(e.target.closest('tr').parentNode.children).indexOf(e.target.closest('tr'));

        // Log the deletion before removing the tenant
        logActivity('Deleted', tenantName, 'Tenant removed from the list.');

        // Remove tenant
        tenants.splice(indexToDelete, 1);
        saveTenants(tenants);
        
        // Reload the page to reflect changes
        location.reload();
    }
});

// Edit Tenant Modal Handling
document.getElementById('tenant-table-body').addEventListener('click', function(e) {
    if (e.target.classList.contains('editBtn')) {
        const index = e.target.dataset.index;
        const tenants = JSON.parse(localStorage.getItem('tenants')) || [];
        const tenant = tenants[index];

        document.getElementById('editTenantIndex').value = index;
        document.getElementById('editTenantName').value = tenant.name;
        document.getElementById('editTenantDate').value = tenant.date;
        document.getElementById('editTenantStatus').value = tenant.status;
        document.getElementById('editTenantContact').value = tenant.contact;
        document.getElementById('editTenantAge').value = tenant.age;
        document.getElementById('editTenantGender').value = tenant.gender;
        document.getElementById('editTenantAddress').value = tenant.address;

        document.getElementById('editTenantModal').style.display = 'block'; // Show the edit modal
    }
});

// Close Modal functionality
document.getElementById('closeAddModal').onclick = function() {
    document.getElementById('addTenantModal').style.display = 'none';
};

document.getElementById('closeEditModal').onclick = function() {
    document.getElementById('editTenantModal').style.display = 'none';
};

document.getElementById('closeViewModal').onclick = function() {
    document.getElementById('viewTenantModal').style.display = 'none';
};

// Show Add Tenant Modal
document.getElementById('addTenantBtn').onclick = function() {
    document.getElementById('addTenantModal').style.display = 'block';
};

// Sidebar functionality
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}
