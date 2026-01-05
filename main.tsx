// biome-ignore lint/correctness/noUnusedImports: JSX required
import { addAgentTags, CompatibilityDate, jsx } from '@sierra/agent';
import { createAgent } from '@sierra/agent/base';
import { UnsubscribeGoal } from './agent';
import integrationsRegistry from './integrations-registry';

// Goal-based agent using the Sierra Base Agent
export default createAgent({
  // Set agent compatibility
  compatibilityDate: CompatibilityDate.STABLE,

  // Configure the agent
  config: {
    textConfig: {
      enabledEvents: ['start', 'inactivity'],
      inactivityTimeoutSeconds: 300,
    },
  },

  // Add goals
  useAdditionalGoalAgentChildren: () => {
    return <UnsubscribeGoal />;
  },

  // Handle client events
  onClientEvent: (props, next) => {
    const { conversation, event } = props;
    switch (event.type) {
      case 'start':
        addAgentTags(['conversation-start']);
        next(props);
        break;
      case 'request-complete':
        addAgentTags(['request-complete']);
        conversation.output.send({ type: 'complete', reason: 'Customer requested' });
        break;
      case 'inactivity':
        addAgentTags(['inactivity']);
        next(props);
        break;
      case 'hang-up':
        addAgentTags(['hang-up']);
        break;
      default:
        next(props);
    }
  },

  // Enable abuse detection
  useCustomAbuseDetectionProps: () => ({ mode: 'defend' }),

  // Provide integrations
  integrationsRegistry,
});
