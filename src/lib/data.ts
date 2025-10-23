// Centralized data import to avoid inconsistent relative paths throughout the app
import data from '../../content/data.json';

export default data;

// Named exports for common data sections for convenience
export const {
  contact,
  bio,
  professional,
  resume,
  projects,
  community,
  thoughtLeadership,
} = data;
