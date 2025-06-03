import React from 'react';
import { Box, Button, Heading, Text, Flex } from '@chakra-ui/react';

function DashboardPage({ user, onLogout }) {
  if (!user) {
    // This case should ideally not be reached if App.js correctly manages session
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Text>Loading user data or not logged in...</Text>
      </Flex>
    );
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" direction="column">
      <Box textAlign="center" p={8} borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
        <Heading mb={4}>Dashboard</Heading>
        <Text fontSize="xl" mb={6}>
          Welcome, {user.email}!
        </Text>
        <Button colorScheme="teal" onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
}

export default DashboardPage;
