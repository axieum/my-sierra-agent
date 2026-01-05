// biome-ignore lint/correctness/noUnusedImports: JSX required
import { jsx } from '@sierra/agent';

// This file is no longer needed since we're using the goal-based pattern
// with useAdditionalGoalAgentChildren in main.tsx.
//
// The Base Agent from @sierra/agent/base provides:
// - GoalAgent with transfer tool
// - DetectAbuse
// - KnowledgeSearch (if knowledge sources are configured)
// - NoCodeJourneys support
// - Voice handling
//
// Our custom goals are added via useAdditionalGoalAgentChildren in main.tsx.

export { UnsubscribeGoal } from './goals/unsubscribe';
