# Lunch Order App - Test Suite

A comprehensive test suite for the Lunch Order App built with Playwright.

## 📁 Test Structure

```
tests/
├── accessibility/          # Accessibility and keyboard navigation tests
├── fixtures/               # Test data and mock responses
├── integration/            # Main functional tests
├── performance/            # Performance and load tests
├── unit/                   # Unit tests (if needed)
├── playwright.config.ts    # Playwright configuration
└── README.md              # This file
```

## 🧪 Test Categories

### Integration Tests

**Happy Path (`integration/happy-path.spec.ts`)**
- Application loading and initial state
- Form submission with valid data
- Navigation between views
- Dashboard data display
- Date field functionality

**Validation (`integration/validation.spec.ts`)**
- Required field validation
- Special character handling
- Long text input handling
- Unicode character support
- Form clearing behavior
- Date field validation

**Responsive Design (`integration/responsive-design.spec.ts`)**
- Desktop layouts (1920x1080, 1366x768)
- Tablet layouts (768x1024)
- Mobile layouts (375x667, 320x568)
- Touch target sizing
- Content overflow handling
- Zoom and orientation changes

**Error Handling (`integration/error-handling.spec.ts`)**
- PocketBase connection failures
- Network interruptions
- Slow network responses
- Malformed API responses
- HTTP error codes (400, 401, 403, 404, 500, etc.)
- JavaScript errors
- Browser navigation edge cases
- Page reloads
- Rapid user interactions

### Accessibility Tests

**Keyboard Navigation (`accessibility/keyboard-navigation.spec.ts`)**
- Tab order and focus management
- Keyboard shortcuts
- ARIA attributes and roles
- Screen reader announcements
- Focus indicators
- Heading structure
- Color contrast (basic checks)

### Performance Tests

**Load Tests (`performance/load-tests.spec.ts`)**
- Initial page load times
- Rapid form submissions
- Memory leak detection
- Large data handling
- Auto-refresh performance
- Concurrent operations
- UI responsiveness under load
- Resource constraint handling

## 🚀 Running Tests

### Prerequisites

```bash
# Install dependencies (if not already installed)
npm install

# Install Playwright browsers
npx playwright install
```

### Run All Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in UI mode (interactive)
npx playwright test --ui
```

### Run Specific Test Categories

```bash
# Integration tests only
npx playwright test tests/integration

# Accessibility tests only
npx playwright test tests/accessibility

# Performance tests only
npx playwright test tests/performance

# Specific test file
npx playwright test tests/integration/happy-path.spec.ts
```

### Run Tests on Specific Browsers

```bash
# Chrome only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# Mobile Chrome
npx playwright test --project="Mobile Chrome"
```

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## 🛠 Test Configuration

The test suite is configured for multiple scenarios:

- **Cross-browser testing**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Automatic retry**: Failed tests retry 2 times in CI
- **Screenshots**: Captured on failure
- **Trace files**: Generated on first retry
- **Parallel execution**: Tests run in parallel for speed

## 📝 Test Data

Test data is centralized in `fixtures/test-data.ts`:

- **Valid orders**: Realistic test data for happy path testing
- **Edge case orders**: Special characters, long text, unicode
- **Invalid orders**: For validation testing
- **Mock API responses**: For testing without PocketBase

## 🔧 Backend Requirements

Most tests work without PocketBase running and test error handling instead. For full integration testing:

1. **Start PocketBase**:
   ```bash
   cd .. && ./pocketbase serve
   ```

2. **Create admin account**: admin@localhost.com / admin12345

3. **Create lunch_orders collection** with proper permissions

## 📋 Test Coverage

The test suite covers:

- ✅ **Functionality**: Form submission, navigation, data display
- ✅ **Validation**: Required fields, input sanitization, edge cases
- ✅ **Accessibility**: Keyboard navigation, ARIA, screen readers
- ✅ **Responsiveness**: Desktop, tablet, mobile, zoom, orientation
- ✅ **Error Handling**: Network failures, API errors, edge cases
- ✅ **Performance**: Load times, memory usage, concurrent operations
- ✅ **Cross-browser**: Chrome, Firefox, Safari, Mobile browsers

## 🐛 Debugging Tests

For debugging failing tests:

```bash
# Run in debug mode (opens browser devtools)
npx playwright test --debug

# Run with verbose logging
npx playwright test --reporter=list

# Run single test with trace
npx playwright test tests/integration/happy-path.spec.ts --trace on
```

## 📈 Adding New Tests

When adding new functionality:

1. **Add test data** to `fixtures/test-data.ts`
2. **Write integration tests** in appropriate file
3. **Add accessibility checks** if UI changes
4. **Consider performance impact** for complex features
5. **Test error scenarios** for network operations

## 🚨 Known Limitations

- **PocketBase dependency**: Some tests require backend for full coverage
- **Network simulation**: Limited by Playwright's network mocking
- **Performance metrics**: Vary by system and network conditions
- **Accessibility**: Automated checks supplement but don't replace manual testing

## 🎯 Continuous Integration

Tests are configured for CI environments:

- **Retry logic**: Handles flaky network conditions
- **Headless mode**: Runs without GUI in CI
- **Parallel execution**: Faster feedback
- **Artifact collection**: Screenshots and traces on failure