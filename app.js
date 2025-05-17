// Initialize Supabase client
const supabaseUrl = '__SUPABASE_URL__'
const supabaseKey = '__SUPABASE_KEY__'

// Debug logging
console.log('Debug - Supabase Values:', {
    url: supabaseUrl,
    key: supabaseKey,
    isUrlPlaceholder: supabaseUrl === '__SUPABASE_URL__',
    isKeyPlaceholder: supabaseKey === '__SUPABASE_KEY__'
})

// Only initialize if we have real values
if (supabaseUrl === '__SUPABASE_URL__' || supabaseKey === '__SUPABASE_KEY__') {
    console.error('Error: Supabase credentials not properly replaced')
} else {
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

    // Get form element
    const loginForm = document.getElementById('loginForm')
    const messageDiv = document.getElementById('message')

    // Handle form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        
        try {
            messageDiv.textContent = 'Logging in...'
            messageDiv.style.color = '#666'
            
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    throw new Error('Email or password is incorrect. Please try again.')
                } else if (error.message.includes('Email not confirmed')) {
                    throw new Error('Please verify your email address before logging in.')
                } else {
                    throw new Error('Login failed. Please try again later.')
                }
            }

            messageDiv.textContent = 'You are now signed in!'
            messageDiv.style.color = 'green'
            
            // Redirect to dashboard after successful login
            setTimeout(() => {
                window.location.href = 'dashboard.html'
            }, 1000)
            
        } catch (error) {
            messageDiv.textContent = error.message
            messageDiv.style.color = '#dc3545'  // Bootstrap-like red color
        }
    })
} 