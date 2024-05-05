import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './src/mocks/server';
import { setupGeoLocation } from './src/utils/setup-geolocation';

// setupGeoLocation({ error: null });

beforeAll(() => {
    server.listen();
});

// clear jsdom after each test case
afterEach(() => {
    cleanup();
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});