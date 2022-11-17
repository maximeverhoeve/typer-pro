import { Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

const MultiplayerIcon: React.FC<Partial<IconProps>> = ({ ...props }) => {
  return (
    <Icon width="139" height="119" fill="none" viewBox="0 0 139 119" {...props}>
      <circle
        cx="69.9"
        cy="25.095"
        r="24.095"
        stroke="currentColor"
        strokeWidth="2"
      ></circle>
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M44.236 102.417l25.26-43.75 25.259 43.75H44.236z"
      ></path>
      <circle
        cx="117.117"
        cy="27.298"
        r="16.584"
        stroke="currentColor"
        strokeWidth="2"
      ></circle>
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M99.653 81.176l17.18-29.756 17.181 29.756h-34.36z"
      ></path>
      <circle
        cx="22.403"
        cy="27.298"
        r="16.584"
        stroke="currentColor"
        strokeWidth="2"
      ></circle>
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M4.939 81.176l17.18-29.756L39.3 81.176H4.94z"
      ></path>
    </Icon>
  );
};

export default MultiplayerIcon;
