const express = require("express");
const router = express.Router();
const {
  startFlow,
  updateFlowState,
  getFlow
} = require("../controllers/flowController");

router.post("/start", startFlow);
router.put("/:flowId", updateFlowState);
router.get("/:flowId", getFlow);

module.exports = router;
