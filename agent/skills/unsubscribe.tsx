// biome-ignore lint/correctness/noUnusedImports: JSX required
import {
  jsx,
  Goal,
  ActionTool,
  toolParam,
  addAgentTags,
  Rule,
} from '@sierra/agent';

/**
 * Goal-based unsubscribe skill.
 *
 * The agent will help customers unsubscribe from promotional emails.
 * It uses an ActionTool that the LLM can invoke when the customer
 * wants to unsubscribe and provides their email address.
 */
export function UnsubscribeGoal() {
  return (
    <Goal description="Help the customer unsubscribe from promotional emails">
      <Rule content="Before unsubscribing, confirm the customer's email address and ask if they are sure they want to unsubscribe." />
      <Rule content="If the customer provides an invalid email address, politely ask them to provide a valid email." />

      <ActionTool
        name="UnsubscribeFromEmails"
        description="Unsubscribe the customer from promotional emails after they confirm they want to unsubscribe"
        params={{
          emailAddress: toolParam.string("The customer's email address to unsubscribe"),
          confirmed: toolParam.boolean('Whether the customer has confirmed they want to unsubscribe'),
        }}
        func={({ emailAddress, confirmed }) => {
          // Validate email format
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(emailAddress)) {
            return {
              success: false,
              error: 'Invalid email address format. Please ask the customer for a valid email.',
            };
          }

          // Check if customer confirmed
          if (!confirmed) {
            return {
              success: false,
              error: 'Customer has not confirmed. Please confirm before unsubscribing.',
            };
          }

          // In a real implementation, you would call an API to unsubscribe
          // For now, we simulate success
          addAgentTags(['unsubscribe-success', `email:${emailAddress}`]);

          return {
            success: true,
            message: `Successfully unsubscribed ${emailAddress} from promotional emails.`,
          };
        }}
      />
    </Goal>
  );
}
