import React from 'react';
import Typography from '../Typography/Typography';

const BrandStory = () => (
  <>
    <Typography color="bold" variant="h6" align="center" gutter="2rem 1rem">
      Gratify's User Story
    </Typography>
    <Typography style={{ padding: '2rem 1rem 0' }}>
      Gratify is a new intuitive payment system that makes it easier to checkout
      using 1 click payments. With over 300,000 users at launch Gratify has
      positioned itself at the top of the payment system market. The platform
      allows you to create an account using social media profiles making the app
      easy to use. Most users spend 2 minutes on set up.
    </Typography>
    <Typography style={{ padding: '1rem' }}>
      The target market is anyone who uses payment systems in their day to day
      to purchase products. Similar customers use PayPal, Cashapp and Venmo.
    </Typography>
    <ul>
      <li>Serves 300,000 costumers</li>
      <li>Has 2 Million downloads on Adnroid and IOS</li>
      <li>Facilitates Purchases with a 1 click process</li>
      <li>Ensures security through Theft and Fraud protection</li>
    </ul>
  </>
);

export default BrandStory;
