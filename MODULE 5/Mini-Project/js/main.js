// Registration Function
function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const existingUser = localStorage.getItem(email);
    if (existingUser) {
        alert("User already exists. Please login.");
        window.location.href = "login.html";
        return;
    }

    const user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));

    alert("Registration successful! Please login.");
    window.location.href = "login.html";
}

// Login Function
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const storedUser = localStorage.getItem(email);
    if (!storedUser) {
        alert("User not found. Please register.");
        window.location.href = "register.html";
        return;
    }

    const user = JSON.parse(storedUser);

    if (user.password === password) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Incorrect password. Please try again.");
    }
}

// Load Projects from Local Storage (if applicable)
function loadLocalProjects() {
    const projectList = document.getElementById("projectList");
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    if (projects.length === 0) {
        projectList.innerHTML = "<p>No projects available.</p>";
        return;
    }

    projects.forEach((project, index) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("col-md-4");

        projectCard.innerHTML = `
            <div class="card mb-4" id="project-card-${index}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <button class="btn btn-primary" onclick="showProjectDetails(${index})">View Details</button>
                    <button class="btn btn-danger" onclick="deleteLocalProject(${index})">Delete</button>
                </div>
            </div>
        `;

        projectList.appendChild(projectCard);
    });
}

// Load Projects from Backend
async function loadProjects() {
    try {
        const response = await fetch('http://localhost:3000/projects');
        const projects = await response.json();

        const projectList = document.getElementById('projectList');
        projectList.innerHTML = ''; // Clear existing content

        projects.forEach((project) => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('col-md-4', 'mb-3');
            projectCard.innerHTML = `
                <div class="card" id="project-card-${project.id}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description.substring(0, 100)}...</p>
                        <button class="btn btn-primary" onclick="viewProjectDetails(${project.id})">View Details</button>
                        <button class="btn btn-sm btn-warning" onclick="editProject(${project.id})">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProject(${project.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            projectList.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

async function viewProjectDetails(projectId) {
    try {
        const response = await fetch(`http://localhost:3000/projects/${projectId}`);
        const project = await response.json();

        // Populate the panel with project details
        document.getElementById('projectPanelTitle').textContent = project.title;
        document.getElementById('projectPanelDescription').textContent = project.description;

        // Show the project details panel
        document.getElementById('projectDetailsPanel').style.display = 'block';
    } catch (error) {
        console.error('Error fetching project details:', error);
    }
}


// Delete Project from Local Storage (if applicable)
function deleteLocalProject(index) {
    if (confirm("Are you sure you want to delete this project?")) {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(projects));

        // Remove the project card from the page
        document.getElementById(`project-card-${index}`).remove();
        alert('Project deleted successfully!');
    }
}
async function editProject(projectId) {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");

    if (newTitle && newDescription) {
        try {
            const response = await fetch(`http://localhost:3000/api/edit/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newTitle,
                    description: newDescription
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update project');
            }

            const data = await response.json();
            alert(data.message);
            loadProjects();
        } catch (error) {
            console.error('Error editing project:', error);
        }
    }
}

function deleteProject(projectId) {
    if (confirm("Are you sure you want to delete this project?")) {
        fetch(`http://localhost:3000/api/delete-project/${projectId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting project');
            }
            return response.json();
        })
        .then(data => {
            alert('Project deleted successfully!');
            // Remove the project card from the page
            const projectCard = document.getElementById(`project-card-${projectId}`);
            if (projectCard) {
                projectCard.remove();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting project');
        });
    }
}


// Close Project Details Panel
function closeProjectDetails() {
    // Hide the project details panel
    document.getElementById('projectDetailsPanel').style.display = 'none';
}


async function postProject(event) {
    event.preventDefault();

    const title = document.getElementById("projectTitle").value;
    const description = document.getElementById("projectDescription").value;

    try {
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            alert('Project posted successfully!');
            window.location.href = 'services.html';  // Redirect if needed
        } else {
            alert('Failed to post project. Please try again.');
        }
    } catch (error) {
        console.error('Error posting project:', error);
        alert('An error occurred while posting the project.');
    }
}
