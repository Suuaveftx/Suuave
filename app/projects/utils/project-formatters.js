export const formatProjectTimeline = (project) => {
  if (typeof project?.duration === 'string' && project.duration.trim()) {
    return project.duration.trim();
  }

  const timeframe =
    project?.projectTimeframe ??
    project?.project_timeframe ??
    project?.timeframe ??
    project?.duration;
  if (timeframe === undefined || timeframe === null || timeframe === '') return '';

  const value = String(timeframe).trim();
  const unit = String(
    project?.durationType ??
      project?.duration_type ??
      project?.timeframeUnit ??
      project?.timeframe_unit ??
      project?.duration_unit ??
      project?.unit ??
      ''
  )
    .trim()
    .toLowerCase();
  if (!unit || value.toLowerCase().endsWith(unit)) return value;

  const singularUnit = unit.replace(/s$/, '');
  const numericValue = Number(value);
  const displayUnit = numericValue === 1 ? singularUnit : `${singularUnit}s`;
  return `${value} ${displayUnit}`;
};
