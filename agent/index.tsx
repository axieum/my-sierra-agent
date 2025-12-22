// biome-ignore lint/correctness/noUnusedImports: JSX required
import { Category, jsx, RedirectToAvailableTopics, Topic, Triage } from '@sierra/agent';
import { Unsubscribe } from './skills/unsubscribe';

export function Agent() {
  return (
    <Triage otherwise={<DefaultResponse />}>
      <Category
        descriptions={[
          'Unsubscribe from emails',
          'Unsubscribe from promotional emails',
          'Stop marketing emails',
          'Remove me from your mailing list',
          'I want to stop getting emails',
        ]}
      >
        <Unsubscribe />
      </Category>
    </Triage>
  );
}

export function DefaultResponse() {
  return (
    <RedirectToAvailableTopics>
      <Topic>Unsubscribe from emails</Topic>
    </RedirectToAvailableTopics>
  );
}
