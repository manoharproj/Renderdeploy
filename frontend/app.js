
// ===== NovaForge Preview Guard =====
const IS_PREVIEW = window.location.protocol === "about:";
if (IS_PREVIEW) {
  console.warn("Preview mode active: backend calls disabled");
}

document.addEventListener('DOMContentLoaded', () => {
            const contactForm = document.getElementById('contactForm');
            const formStatus = document.getElementById('formStatus');
            const adminLoginBtn = document.getElementById('adminLoginBtn');

            // --- Contact Form Submission (Client-side simulation) ---
            contactForm.addEventListener('submit', async (event) => {
                event.preventDefault(); // Prevent default form submission

                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;

                formStatus.style.display = 'none'; // Hide previous messages

                // Simulate form submission process
                setTimeout(async () => {
                    // In a real application, you would send this data to your backend:
                    // try {
                    //     const response = await fetch('http://localhost:5001/api/contact', {
                    //         method: 'POST',
                    //         headers: { 'Content-Type': 'application/json' },
                    //         body: JSON.stringify({ name, email, message })
                    //     });
                    //     if (response.ok) {
                    //         formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
                    //         formStatus.className = 'form-message success';
                    //         contactForm.reset();
                    //     } else {
                    //         const errorData = await response.json();
                    //         formStatus.textContent = `Error: ${errorData.message || response.statusText}`;
                    //         formStatus.className = 'form-message error';
                    //     }
                    // } catch (error) {
                    //     formStatus.textContent = 'An error occurred. Please try again later.';
                    //     formStatus.className = 'form-message error';
                    //     console.error('Contact form submission error:', error);
                    // }

                    // For this demo, we just simulate success.
                    formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
                    formStatus.className = 'form-message success';
                    formStatus.style.display = 'block';
                    contactForm.reset();

                    // --- Backend Data Demo (using GET as specified) ---
                    // This is a separate demo to show how JS interacts with the specified backend endpoint
                    console.log('Attempting to fetch data from http://localhost:5001/api/data...');
                    try {
                        const backendResponse = await fetch('http://localhost:5001/api/data');
                        if (backendResponse.ok) {
                            const data = await backendResponse.json();
                            console.log('Successfully fetched data from backend:', data);
                            // You could display this data somewhere on the page, e.g.,
                            // alert('Backend Data Received: ' + JSON.stringify(data));
                        } else {
                            console.warn(`Backend responded with status ${backendResponse.status}. Could not fetch data.`);
                            // Optional: Display a message to the user that backend data could not be loaded
                        }
                    } catch (error) {
                        console.error('Failed to connect to backend at http://localhost:5001/api/data. Server might not be running or network error:', error);
                        // This error indicates the server is likely unavailable or a network issue.
                        // The app continues to run without crashing, as required.
                    }

                }, 1000); // Simulate network delay
            });

            // --- Admin Login Button Demo ---
            adminLoginBtn.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent actual navigation
                alert('Admin dashboard functionality would be implemented here. This is a demo link.');
                console.log('Admin login button clicked. Redirecting to a protected admin route would happen here.');
            });
        });