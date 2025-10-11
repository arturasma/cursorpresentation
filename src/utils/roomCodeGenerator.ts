import type { ExamSession } from '@/types/exam';
import { examStorage } from './examStorage';

// Generate a simple 4-digit room code
export function generateRoomCode(): string {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  return code;
}

// Activate an exam session with a room code
export function activateExamSession(
  examId: string,
  teacherId: string,
  teacherName: string
): ExamSession | null {
  try {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam) return null;
    
    // Deactivate any existing session first
    if (exam.activeSession) {
      deactivateExamSession(examId);
    }
    
    const session: ExamSession = {
      examId,
      roomCode: generateRoomCode(),
      activeAt: new Date().toISOString(),
      teacherId,
      activatedBy: teacherName,
    };
    
    examStorage.update(examId, { activeSession: session });
    return session;
  } catch (error) {
    console.error('Error activating exam session:', error);
    return null;
  }
}

// Deactivate an exam session
export function deactivateExamSession(examId: string): boolean {
  try {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam) return false;
    
    examStorage.update(examId, { activeSession: undefined });
    return true;
  } catch (error) {
    console.error('Error deactivating exam session:', error);
    return false;
  }
}

// Validate room code matches active session
export function validateRoomCode(examId: string, roomCode: string): boolean {
  try {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam || !exam.activeSession) {
      return false;
    }
    
    return exam.activeSession.roomCode === roomCode;
  } catch (error) {
    console.error('Error validating room code:', error);
    return false;
  }
}

// Get active session for an exam
export function getActiveSession(examId: string): ExamSession | null {
  try {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    return exam?.activeSession || null;
  } catch (error) {
    console.error('Error getting active session:', error);
    return null;
  }
}

// Check if exam has an active session
export function hasActiveSession(examId: string): boolean {
  return getActiveSession(examId) !== null;
}

