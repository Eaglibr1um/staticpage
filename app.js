// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

// Get form element
const loginForm = document.getElementById('loginForm')
const messageDiv = document.getElementById('message')

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) throw error

        messageDiv.textContent = 'Login successful!'
        messageDiv.style.color = 'green'
        
        // You can redirect to another page after successful login
        // window.location.href = '/dashboard.html'
        
    } catch (error) {
        messageDiv.textContent = error.message
        messageDiv.style.color = 'red'
    }
}) 