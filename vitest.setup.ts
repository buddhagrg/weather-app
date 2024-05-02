import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// clear jsdom after each test case
afterEach(() => {
    cleanup();
});