import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import { supabase } from './supabaseClient';

function LoginPage() { // Removed onLoginSuccess from props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Supabase uses email for login by default
    const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
      email: email, // Using the email state
      password: password,
    });

    setIsLoading(false);

    if (supabaseError) {
      console.error('Error logging in:', supabaseError);
      setError(supabaseError.message);
      toast({
        title: "Login Failed",
        description: supabaseError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (data.user) {
      console.log('Login successful:', data.user);
      toast({
        title: "Login Successful",
        description: "You've been logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // onLoginSuccess(data.session) // App.js now relies on onAuthStateChange
    } else {
      // Handle cases where there's no error but also no user data
      const unknownError = "An unexpected error occurred. Please try again.";
      setError(unknownError);
      toast({
        title: "Login Failed",
        description: unknownError,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box
        p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg="white"
        >
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          {error && (
            <Alert status="error" my={4}>
              <AlertIcon />
              <AlertTitle mr={2}>Login Failed!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel> {/* Changed from Username or Email */}
                <Input
                  type="email" // Changed type to email
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button width="full" mt={4} type="submit" colorScheme="teal" isLoading={isLoading}>
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
  );
}

export default LoginPage;
