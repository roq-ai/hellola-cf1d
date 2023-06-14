import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Seller Owner'];
  const roles = ['End Customer', 'Seller Owner', 'Buyer Owner'];
  const applicationName = 'HelloLa ';
  const tenantName = 'Marketplace';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Seller Owner:
1. As a Seller Owner, I want to create a Marketplace account so that I can manage my excess inventory auctions.
2. As a Seller Owner, I want to add and manage products in my inventory so that I can create auctions for excess stock.
3. As a Seller Owner, I want to create and manage auctions for my excess inventory so that Buyers can bid on them.
4. As a Seller Owner, I want to view and accept bids from Buyers so that I can sell my excess inventory.
5. As a Seller Owner, I want to invite Buyer Owners to join my Marketplace so that they can participate in my auctions.

Buyer Owner:
1. As a Buyer Owner, I want to create an account so that I can participate in excess inventory auctions.
2. As a Buyer Owner, I want to browse available auctions so that I can find excess inventory to purchase.
3. As a Buyer Owner, I want to place bids on excess inventory auctions so that I can potentially purchase the items.
4. As a Buyer Owner, I want to view the status of my bids so that I can manage my auction participation.

End Customer:
1. As an End Customer, I want to browse available products from the Marketplace so that I can find items to purchase.
2. As an End Customer, I want to create an account so that I can manage my purchases and personal information.
3. As an End Customer, I want to add items to my shopping cart so that I can purchase them.
4. As an End Customer, I want to complete the checkout process so that I can finalize my purchase of excess inventory items.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
