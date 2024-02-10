import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import ThreeSuspense from '../components/ThreeSuspense';
import Player from '../components/Player';
import useMultiplayerStore from '../../../store/useMultiplayerStore';
import { useSocket } from '../../../hooks/useSocket';
import { Html } from '@react-three/drei';
import { Box } from '@chakra-ui/react';
import { Player as PlayerType } from '../../../types/socketTypes';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

const ThreePreGameLobby: React.FC = () => {
  const { socket } = useSocket();
  const players = useMultiplayerStore((state) => state.players);

  /** Sort players so the current player is the first one */
  const sortedPlayers = players.sort((a, b) => {
    // Compare function
    return a.id === socket.id ? -1 : b.id === socket.id ? 1 : 0;
  });
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 5.5);
    camera.lookAt(new Vector3(0, 0, 0));
  }, []);

  const calculatePlayerX = (count: number): number => {
    if (count % 2 === 0) {
      return (count / 2 - 0.5) * 1.5;
    }
    return -(count / 2) * 1.5;
  };

  const getBoxColor = (player: PlayerType): string => {
    if (player.isLoaded) return '#DD6B20';
    if (player.isReady) return '#276749';
    return '#9B2C2C';
  };

  return (
    <ThreeSuspense>
      <group>
        <directionalLight
          position={[0, 10, 0.4]}
          intensity={0.3}
          castShadow
          shadow-mapSize={[512, 512]}
          shadow-camera-near={1}
          shadow-camera-far={20}
          shadow-camera-top={20}
          shadow-camera-right={20}
          shadow-camera-bottom={-20}
          shadow-camera-left={-20}
        />
        {sortedPlayers.map((player, index) => {
          return (
            <group
              key={player.id}
              position={[calculatePlayerX(index + 1) + 0.5, 0, -(index * 2)]}
            >
              <Html position={[-0.1, 0.75, 0]} center transform scale={0.2}>
                <Box
                  p="3"
                  bg={getBoxColor(player)}
                  color="white"
                  px="10"
                  position="relative"
                  fontWeight="700"
                  fontSize="20px"
                  transition="0.2s"
                >
                  <p>{player.nickname}</p>
                  <Box
                    position="absolute"
                    w="8px"
                    h="8px"
                    transformOrigin="center"
                    transform="rotate(45deg)  translate(-50%, 50%)"
                    left="50%"
                    bottom="-4px"
                    bg={getBoxColor(player)}
                    transition="0.2s"
                  />
                </Box>
              </Html>
              <Player color={player.color || '#6d1acc'} />
            </group>
          );
        })}
      </group>
    </ThreeSuspense>
  );
};

export default ThreePreGameLobby;
