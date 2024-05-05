import React from 'react';
import { Typography, Container, Grid, Link } from '@mui/material';
import '../Styles/footer.css'
const Footer = () => {
  return (
    <footer className="footer-container">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} className="footer-section">
            <Typography variant="h6" gutterBottom className="footer-heading">
              Company Name
            </Typography>
            <Typography variant="body2" color="textSecondary">
              A short description about the company.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} className="footer-section">
            <Typography variant="h6" gutterBottom className="footer-heading">
              Quick Links
            </Typography>
            <div className="footer-links">
              <Link href="#" color="inherit" className="footer-link">Home</Link>
              <Link href="#" color="inherit" className="footer-link">Products</Link>
              <Link href="#" color="inherit" className="footer-link">About Us</Link>
              <Link href="#" color="inherit" className="footer-link">Contact Us</Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className="footer-section">
            <Typography variant="h6" gutterBottom className="footer-heading">
              Contact Information
            </Typography>
            <div className="footer-contact">
              <Typography variant="body2" color="textSecondary" className="footer-contact-item">
                Address: 123 Street, City, Country
              </Typography>
              <Typography variant="body2" color="textSecondary" className="footer-contact-item">
                Phone: +1234567890
              </Typography>
              <Typography variant="body2" color="textSecondary" className="footer-contact-item">
                Email: info@example.com
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
