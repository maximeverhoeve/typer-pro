import React from 'react';
import { Grid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MultiplayerIcon from '../assets/icons/multiplayer';
import SingleplayerIcon from '../assets/icons/singleplayer';
import LinkBox from '../components/home/LinkBox';

const Home: React.FC = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gridGap="4">
      <Link to="/singleplayer">
        <LinkBox icon={<SingleplayerIcon />}>singleplayer</LinkBox>
      </Link>
      <Link to="/multiplayer">
        <LinkBox delay={0.1} hoverColor="secondary" icon={<MultiplayerIcon />}>
          multiplayer
        </LinkBox>
      </Link>
    </Grid>
  );
};

export default Home;
