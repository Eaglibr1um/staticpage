// Initialize Supabase client
const supabaseUrl = '__SUPABASE_URL__'
const supabaseKey = '__SUPABASE_KEY__'
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

        messageDiv.textContent = 'You are now signed in!'
        messageDiv.style.color = 'green'
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
            window.location.href = 'dashboard.html'
        }, 1000)
        
    } catch (error) {
        messageDiv.textContent = error.message
        messageDiv.style.color = 'red'
    }
}) 