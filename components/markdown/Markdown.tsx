import type { BoxProps } from '@chakra-ui/react';
import {
  Box,
  chakra,
  Code,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { Element } from 'domhandler/lib/node';
import type { HTMLReactParserOptions } from 'html-react-parser';
import parse, { attributesToProps, domToReact } from 'html-react-parser';

type Props = {
  source: string;
} & BoxProps;

const ChakraIframe = chakra('iframe');

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.type === 'tag') {
      const props = attributesToProps(domNode.attribs);

      if (domNode.attribs && domNode.name === 'h1') {
        return (
          <Text as='h1' {...props}>
            {domToReact(domNode.children, options)}
          </Text>
        );
      }
      if (domNode.name === 'h2') {
        return (
          <Heading as='h2' my={{ base: '10' }} {...props}>
            {domToReact(domNode.children, options)}
          </Heading>
        );
      }
      if (domNode.name === 'h3') {
        return (
          <Heading as='h3' my={{ base: '10' }} {...props}>
            {domToReact(domNode.children, options)}
          </Heading>
        );
      }
      if (domNode.name === 'h4') {
        return (
          <Heading as='h4' my={{ base: '10' }} {...props}>
            {domToReact(domNode.children, options)}
          </Heading>
        );
      }

      if (domNode.name === 'h5') {
        return (
          <Heading as='h5' my={{ base: '10' }} {...props}>
            {domToReact(domNode.children, options)}
          </Heading>
        );
      }

      if (domNode.name === 'ul') {
        return (
          <UnorderedList {...props}>
            {domToReact(domNode.children, options)}
          </UnorderedList>
        );
      }

      if (domNode.name === 'ol') {
        return (
          <OrderedList {...props}>
            {domToReact(domNode.children, options)}
          </OrderedList>
        );
      }

      if (domNode.name === 'li') {
        return (
          <ListItem {...props}>
            {domToReact(domNode.children, options)}
          </ListItem>
        );
      }

      if (domNode.name === 'blockquote') {
        return (
          <Box as='blockquote' borderLeft='2px' pl='4' mt='5' {...props}>
            {domToReact(domNode.children, options)}
          </Box>
        );
      }

      if (domNode.name === 'a') {
        return (
          <Link
            isExternal
            textDecoration='underline'
            href={domNode.attribs.href}
            {...props}
          >
            {domToReact(domNode.children, options)}
          </Link>
        );
      }

      if (domNode.name === 'p') {
        return (
          <Text mt='2' {...props}>
            {domToReact(domNode.children, options)}
          </Text>
        );
      }

      if (domNode.name === 'pre') {
        return (
          <Code
            as='pre'
            overflowX='scroll'
            display='block'
            whiteSpace='pre'
            {...props}
            p='4'
            my='5'
          >
            {domToReact(domNode.children, options)}
          </Code>
        );
      }

      if (domNode.name === 'img') {
        // eslint-disable-next-line jsx-a11y/alt-text
        return <chakra.img rounded='md' {...props} />;
      }

      if (domNode.name === 'iframe') {
        return (
          <Box pos='relative' w='full' pt='56.25%'>
            <ChakraIframe
              {...props}
              pos='absolute'
              top='0'
              right='0'
              w='full'
              h='full'
            />
          </Box>
        );
      }
    }
  },
};

export const Markdown = ({ source, ...rest }: Props): JSX.Element => {
  return (
    <Box {...rest} sx={{ '*:first-of-child': { mt: '0' } }}>
      {parse(source, options)}
    </Box>
  );
};
