import axios from 'axios';

const FIELD_MAP = {
  title: ['projectTitle', 'Title must be at least 10 characters.'],
  description: ['projectDetails', 'Description must be at least 50 characters.'],
  skillsRequired: ['fashionDesignerSkills', 'Add at least one required skill.'],
  designStyle: ['designStyles', 'Add at least one design style.'],
  budget: ['projectBudget', 'Budget must be at least 1,000.'],
  durationType: ['durationType', 'Select a timeframe unit.'],
  projectTimeframe: ['projectTimeframe', 'Enter a valid timeframe.'],
  currency: ['projectCurrency', 'Select a currency.'],
};

/**
 * Turns an API error into a plain object the form can apply:
 * { message, skills, styles, fields: [[fieldName, message], ...] }
 */
export const getSubmissionErrors = (error) => {
  const result = { message: '', skills: '', styles: '', fields: [] };
  const apiErrors = axios.isAxiosError(error) ? error.response?.data?.errors : null;

  if (!Array.isArray(apiErrors) || apiErrors.length === 0) {
    result.message = 'We could not publish the project. Please check the form and try again.';
    return result;
  }

  apiErrors.forEach(({ field }) => {
    const mapped = FIELD_MAP[field];
    if (!mapped) return;
    const [name, message] = mapped;
    if (name === 'fashionDesignerSkills') result.skills = message;
    else if (name === 'designStyles') result.styles = message;
    else result.fields.push([name, message]);
  });

  if (!result.skills && !result.styles && result.fields.length === 0) {
    result.message = 'Some project details could not be accepted. Please review the form.';
  }
  return result;
};
