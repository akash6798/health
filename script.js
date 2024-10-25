document.getElementById('donation-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const amount = document.getElementById('amount').value;

    // Initialize Stripe
    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace with your Stripe public key

    // Create a payment intent on your server (this is a placeholder for server-side logic)
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency: 'usd', name, email }),
    });

    const { clientSecret } = await response.json();

    // Redirect to the Stripe checkout page
    const { error } = await stripe.redirectToCheckout({ clientSecret });

    if (error) {
        document.getElementById('message').innerText = error.message;
    } else {
        document.getElementById('message').innerText = `Thank you, ${name}! Your donation of $${amount} is being processed.`;
    }

    // Reset the form after submission
    this.reset();
});
