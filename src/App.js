import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { ChakraProvider, extendTheme, Flex, Spinner } from '@chakra-ui/react'; // Removed Box, Heading, Text, Button as they are now in DashboardPage
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage'; // Import DashboardPage
import { supabase } from './supabaseClient';
import './App.css';

// Define global styles, including ensuring body and root take full height
const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        height: '100%',
        margin: 0,
        padding: 0,
      },
      body: {
        backgroundColor: 'gray.50', // Optional: Set a background color for the whole page
      }
    },
  },
});

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      // Prevent memory leaks, ensure listener is cleaned up
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      } else if (authListener && authListener.subscription) { // V2 Supabase SDK
         authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      // Session will be set to null by onAuthStateChange
    }
  };
  
  if (loading) {
    return (
      <ChakraProvider theme={theme}>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      {!session ? (
        <LoginPage onLoginSuccess={(userSession) => setSession(userSession)} />
      ) : (
        <Flex height="100vh" alignItems="center" justifyContent="center" direction="column">
          <Box textAlign="center">
            <Heading>Welcome!</Heading>
            <Text>You are logged in as: {session.user.email}</Text>
            <Button mt={4} colorScheme="teal" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Flex>
      )}
    </ChakraProvider>
  );
}

export default App;
