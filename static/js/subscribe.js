async function handleSubscribe(event) {
    event.preventDefault();
    
    const form = document.getElementById('subscribe-form');
    const email = document.getElementById('subscribe-email').value;
    const message = document.getElementById('subscribe-message');
    const button = form.querySelector('button');
    
    // Validate email
    if (!email || !email.includes('@')) {
        message.textContent = 'Please enter a valid email address';
        message.className = 'subscribe-message error';
        return;
    }
    
    // Show loading state
    button.classList.add('loading');
    message.textContent = '';
    
    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            message.textContent = 'Thanks for subscribing!';
            message.className = 'subscribe-message success';
            form.reset();
        } else {
            throw new Error(data.message || 'Subscription failed');
        }
    } catch (error) {
        message.textContent = error.message || 'Something went wrong. Please try again.';
        message.className = 'subscribe-message error';
    } finally {
        button.classList.remove('loading');
    }
}
