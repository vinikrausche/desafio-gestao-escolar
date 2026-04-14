import type { Classroom } from '../../../../types/features/classrooms/classroom.types';

export type ClassroomListCardProps = {
  classroom: Classroom;
  onDelete: () => void;
  onEdit: () => void;
};
