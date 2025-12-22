// biome-ignore lint/correctness/noUnusedImports: JSX required
import { Choose, Input, InputValidationError, jsx, Option, Respond, useState } from '@sierra/agent';

export function Unsubscribe() {
  const [emailAddress, setEmailAddress] = useState<string | null>(null);

  return (
    <>
      <Input
        context="We need to unsubscribe the customer from promotional emails"
        fields={{
          emailAddress: 'The email address used to create the account',
        }}
        validate={({ emailAddress }) => {
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailAddress)) {
            throw new InputValidationError('Let the customer know that their email is invalid.');
          }
          return { emailAddress };
        }}
        onInput={({ emailAddress }) => setEmailAddress(emailAddress)}
      />
      <Choose question="Are you sure you want to unsubscribe?">
        <Option id="yes" description="Yes">
          <Respond mode="paraphrase">
            <String>We won't send emails to '{emailAddress}' any more.</String>
          </Respond>
        </Option>
        <Option id="no" description="No">
          <Respond mode="paraphrase">Thank you. Is there anything else I can help you with?</Respond>
        </Option>
      </Choose>
    </>
  );
}
