const Flow = require("../models/Flow");

const startFlow = async (req, res) => {
  try {
    const flow = new Flow({
      state: 'IDLE',
      startedAt: new Date()
    });
    const savedFlow = await flow.save();
    res.json(savedFlow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFlowState = async (req, res) => {
  try {
    const { state } = req.body;
    const flow = await Flow.findById(req.params.flowId);
    
    if (!flow) {
      return res.status(404).json({ message: 'Flow not found' });
    }

    flow.state = state;
    
    if (state === 'COMPLETED_SUCCESS' || state === 'COMPLETED_FAILURE') {
      flow.completedAt = new Date();
      console.log('\n[Final State]', {
        state: state,
        completedAt: flow.completedAt
      });
    }

    const updatedFlow = await flow.save();
    res.json(updatedFlow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFlow = async (req, res) => {
  try {
    const flow = await Flow.findById(req.params.flowId);
    if (!flow) {
      return res.status(404).json({ message: 'Flow not found' });
    }
    res.json(flow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  startFlow,
  updateFlowState,
  getFlow
};
