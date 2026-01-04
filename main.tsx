import { addAgentTags, jsx, Respond, CompatibilityDate } from '@sierra/agent';
import { createAgent } from '@sierra/agent/base';
import { UnsubscribeGoal } from './agent/skills/unsubscribe';
import integrationsRegistry from './integrations-registry';

// Goal-based agent using the Sierra Base Agent
export default createAgent({
  compatibilityDate: CompatibilityDate.STABLE,

  config: {
    textConfig: {
      enabledEvents: ['start', 'inactivity'],
      inactivityTimeoutSeconds: 300,
    },
  },

  // Add our custom goals to the GoalAgent
  useAdditionalGoalAgentChildren: () => {
    return <UnsubscribeGoal />;
  },

  // Handle client events
  onClientEvent: (props, next) => {
    const { conversation, event } = props;
    switch (event.type) {
      case 'start':
        addAgentTags(['conversation-start']);
        // Let the base agent handle the start event
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
  useCustomAbuseDetectionProps: () => ({
    mode: 'defend',
  }),

  integrationsRegistry,
});
