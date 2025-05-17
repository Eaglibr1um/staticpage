// Initialize Supabase client
const supabaseUrl = 'SUPABASE_URL'
const supabaseKey = 'SUPABASE_KEY'
const supabase = window.supabase.createClient('SUPABASE_URL', 'SUPABASE_KEY')

// Check if user is authenticated
async function checkAuth() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
        window.location.href = 'index.html'
        return
    }
    return user
}

// Update UI with user info
async function updateUI() {
    const user = await checkAuth()
    if (user) {
        document.getElementById('userEmail').textContent = user.email
    }
}

// Set current date
function setCurrentDate() {
    const date = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    document.getElementById('currentDate').textContent = date.toLocaleDateString('en-US', options)
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
        window.location.href = 'index.html'
    }
})

// Initialize dashboard
async function initDashboard() {
    await updateUI()
    setCurrentDate()
}

// Run initialization
initDashboard() 