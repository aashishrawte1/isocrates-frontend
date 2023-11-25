// polyfills.ts

// Add global to window, assigning the value of window itself.
(window as any).global = window;

// Polyfills for features used by Angular and other dependencies.
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

// Import crypto-browserify as a polyfill for the crypto module.
import 'crypto-browserify';
