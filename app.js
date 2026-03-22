
// ===== NovaForge Preview Guard =====
const IS_PREVIEW = window.location.protocol === "about:";
if (IS_PREVIEW) {
  console.warn("Preview mode active: backend calls disabled");
}

document.addEventListener('DOMContentLoaded', () => {
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = document.querySelector('header').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - (targetId === '#home' ? 0 : headerOffset); 

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        // Close mobile nav if open
                        const navMenu = document.querySelector('.nav-menu');
                        if (navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                        }
                    }
                });
            });

            // Mobile Navigation Toggle
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');

            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                });
            }

            // Contact Form Submission (Frontend only)
            const contactForm = document.getElementById('contactForm');
            const formMessage = document.getElementById('formMessage');

            if (contactForm && formMessage) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault(); // Prevent actual form submission

                    // Simple client-side validation
                    const name = document.getElementById('name').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const message = document.getElementById('message').value.trim();

                    if (!name || !email || !message) {
                        formMessage.textContent = 'Please fill in all required fields.';
                        formMessage.className = 'message error';
                        formMessage.style.display = 'block';
                        return;
                    }

                    // Simulate success
                    formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                    formMessage.className = 'message success';
                    formMessage.style.display = 'block';

                    // Clear form fields after a short delay
                    setTimeout(() => {
                        contactForm.reset();
                        formMessage.style.display = 'none';
                    }, 3000);
                });
            }

            // Backend Data Demo (GET/POST)
            const fetchDataBtn = document.getElementById('fetchDataBtn');
            const postDataBtn = document.getElementById('postDataBtn');
            const backendResponseDiv = document.getElementById('backendResponse');
            const API_URL = 'http://localhost:5001/api/data';

            // Function to display response or error
            const displayResponse = (data, isError = false) => {
                if (isError) {
                    backendResponseDiv.innerHTML = `<p style="color: #721c24;">Error: ${data}</p>`;
                } else {
                    backendResponseDiv.innerHTML = `<p style="color: #155724;"><strong>Success!</strong> Response from backend:</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
                }
            };

            // GET Request
            if (fetchDataBtn) {
                fetchDataBtn.addEventListener('click', async () => {
                    backendResponseDiv.innerHTML = '<p><em>Fetching data...</em></p>';
                    try {
                        const response = await fetch(API_URL, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText || 'Unknown error'}`);
                        }

                        const data = await response.json();
                        displayResponse(data);

                    } catch (error) {
                        console.error('Fetch GET error:', error);
                        displayResponse(`Could not connect to backend or fetch data. Please ensure 'http://localhost:5001' is running. Error: ${error.message}`, true);
                    }
                });
            }

            // POST Request
            if (postDataBtn) {
                postDataBtn.addEventListener('click', async () => {
                    backendResponseDiv.innerHTML = '<p><em>Sending data...</em></p>';
                    const dummyData = {
                        message: "Hello from Vignan Lara College!",
                        timestamp: new Date().toISOString(),
                        source: "frontend"
                    };

                    try {
                        const response = await fetch(API_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dummyData)
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText || 'Unknown error'}`);
                        }

                        const data = await response.json();
                        displayResponse(data);

                    } catch (error) {
                        console.error('Fetch POST error:', error);
                        displayResponse(`Could not connect to backend or send data. Please ensure 'http://localhost:5001' is running. Error: ${error.message}`, true);
                    }
                });
            }

            // Initial message for backend demo
            if (backendResponseDiv) {
                backendResponseDiv.innerHTML = `<p>Click "Fetch Data" or "Send Data" to interact with the backend at <code>${API_URL}</code>. <br><em>(Note: You need a backend server running at this address for it to work.)</em></p>`;
            }

        });