/**
 * Health Check Endpoint (B5)
 * Add this route to your Express.js server
 * GET /api/health
 * Returns: { status: "ok", uptime, timestamp, version }
 */

const express = require('express');
const router = express.Router();

// Application start time
const startTime = Date.now();

// Get version from package.json
let version = '1.0.0';
try {
  const packageJson = require('../../package.json');
  version = packageJson.version || version;
} catch (e) {
  // Use default version if package.json not found
}

// Health check endpoint
router.get('/health', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const uptimeFormatted = formatUptime(uptimeSeconds);

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: uptimeFormatted,
    uptime_seconds: uptimeSeconds,
    version: version,
    services: {
      server: 'running',
      mongodb: process.env.MONGODB_URI ? 'configured' : 'not configured'
    }
  });
});

// Detailed health check with MongoDB connectivity test
router.get('/health/detailed', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: version,
    uptime_seconds: Math.floor((Date.now() - startTime) / 1000),
    checks: {}
  };

  // Check MongoDB connection
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      health.checks.mongodb = { status: 'connected', state: 'ready' };
    } else {
      health.checks.mongodb = { status: 'disconnected', state: mongoose.connection.readyState };
      health.status = 'degraded';
    }
  } catch (e) {
    health.checks.mongodb = { status: 'error', message: e.message };
    health.status = 'degraded';
  }

  // Check memory usage
  const memoryUsage = process.memoryUsage();
  health.checks.memory = {
    rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`
  };

  // Check environment
  health.checks.environment = {
    node_version: process.version,
    env: process.env.NODE_ENV || 'development'
  };

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});

// Helper function to format uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
}

module.exports = router;