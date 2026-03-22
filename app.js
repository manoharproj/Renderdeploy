
// ===== NovaForge Preview Guard =====
const IS_PREVIEW = window.location.protocol === "about:";
if (IS_PREVIEW) {
  console.warn("Preview mode active: backend calls disabled");
}

document.addEventListener('DOMContentLoaded', () => {
            // --- Data Demo Section ---
            const fetchDataBtn = document.getElementById('fetchDataBtn');
            const getDataResult = document.getElementById('getDataResult');
            const postDataForm = document.getElementById('postDataForm');
            const postDataItemInput = document.getElementById('postDataItem');
            const postDataResult = document.getElementById('postDataResult');

            // The backend URL for the demo
            const backendUrl = 'http://localhost:5001/api/data';

            // Helper function to display messages in data demo sections
            function displayDataMessage(element, message, isError = false) {
                element.innerHTML = message;
                element.style.color = isError ? '#dc3545' : '#28a745'; /* Bootstrap danger/success colors */
                element.style.borderColor = isError ? '#dc3545' : '#28a745';
                element.style.backgroundColor = isError ? '#f8d7da' : '#d4edda';
                element.style.padding = '15px';
                element.style.borderRadius = 'var(--border-radius)';
                element.style.marginTop = '15px';
                element.style.borderStyle = 'solid';
                element.style.borderWidth = '1px';
            }

            // GET Data functionality
            if (fetchDataBtn) {
                fetchDataBtn.addEventListener('click', async () => {
                    getDataResult.innerHTML = 'Attempting to fetch data...';
                    getDataResult.style.color = 'gray';
                    getDataResult.style.borderColor = '#ccc';
                    getDataResult.style.backgroundColor = '#f0f0f0';


                    try {
                        const response = await fetch(backendUrl);

                        if (!response.ok) {
                            // Server responded with an HTTP error status (e.g., 404, 500)
                            const errorText = await response.text();
                            displayDataMessage(getDataResult, 
                                `<strong>Error ${response.status} ${response.statusText}:</strong> Could not fetch data.<br>Backend might be unavailable or returned an error.<br>Server message: ${errorText || 'No specific error message.'}`, 
                                true
                            );
                            return;
                        }

                        // Successfully fetched data
                        const data = await response.json();
                        displayDataMessage(getDataResult, 
                            `<strong>Data fetched successfully:</strong><pre>${JSON.stringify(data, null, 2)}</pre>`
                        );

                    } catch (error) {
                        // Network error (e.g., backend server not running, connection refused)
                        console.error('Network or parsing error for GET:', error);
                        displayDataMessage(getDataResult, 
                            `<strong>Network Error:</strong> Could not connect to the backend server at <code>${backendUrl}</code>.<br>The backend might be unavailable or offline. Error details: ${error.message}`, 
                            true
                        );
                    }
                });
            }

            // POST Data functionality
            if (postDataForm) {
                postDataForm.addEventListener('submit', async (event) => {
                    event.preventDefault(); // Prevent default form submission

                    const itemValue = postDataItemInput.value.trim();
                    if (!itemValue) {
                        displayDataMessage(postDataResult, 'Please enter some data to post.', true);
                        return;
                    }

                    postDataResult.innerHTML = 'Attempting to post data...';
                    postDataResult.style.color = 'gray';
                    postDataResult.style.borderColor = '#ccc';
                    postDataResult.style.backgroundColor = '#f0f0f0';

                    try {
                        const response = await fetch(backendUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ 
                                item: itemValue, 
                                timestamp: new Date().toISOString(),
                                source: 'Vignan Lara College Frontend Demo'
                            }),
                        });

                        if (!response.ok) {
                            // Server responded with an HTTP error status
                            const errorText = await response.text();
                            displayDataMessage(postDataResult, 
                                `<strong>Error ${response.status} ${response.statusText}:</strong> Could not post data.<br>Backend might be unavailable or returned an error.<br>Server message: ${errorText || 'No specific error message.'}`, 
                                true
                            );
                            return;
                        }

                        // Successfully posted data
                        const data = await response.json();
                        displayDataMessage(postDataResult, 
                            `<strong>Data posted successfully:</strong><br>Backend response: <pre>${JSON.stringify(data, null, 2)}</pre>`
                        );
                        postDataItemInput.value = ''; // Clear input field

                    } catch (error) {
                        // Network error
                        console.error('Network or parsing error for POST:', error);
                        displayDataMessage(postDataResult, 
                            `<strong>Network Error:</strong> Could not connect to the backend server at <code>${backendUrl}</code>.<br>The backend might be unavailable or offline. Error details: ${error.message}`, 
                            true
                        );
                    }
                });
            }

            // --- Contact Form Section ---
            const contactForm = document.getElementById('contactForm');
            const contactFormMessage = document.getElementById('contactFormMessage');

            if (contactForm) {
                contactForm.addEventListener('submit', (event) => {
                    event.preventDefault(); // Prevent actual form submission to a backend

                    const name = document.getElementById('name').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const message = document.getElementById('message').value.trim();

                    // Basic client-side validation
                    if (name && email && message) {
                        contactFormMessage.innerHTML = 'Thank you for your message! We have received your inquiry and will get back to you soon.';
                        contactFormMessage.style.color = '#28a745'; /* Success green */
                        contactFormMessage.style.backgroundColor = '#d4edda';
                        contactFormMessage.style.border = '1px solid #28a745';
                        contactFormMessage.style.padding = '15px';
                        contactFormMessage.style.borderRadius = 'var(--border-radius)';
                        contactFormMessage.style.display = 'block'; // Make sure it's visible

                        // Simulate form submission by clearing inputs
                        contactForm.reset();
                    } else {
                        contactFormMessage.innerHTML = 'Please fill in all required fields (Name, Email, and Message) before sending.';
                        contactFormMessage.style.color = '#dc3545'; /* Danger red */
                        contactFormMessage.style.backgroundColor = '#f8d7da';
                        contactFormMessage.style.border = '1px solid #dc3545';
                        contactFormMessage.style.padding = '15px';
                        contactFormMessage.style.borderRadius = 'var(--border-radius)';
                        contactFormMessage.style.display = 'block'; // Make sure it's visible
                    }
                });
            }
        });