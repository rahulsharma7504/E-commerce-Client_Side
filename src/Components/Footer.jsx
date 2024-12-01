import React from 'react';
import { Box, Container, Grid, Text, Link, Input, Button, Stack, HStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import '../Styles/footer.css';

const Footer = () => {
  return (
    <Box as="footer" className="footer-container" bg="gray.800" color="white" py={2}>
      <Container maxW="container.lg">
        <Grid templateColumns="repeat(1, 1fr)" gap={6} md="repeat(4, 1fr)">
          {/* Company Info */}
          <Box className="footer-section">
            <Text fontSize="xl" fontWeight="bold" mb={2} className="footer-heading">
              E-Shop
            </Text>
            <Text fontSize="md" color="gray.400" mb={4}>
              Your one-stop shop for all things fashion, electronics, home goods, and more!
            </Text>
            <Text fontSize="md" color="gray.400">
              &copy; 2024 E-Shop, All rights reserved.
            </Text>
          </Box>

          {/* Quick Links */}
          <Box className="footer-section">
            <Text fontSize="xl" fontWeight="bold" mb={2} className="footer-heading">
              Quick Links
            </Text>
            <Box className="footer-links">
              <Link href="#" color="inherit" className="footer-link" display="block" mb={1}>
                Home
              </Link>
              <Link href="#" color="inherit" className="footer-link" display="block" mb={1}>
                Shop Now
              </Link>
              <Link href="#" color="inherit" className="footer-link" display="block" mb={1}>
                Offers
              </Link>
              <Link href="#" color="inherit" className="footer-link" display="block" mb={1}>
                About Us
              </Link>
              <Link href="#" color="inherit" className="footer-link" display="block" mb={1}>
                Contact Us
              </Link>
              <Link href="#" color="inherit" className="footer-link" display="block" mb={1}>
                FAQs
              </Link>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box className="footer-section">
            <Text fontSize="xl" fontWeight="bold" mb={2} className="footer-heading">
              Contact Information
            </Text>
            <Box className="footer-contact">
              <Text fontSize="md" color="gray.400" mb={1} className="footer-contact-item">
                Address: 456 Shopping St, Commerce City, USA
              </Text>
              <Text fontSize="md" color="gray.400" mb={1} className="footer-contact-item">
                Phone: +1 (800) 123-4567
              </Text>
              <Text fontSize="md" color="gray.400" mb={1} className="footer-contact-item">
                Email: support@eshop.com
              </Text>
            </Box>
          </Box>

          {/* Social Media Links */}
          <Box className="footer-section">
            <Text fontSize="xl" fontWeight="bold" mb={2} className="footer-heading">
              Follow Us
            </Text>
            <HStack spacing={4}>
              <Link href="https://www.facebook.com" isExternal>
                <FontAwesomeIcon icon={faFacebook} size="2x" color="gray.400" />
              </Link>
              <Link href="https://www.twitter.com" isExternal>
                <FontAwesomeIcon icon={faTwitter} size="2x" color="gray.400" />
              </Link>
              <Link href="https://www.instagram.com" isExternal>
                <FontAwesomeIcon icon={faInstagram} size="2x" color="gray.400" />
              </Link>
              <Link href="https://www.youtube.com" isExternal>
                <FontAwesomeIcon icon={faYoutube} size="2x" color="gray.400" />
              </Link>
            </HStack>
          </Box>
        </Grid>

        {/* Newsletter Subscription */}
        <Box mt={6} textAlign="center">
          <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.400">
            Subscribe to Our Newsletter
          </Text>
          <Text fontSize="md" color="gray.500" mb={4}>
            Get the latest updates, new arrivals, and exclusive offers straight to your inbox!
          </Text>
          <Stack direction="row" spacing={2} justify="center">
            <Input
              placeholder="Enter your email"
              bg="white"
              color="gray.800"
              borderColor="gray.600"
              borderWidth={1}
              _hover={{ borderColor: 'gray.400' }}
            />
            <Button colorScheme="blue" size="md">
              Subscribe
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
