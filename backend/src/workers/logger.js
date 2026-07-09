// Simple logger worker - logs important events
// This is just a basic helper, nothing fancy

const logEvent = (eventType, message) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] [${eventType}] ${message}`);
};

module.exports = { logEvent };