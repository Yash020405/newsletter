# Newsletter Renewal Flow Simulator

## Demo

[Watch Full Demo Video](https://www.loom.com/share/b28d59ec23684a389b3a01d30c3126fb?sid=01be5d3b-65de-4e04-8734-996c2d941625)

## Description
A web application that simulates a newsletter renewal process. The system sends two reminders to customers and tracks their responses, demonstrating a basic automated customer engagement flow.

## Features
- Two-stage reminder system
- Real-time status tracking  
- Visual flow representation
- Activity logging

## Flow Description
1. First Reminder Stage
   - Send initial renewal reminder
   - Wait for customer response
   - If renewed → Send thank you message and end flow
   - If not renewed → Proceed to second reminder

2. Second Reminder Stage
   - Send second reminder
   - Wait for customer response
   - If renewed → Send thank you message and end flow
   - If not renewed → Log "No further action" and end flow

## Key Assumptions
1. **Response Time**: 
   - Simulated 3-second wait period for customer responses
   - 2-second wait for thank you message delivery

2. **Response Probability**:
   - 50% chance of renewal at each stage
   - Randomized using Math.random()

3. **States**:
   - `IDLE` - Initial state
   - `FIRST_REMINDER` - First reminder sent
   - `WAITING_FIRST` - Awaiting first response
   - `SECOND_REMINDER` - Second reminder sent
   - `WAITING_SECOND` - Awaiting second response
   - `COMPLETED_SUCCESS` - Customer renewed
   - `COMPLETED_FAILURE` - Customer declined


## Project Setup

### Prerequisites
1. Install Node.js and npm
   ```bash
   # Check installation
   node --version
   npm --version
   ```

2. Install MongoDB
   ```bash
   # Check installation
   mongod --version
   ```

3. Clone repository
   ```bash
   git clone https://github.com/Yash020405/newsletter.git
   cd newsletter
   ```

### Backend Setup
1. Navigate to backend directory
   ```bash
   cd backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start server
   ```bash
   npm start
   # Server should start on port 5000
   ```

### Frontend Setup
1. Open new terminal and navigate to frontend directory
   ```bash
   cd frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start application
   ```bash
   npm start
   # App should open on http://localhost:3000
   ```

## API Endpoints
- Start Flow: `POST /api/flows/start`
- Update Flow: `PUT /api/flows/:flowId`
- Get Flow: `GET /api/flows/:flowId`
