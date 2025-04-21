import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ENDPOINT = "http://localhost:5000";

const Chat = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [socket, setSocket] = useState(null);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    if (!userInfo) {
      navigate('/login');
      return;
    }

    // Fetch groups first
    const fetchGroups = async () => {
      try {
        const { data } = await axios.get(`${ENDPOINT}/api/groups`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        });
        setGroups(data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("userInfo");
          navigate('/login');
        }
      }
    };

    fetchGroups();

    // Then connect socket
    const newSocket = io(ENDPOINT, {
      auth: {
        token: userInfo.token,
        user: {
          _id: userInfo._id,
          username: userInfo.username
        }
      },
      transports: ['websocket']
    });

    newSocket.on('connect', () => {
      console.log('Socket connected!');
      setSocket(newSocket);
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [navigate]);

  if (!groups.length) return <div>Loading...</div>;

  return (
    <Flex h="100vh" direction={{ base: "column", md: "row" }}>
      <Box
        w={{ base: "100%", md: "300px" }}
        h={{ base: "auto", md: "100vh" }}
        borderRight="1px solid"
        borderColor="gray.200"
        display={{ base: selectedGroup ? "none" : "block", md: "block" }}
      >
        <Sidebar 
          groups={groups} 
          setSelectedGroup={setSelectedGroup} 
        />
      </Box>
      <Box
        flex="1"
        display={{ base: selectedGroup ? "block" : "none", md: "block" }}
      >
        {socket ? (
           <ChatArea
              selectedGroup={selectedGroup}
              socket={socket}
               setSelectedGroup={setSelectedGroup}
  />
) : (
  <Box>Connecting to socket...</Box>
)}

      </Box>
    </Flex>
  );
};

export default Chat;