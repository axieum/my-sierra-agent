import { BaseSchema, extend, Guardrails, Intents, Transfers } from '@sierra/content-schema';

export default extend(
  // REQUIRED
  BaseSchema,
  // OPTIONAL: removing these will disable corresponding features in the agent
  Intents,
  Guardrails,
  // NOTE: if the agent relies on escalations, use `TransfersWithEscalations`
  Transfers,
);
