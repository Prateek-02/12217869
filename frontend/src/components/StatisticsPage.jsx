import React, { useEffect } from 'react'
import { Paper, Typography, Link } from '@mui/material';
import { Log } from 'loggingMiddleware';

function StatisticsPage({ urls }) {
    useEffect(() => {
        Log("frontend", "info", "component", "StatisticsPage loaded");
    }, []);

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>All Shortened URLs</Typography>
            {urls.length === 0 && <Typography>No URLs shortened yet.</Typography>}
            {urls.map((url, idx) => (
                <Paper key={idx} sx={{ p: 1, mb: 1 }}>
                    <Typography>Short: <Link href={`/${url.shortcode}`}>{window.location.origin}/{url.shortcode}</Link></Typography>
                    <Typography>Original: {url.longUrl}</Typography>
                    <Typography>Created: {new Date(url.created).toLocaleString()}</Typography>
                    <Typography>Expires: {new Date(url.expiry).toLocaleString()}</Typography>
                    <Typography>Clicks: {url.clicks.length}</Typography>
                    {url.clicks.map((click, index) => (
                        <Typography key={index} variant="body2">
                            - {click.timestamp} | Source: {click.referrer} | Location: {click.location}
                        </Typography>
                    ))}
                </Paper>
            ))}
        </Paper>
    )
}

export default StatisticsPage
