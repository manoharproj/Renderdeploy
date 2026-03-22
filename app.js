
// ===== NovaForge Preview Guard =====
const IS_PREVIEW = window.location.protocol === "about:";
if (IS_PREVIEW) {
  console.warn("Preview mode active: backend calls disabled");
}

// Smooth scrolling for navigation links and active class highlighting
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Update active class
                    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Contact Form Submission Handling
        const contactForm = document.getElementById('contactForm');
        const contactMessage = document.getElementById('contact-message');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault(); // Prevent actual form submission

                // In a real full-stack app, you would send this data to your backend
                // using fetch or XMLHttpRequest. For this demo, we just simulate success.
                console.log('Contact Form Submitted:');
                const formData = new FormData(contactForm);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                console.log(data);

                contactMessage.style.display = 'block';
                contactMessage.style.backgroundColor = '#d4edda';
                contactMessage.style.color = '#155724';
                contactMessage.style.borderColor = '#c3e6cb';
                contactMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.reset(); // Clear the form

                // Hide message after a few seconds
                setTimeout(() => {
                    contactMessage.style.display = 'none';
                }, 5000);
            });
        }


        // Admin Dashboard Data Fetch Demo
        const fetchAdminDataBtn = document.getElementById('fetchAdminDataBtn');
        const adminDataOutput = document.getElementById('admin-data-output');
        const apiUrl = 'http://localhost:5001/api/data'; // Backend endpoint

        if (fetchAdminDataBtn && adminDataOutput) {
            fetchAdminDataBtn.addEventListener('click', fetchData);
        }

        async function fetchData() {
            adminDataOutput.textContent = 'Fetching data from backend...';
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    // Check for HTTP errors (e.g., 404, 500)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                adminDataOutput.style.backgroundColor = '#e6ffe6'; /* Light green for success */
                adminDataOutput.style.borderColor = '#4CAF50';
                adminDataOutput.textContent = `Successfully fetched data:\n${JSON.stringify(data, null, 2)}`;
                console.log('Fetched data:', data);
            } catch (error) {
                // Handle network errors (e.g., server not running, connection refused)
                // or JSON parsing errors, or HTTP errors from !response.ok
                console.error('Error fetching admin data:', error);
                adminDataOutput.style.backgroundColor = '#ffe0e0'; /* Light red for error */
                adminDataOutput.style.borderColor = '#f44336';
                adminDataOutput.textContent = `Error: Could not connect to backend or fetch data.\n`;
                adminDataOutput.textContent += `Please ensure your backend server is running at ${apiUrl}.\n`;
                adminDataOutput.textContent += `(Error details: ${error.message})`;
            }
        }