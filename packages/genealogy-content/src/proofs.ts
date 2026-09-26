import meason from './proofs/meason.json' with { type: 'json' };
import sledge from './proofs/sledge.json' with { type: 'json' };
import type { ProofProject } from './types.js';

export const proofProjects: readonly ProofProject[] = [
  meason as ProofProject,
  sledge as ProofProject,
];
