import { addAgentTags, jsx, Respond } from '@sierra/agent';
import { createAgent } from '@sierra/agent/base';
import { Agent } from './agent';
import integrationsRegistry from './integrations-registry';

// To access a full base agent implementation, you can run `pnpm sierra eject`.
// This will prevent future BaseAgent updates from the SDK so is not recommended.
export default createAgent({
  // // To define a contact centre:
  // contactCenter: <your contact centre code>,

  // // To customise the unhandled intent fallback:
  // jsx: {
  //     unhandledIntentFallback: <YourCustomUnhandledIntentComponent />,
  // },

  // You can specify additional configuration for your agent here:
  config: {
    textConfig: {
      enabledEvents: ['start', 'inactivity'],
      inactivityTimeoutSeconds: 300,
    },
  },

  // You can partially override the `onClientEvent` hook by calling a
  // special `next` function after your custom logic:
  onClientEvent: (props, next) => {
    const { conversation, event, generateAgentResponse } = props;
    switch (event.type) {
      // The conversation has started
      case 'start':
        addAgentTags(['conversation-start']);
        generateAgentResponse(<Agent />);
        break;
      // The conversion is complete
      case 'request-complete':
        addAgentTags(['request-complete']);
        conversation.output.send({ type: 'complete', reason: 'Customer requested' });
        break;
      // The conversation has been inactive for a period of time
      case 'inactivity':
        addAgentTags(['inactivity']);
        generateAgentResponse(
          <Respond mode="paraphrase">Is there anything else I can help you with?</Respond>,
          jsx.newEmptyState(),
        );
        break;
      // The customer has left the conversation
      case 'hang-up':
        addAgentTags(['hang-up']);
        break;
      // Other events are passed to the next handler
      default:
        next(props);
    }
  },

  // // Use `useAdditionalGoalAgentChildren` to add components to your agent:
  // useAdditionalGoalAgentChildren: () => {
  //     // ... initialization code ...
  //
  //     return (
  //         <Outcome>
  //             <Goal>
  //                 {/* Your goal content */}
  //             </Goal>
  //         </Outcome>
  //     );
  // },

  // // Use `useCustomAbuseDetectionProps` to customize abuse detection:
  // useCustomAbuseDetectionProps: () => {
  //     // ... your abuse detection props ...
  //
  //     // For example, to enforce abuse detection:
  //     mode: "defend",
  //
  //     // To customize the abuse detection action:
  //     foundAbuseDefendAction: () => <MyCustomHandleAbuseComponent />,
  // },

  // // Use `useTools` to add tools to your agent. To get strong typing, you
  // // can make this function's return type `JourneyTools` from `platform-types.tsx`.
  // useTools: () => {
  //     // ... initialization code ...
  //
  //     return {
  //         YourTool: (params, toolControls, noCodeExt) => /* ... */,
  //     };
  // },

  // // Use `useWrapper` to add contexts needed by your agent and its tools:
  // useWrapper: (agent) => {
  //     // ... initialization code ...
  //
  //     return (
  //         <YourContext.Provider value={yourValue}>
  //             <AnotherContext.Provider value={anotherValue}>
  //                 {agent}
  //             </AnotherContext.Provider>
  //         </YourContext.Provider>
  //     );
  // },

  // Use `integrationRegistry` to add integrations to your agent.
  // By default, the integrationsRegistry contains all builtin integrations
  // from the @sierra/integrations-builtin package.
  //
  // To add custom integrations:
  // 1. Run `pnpm sierra integrations create` to create a new integration
  // 2. Run `pnpm sierra integrations bundle . @sierra/integrations-builtin` to bundle
  //    your local integrations package with builtin integrations
  // 3. This will update your ./integrations-registry.ts  file with the new integrations
  // 4. The imported integrationRegistry in this file will pull from your new integrations-registry.ts file
  integrationsRegistry,
});
