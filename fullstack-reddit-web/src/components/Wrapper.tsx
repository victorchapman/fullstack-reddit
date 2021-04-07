import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
  varient?: 'small' | 'regular';
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  varient = 'regular',
}) => {
  return (
    <Box
      maxW={varient === 'regular' ? '800px' : '400px'}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};
