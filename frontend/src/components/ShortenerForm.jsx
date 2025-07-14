import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { isValidUrl, isValidShortcode } from '../utils/validators';
import { Log } from 'loggingMiddleware';

function ShortenerForm({ urls, setUrls }) {
  const [inputUrl, setInputUrl] = useState([
    { longUrl: '', validity: '', shortcode: '', error: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...inputUrl];
    updated[index][field] = value;
    if (field === 'longUrl' || field === 'shortcode') {
      updated[index].error = '';
    }
    setInputUrl(updated);
  };

  const addInput = () => {
    if (inputUrl.length < 5) {
      setInputUrl([
        ...inputUrl,
        { longUrl: '', validity: '', shortcode: '', error: '' }
      ]);
    }
  };

  const handleSubmit = async () => {
    const updatedInputs = [...inputUrl];

    for (let i = 0; i < inputUrl.length; i++) {
      const input = inputUrl[i];

      if (!isValidUrl(input.longUrl)) {
        updatedInputs[i].error = 'Invalid URL';
        await Log("frontend", "warn", "component", `Invalid URL entered: ${input.longUrl}`);
        continue;
      }

      if (input.shortcode && !isValidShortcode(input.shortcode)) {
        updatedInputs[i].error = 'Invalid shortcode (alphanumeric only, max 10 chars)';
        await Log("frontend", "warn", "component", `Invalid shortcode entered: ${input.shortcode}`);
        continue;
      }

      const validity = parseInt(input.validity, 10);
      const validityMins = isNaN(validity) || validity <= 0 ? 30 : validity;

      let finalShortcode = input.shortcode || Math.random().toString(36).substring(2, 8);

      while (urls.some((u) => u.shortcode === finalShortcode)) {
        finalShortcode = Math.random().toString(36).substring(2, 8);
      }

      const created = new Date();
      const expiry = new Date(created.getTime() + validityMins * 60000);

      const newUrl = {
        longUrl: input.longUrl,
        shortcode: finalShortcode,
        created: created.toISOString(),
        expiry: expiry.toISOString(),
        clicks: []
      };

      setUrls((prev) => [...prev, newUrl]);
      await Log(
        "frontend",
        "info",
        "component",
        `Shortened URL: ${input.longUrl} to ${finalShortcode} with expiry ${expiry.toISOString()}`
      );

      updatedInputs[i] = { longUrl: '', validity: '', shortcode: '', error: '' };
    }

    setInputUrl(updatedInputs);
  };

  return (
    <Paper style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      {inputUrl.map((input, index) => (
        <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Long URL"
              value={input.longUrl}
              onChange={(e) => handleChange(index, 'longUrl', e.target.value)}
              error={!!input.error && input.error.includes('URL')}
              helperText={input.error && input.error.includes('URL') ? input.error : ' '}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Validity (mins)"
              type="number"
              value={input.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)}
              helperText="Defaults to 30 mins if blank/invalid"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Shortcode (optional)"
              value={input.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
              error={!!input.error && input.error.includes('shortcode')}
              helperText={
                input.error && input.error.includes('shortcode')
                  ? input.error
                  : 'Alphanumeric, max 10 chars'
              }
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addInput} disabled={inputUrl.length >= 5} sx={{ mr: 2 }}>
        Add Another URL
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Shorten URLs
      </Button>
    </Paper>
  );
}

export default ShortenerForm;
