// B5: HEALTH CHECK ENDPOINT FOR EXPRESS.JS BACKEND
// Add this to your Express app (server/app.js or server/src/app.js)
// This endpoint is used by CI/CD and monitoring systems

const express = require('express');
const os = require('os');
const packageJson = require('../package.json');

// Health check route
router.get('/api/health', (req, res) => {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    const healthStatus = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Math.round(uptime),
        version: packageJson.version || '1.0.0',
        environment: process.env.NODE_ENV || 'unknown',
        server: {
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch()
        },
        process: {
            pid: process.pid,
            memory: {
                heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + ' MB',
                heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + ' MB',
                external: Math.round(memoryUsage.external / 1024 / 1024) + ' MB'
            },
            cpu: {
                user: cpuUsage.user,
                system: cpuUsage.system
            }
        },
        services: {
            database: 'checking...',
            redis: 'checking...'
        }
    };
    
    // Check database connection
    if (global.mongoConnected) {
        healthStatus.services.database = 'connected';
    } else {
        healthStatus.services.database = 'disconnected';
    }
    
    res.status(200).json(healthStatus);
});

// Liveness probe (for Kubernetes-style health checks)
router.get('/health/live', (req, res) => {
    res.status(200).json({ status: 'alive' });
});

// Readiness probe (ready to serve requests)
router.get('/health/ready', (req, res) => {
    const isReady = global.mongoConnected; // Add your readiness checks
    
    if (isReady) {
        res.status(200).json({ status: 'ready', ready: true });
    } else {
        res.status(503).json({ status: 'not-ready', ready: false });
    }
});

module.exports = router;
