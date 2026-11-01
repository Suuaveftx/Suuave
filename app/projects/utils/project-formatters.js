// Old projects were posted from a form that only asked for a number of DAYS,
// so a bare number with no unit is shown as days.
const DEFAULT_UNIT = 'days';

export const formatProjectTimeline = (project) => {
  // API already returns "2 weeks"
  if (typeof project?.duration === 'string' && /[a-z]/i.test(project.duration)) {
    return project.duration.trim();
  }

  const timeframe =
    project?.projectTimeframe ??
    project?.project_timeframe ??
    project?.timeframe ??
    project?.duration;
  if (timeframe === undefined || timeframe === null || timeframe === '') return '';

  const value = String(timeframe).trim();
  if (/[a-z]/i.test(value)) return value; // e.g. "3 months" in another field

  const unit =
    String(
      project?.durationType ??
        project?.duration_type ??
        project?.timeframeUnit ??
        project?.timeframe_unit ??
        project?.duration_unit ??
        project?.unit ??
        ''
    )
      .trim()
      .toLowerCase() || DEFAULT_UNIT;

  const singularUnit = unit.replace(/s$/, '');
  const displayUnit = Number(value) === 1 ? singularUnit : `${singularUnit}s`;
  return `${value} ${displayUnit}`;
};
