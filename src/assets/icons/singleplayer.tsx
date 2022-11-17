import { Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

const SingleplayerIcon: React.FC<Partial<IconProps>> = ({ ...props }) => {
  return (
    <Icon width="63" height="121" fill="none" viewBox="0 0 63 121" {...props}>
      <circle
        cx="31.909"
        cy="25.727"
        r="24.364"
        stroke="currentColor"
        strokeWidth="2"
      ></circle>
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M5.952 103.886L31.5 59.636l25.548 44.25H5.952z"
      ></path>
    </Icon>
  );
};

export default SingleplayerIcon;
