// server/index.js

const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = 5000;

app.use(express.json());

// Generate Zoom Access Token using Server-to-Server OAuth
async function getZoomAccessToken() {
  const response = await axios.post(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
    {},
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
          ).toString('base64'),
      },
    }
  );

  return response.data.access_token;
}

// API route to create a Zoom meeting
app.post('/api/create-meeting', async (req, res) => {
  try {
    const accessToken = await getZoomAccessToken();

    const meetingResponse = await axios.post(
      `https://api.zoom.us/v2/users/me/meetings`,
      {
        topic: req.body.topic || 'MentorWise Session',
        type: 1, // Instant meeting
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(meetingResponse.data);
  } catch (error) {
    console.error('Zoom meeting creation failed:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create Zoom meeting' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
