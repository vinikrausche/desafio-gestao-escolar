import type { SchoolSummary } from '../../../../types/features/schools/school.types';

export type SchoolListCardProps = {
  onDelete: () => void;
  onEdit: () => void;
  onManageClassrooms: () => void;
  school: SchoolSummary;
};
