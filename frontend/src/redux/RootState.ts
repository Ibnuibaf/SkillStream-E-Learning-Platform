// rootState.ts
import { AuthState } from './slices/authSlice';
import { StudentsState } from './slices/studentsSlice';

export interface RootState {
  auth: AuthState;
  students: StudentsState;
}
