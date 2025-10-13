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
      isPaused: false,
      pauseCount: 0,
      pauseHistory: [],
    };
    
    // Update session and set status to active
    examStorage.update(examId, { 
      activeSession: session,
      status: 'active'
    });
    return session;
  } catch (error) {
    console.error('Error activating exam session:', error);
    return null;
  }
}

// Deactivate an exam session and mark exam as completed
export function deactivateExamSession(examId: string): boolean {
  try {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam) return false;
    
    // Clear session and mark as completed
    examStorage.update(examId, { 
      activeSession: undefined,
      status: 'completed'
    });
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

// Pause an active exam session
export function pauseExamSession(examId: string): boolean {
  try {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam || !exam.activeSession) return false;
    
    const pausedAt = new Date().toISOString();
    const updatedSession: ExamSession = {
      ...exam.activeSession,
      isPaused: true,
      pausedAt,
      pauseCount: exam.activeSession.pauseCount + 1,
      pauseHistory: [
        ...(exam.activeSession.pauseHistory || []),
        { pausedAt, resumedAt: undefined }
      ]
    };
    
    examStorage.update(examId, { activeSession: updatedSession });
    return true;
  } catch (error) {
    console.error('Error pausing exam session:', error);
    return false;
  }
}

// Resume a paused exam session
export function resumeExamSession(examId: string): boolean {
  try {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam || !exam.activeSession || !exam.activeSession.isPaused) return false;
    
    const resumedAt = new Date().toISOString();
    const pauseHistory = exam.activeSession.pauseHistory || [];
    
    // Update the last pause record with resume time
    if (pauseHistory.length > 0) {
      pauseHistory[pauseHistory.length - 1].resumedAt = resumedAt;
    }
    
    const updatedSession: ExamSession = {
      ...exam.activeSession,
      isPaused: false,
      pausedAt: undefined,
      pauseHistory
    };
    
    examStorage.update(examId, { activeSession: updatedSession });
    return true;
  } catch (error) {
    console.error('Error resuming exam session:', error);
    return false;
  }
}

