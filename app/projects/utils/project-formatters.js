// Set to false once the timeframe displays correctly.
const DEBUG_TIMEFRAME = false;

// Projects posted before the unit existed were entered as a number of DAYS.
const DEFAULT_UNIT = 'days';

const pick = (...values) =>
  values.find((v) => v !== undefined && v !== null && String(v).trim() !== '');

const pluralize = (value, unit) => {
  const singular = unit.replace(/s$/, '');
  return `${value} ${Number(value) === 1 ? singular : `${singular}s`}`;
};

export const formatProjectTimeline = (project) => {
  const number = pick(
    project?.projectTimeframe,
    project?.project_timeframe,
    project?.timeframe
  );
  const unit = pick(
    project?.durationType,
    project?.duration_type,
    project?.timeframeUnit,
    project?.timeframe_unit,
    project?.duration_unit,
    project?.unit
  );
  const duration = project?.duration;

  let result = '';
  let source = '';

  if (number !== undefined && unit !== undefined) {
    // 1. the structured pair the form sends: number + unit
    result = pluralize(String(number).trim(), String(unit).trim().toLowerCase());
    source = 'projectTimeframe + durationType';
  } else if (typeof duration === 'string' && /[a-z]/i.test(duration)) {
    // 2. API returned a ready-made string like "3 months"
    result = duration.trim();
    source = 'duration (string)';
  } else if (pick(number, duration) !== undefined) {
    // 3. a bare number: use the unit if we have one, otherwise days
    const value = String(pick(number, duration)).trim();
    result = /[a-z]/i.test(value)
      ? value
      : pluralize(
          value,
          String(unit ?? DEFAULT_UNIT)
            .trim()
            .toLowerCase()
        );
    source = unit ? 'number + durationType' : 'number only -> default days';
  }

  if (DEBUG_TIMEFRAME && typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log('[timeframe]', {
      projectId: project?.projectId,
      raw: {
        duration: project?.duration,
        durationType: project?.durationType,
        projectTimeframe: project?.projectTimeframe,
        timeframe: project?.timeframe,
      },
      shown: result,
      source,
    });
  }
  return result;
};
