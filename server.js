import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/:id', async (req, res) => {
  const formData = new FormData();
  formData.append('post', req.params.id);
  formData.append('action', 'doo_player_ajax');
  formData.append('type', 'movie');
  formData.append('nume', 'streamaly');

  try {
    const response = await axios.post('https://bonkumovies.com/wp-admin/admin-ajax.php', formData);
    const data = response.data; // Get the response data directly

    res.json(data); // Send the external API response back to your frontend
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
