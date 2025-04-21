import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Flex,
  VStack,
  HStack,
  Badge,
  Input,
  Image,
  Link
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  FiMessageSquare,
  FiUsers,
  FiLock,
  FiLogIn,
  FiLogOut,
  FiUserPlus,
  FiGlobe,
  FiActivity,
  FiCheckCircle,
  FiUserCheck,
} from "react-icons/fi";

const Feature = ({ title, text, icon, badges = [] }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      rounded="xl"
      p={6}
      spacing={4}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "lg",
        borderColor: useColorModeValue("blue.300", "blue.500")
      }}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      height="100%"
    >
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="xl"
        bgGradient="linear(to-br, blue.400, blue.600)"
        boxShadow="md"
      >
        {icon}
      </Flex>
      <Box>
        <HStack spacing={2} mb={2}>
          <Text fontWeight={600} fontSize="lg">
            {title}
          </Text>
          {badges.map((badge, index) => (
            <Badge
              key={index}
              colorScheme={badge.color}
              variant="subtle"
              rounded="full"
              px={2}
              fontSize="0.7em"
            >
              {badge.text}
            </Badge>
          ))}
        </HStack>
        <Text color={useColorModeValue("gray.600", "gray.300")} fontSize="md">
          {text}
        </Text>
      </Box>
    </Stack>
  );
};

const ChatMessage = ({ message, sender, time, isUser }) => {
  return (
    <Flex justify={isUser ? "flex-end" : "flex-start"} w="100%">
      <Box
        bg={isUser ? "linear-gradient(to bottom right, blue.500, blue.600)" : "gray.100"}
        color={isUser ? "white" : "gray.800"}
        borderRadius="xl"
        px={4}
        py={2}
        maxW="80%"
        boxShadow={isUser ? "md" : "sm"}
      >
        <Text fontSize="sm" fontWeight="bold" mb={1}>
          {sender}
        </Text>
        <Text>{message}</Text>
        <Text
          fontSize="xs"
          color={isUser ? "whiteAlpha.700" : "gray.500"}
          mt={1}
          textAlign={isUser ? "right" : "left"}
        >
          {time}
        </Text>
      </Box>
    </Flex>
  );
};

export default function LandingPage() {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      {/* Hero Section */}
      <Container maxW="7xl" pt={10}>
        <Stack
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 16, md: 24 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 8 }}>
            <Box position="relative" display="inline-block">
              <Heading
                lineHeight={1.1}
                fontWeight={700}
                fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
                bgGradient="linear(to-r, blue.400, blue.600)"
                bgClip="text"
              >
                PingMe
              </Heading>
              <Text
                as="span"
                display="block"
                fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
                fontWeight={600}
                color={useColorModeValue("gray.700", "gray.300")}
              >
                The Chat App
              </Text>
            </Box>
            <Text 
              color={useColorModeValue("gray.600", "gray.400")} 
              fontSize={{ base: "lg", md: "xl" }}
              maxW="2xl"
            >
              Experience seamless group communication with our secure, real-time chat platform. 
              Designed for teams that value productivity and connection.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                as={RouterLink}
                to="/register"
                rounded="full"
                size="lg"
                fontWeight="semibold"
                px={8}
                colorScheme="blue"
                bgGradient="linear(to-r, blue.400, blue.500)"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, blue.600)",
                  transform: "translateY(-2px)",
                  boxShadow: "lg"
                }}
                _active={{
                  transform: "translateY(0)"
                }}
                leftIcon={<FiUserPlus />}
                boxShadow="md"
              >
                Get Started
              </Button>
              <Button
                as={RouterLink}
                to="/login"
                rounded="full"
                size="lg"
                fontWeight="semibold"
                px={8}
                variant="outline"
                colorScheme="blue"
                leftIcon={<FiLogIn />}
                _hover={{
                  bg: useColorModeValue("blue.50", "gray.700"),
                  transform: "translateY(-2px)",
                  boxShadow: "md"
                }}
                _active={{
                  transform: "translateY(0)"
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Stack>

          {/* Chat Preview */}
          <Flex
            flex={1}
            justify="center"
            align="center"
            position="relative"
            w="full"
          >
            <Box
              position="relative"
              height="500px"
              rounded="2xl"
              boxShadow="2xl"
              width="full"
              maxW="md"
              overflow="hidden"
              bg={useColorModeValue("white", "gray.800")}
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {/* Chat Header */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bgGradient="linear(to-r, blue.500, blue.600)"
                p={4}
                color="white"
                borderBottom="1px"
                borderColor="blue.600"
              >
                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiUsers} />
                    <Text fontWeight="bold">Team ActionHub</Text>
                  </HStack>
                  <HStack spacing={4}>
                    <Badge 
                      colorScheme="green" 
                      variant="solid"
                      rounded="full"
                      px={2}
                    >
                      3 online
                    </Badge>
                  </HStack>
                </HStack>
              </Box>

              {/* Chat Messages */}
              <VStack
                spacing={4}
                p={4}
                pt="60px"
                h="calc(100% - 120px)"
                overflowY="auto"
                bg={useColorModeValue("gray.50", "gray.700")}
              >
                <ChatMessage
                  sender="Sarah Chen"
                  message="Hey team! Just pushed the new updates to staging."
                  time="10:30 AM"
                  isUser={false}
                />
                <ChatMessage
                  sender="Alex Thompson"
                  message="Great work! The new features look amazing 🚀"
                  time="10:31 AM"
                  isUser={false}
                />
                <ChatMessage
                  sender="You"
                  message="Thanks! Let's review it in our next standup."
                  time="10:32 AM"
                  isUser={false}
                />
                <Box w="100%" textAlign="center">
                  <Badge 
                    colorScheme="gray" 
                    fontSize="xs"
                    px={3}
                    py={1}
                    rounded="full"
                  >
                    Sarah is typing...
                  </Badge>
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Stack>

        {/* Features Grid */}
        <Box py={20}>
          <VStack spacing={2} textAlign="center" mb={12}>
            <Heading 
              fontSize="4xl" 
              fontWeight="700"
              bgGradient="linear(to-r, blue.400, blue.600)"
              bgClip="text"
            >
              Powerful Features
            </Heading>
            <Text 
              fontSize="lg" 
              color={useColorModeValue("gray.600", "gray.400")}
              maxW="2xl"
              mx="auto"
            >
              Everything you need for seamless team collaboration and communication
            </Text>
          </VStack>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            px={{ base: 4, md: 8 }}
          >
            <Feature
              icon={<Icon as={FiLock} w={6} h={6} />}
              title="Secure Authentication"
              badges={[{ text: "Secure", color: "green" }]}
              text="Enterprise-grade security with encrypted passwords and JWT token authentication."
            />
            <Feature
              icon={<Icon as={FiUsers} w={6} h={6} />}
              title="Group Management"
              badges={[{ text: "Real-time", color: "blue" }]}
              text="Create and manage multiple groups with granular permissions and member controls."
            />
            <Feature
              icon={<Icon as={FiUserCheck} w={6} h={6} />}
              title="Online Presence"
              badges={[{ text: "Live", color: "green" }]}
              text="Real-time user status indicators so you know who's available right now."
            />
            <Feature
              icon={<Icon as={FiActivity} w={6} h={6} />}
              title="Typing Indicators"
              badges={[{ text: "Interactive", color: "purple" }]}
              text="Visual feedback when others are composing messages in your conversations."
            />
            <Feature
              icon={<Icon as={FiMessageSquare} w={6} h={6} />}
              title="Instant Messaging"
              badges={[{ text: "Fast", color: "orange" }]}
              text="Lightning-fast message delivery with WebSocket technology for real-time updates."
            />
            <Feature
              icon={<Icon as={FiGlobe} w={6} h={6} />}
              title="Global Access"
              badges={[{ text: "24/7", color: "blue" }]}
              text="Access your conversations from anywhere in the world on any device."
            />
          </SimpleGrid>
        </Box>

        {/* Call to Action */}
        <Box py={20}>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={8}
            align="center"
            justify="center"
            bg={useColorModeValue("white", "gray.800")}
            p={10}
            rounded="2xl"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            boxShadow="xl"
          >
            <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
              <Heading size="lg" fontWeight="700">
                Ready to transform your team communication?
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.400")} fontSize="lg">
                Join thousands of professionals already using PingMe
              </Text>
            </VStack>
            <Button
              as={RouterLink}
              to="/register"
              size="lg"
              colorScheme="blue"
              rightIcon={<FiUserPlus />}
              bgGradient="linear(to-r, blue.400, blue.500)"
              _hover={{
                bgGradient: "linear(to-r, blue.500, blue.600)",
                transform: "translateY(-2px)",
                boxShadow: "lg"
              }}
              _active={{
                transform: "translateY(0)"
              }}
              boxShadow="md"
            >
              Create Free Account
            </Button>
          </Stack>
        </Box>

        {/* Footer with attribution */}
        <Box py={10} textAlign="center">
          <Text 
            color={useColorModeValue("gray.600", "gray.400")}
            fontSize="sm"
          >
            Made with ❤️ by <Link 
              href="https://github.com/akshayaa" 
              isExternal
              color="blue.500"
              fontWeight="600"
            >Akshayaa</Link>, a passionate techie student
          </Text>
        </Box>
      </Container>
    </Box>
  );
}