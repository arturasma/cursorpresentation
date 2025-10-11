# Exam Login Process Flow

## Mermaid Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant System
    participant Teacher
    participant Student
    
    Note over User,System: Initial Setup
    User->>System: Select Role
    
    rect rgb(200, 220, 255)
    Note over Teacher,System: Teacher Flow - Exam Creation
    Teacher->>System: Create Exam
    System->>System: Store exam details<br/>(date, location, type)
    System-->>Teacher: Exam Created
    end
    
    rect rgb(255, 220, 200)
    Note over Student,System: Student Flow - Registration
    Student->>System: Register for Exam
    System->>System: Hash student data + exam info<br/>(name, DOB, ID + location, date, type)
    System->>System: Generate unique PIN
    System-->>Student: Registration Successful
    Student->>System: Reveal PIN
    System-->>Student: Display PIN (with blur protection)
    end
    
    rect rgb(200, 220, 255)
    Note over Teacher,System: Teacher Flow - Session Activation
    Teacher->>System: View Exam Details
    Teacher->>System: Activate Exam Session
    System->>System: Generate 4-digit Room Code
    System-->>Teacher: Display Room Code
    end
    
    rect rgb(255, 220, 200)
    Note over Student,System: Student Flow - Exam Entry
    Student->>System: Click "Take Exam"
    System->>Student: Request Room Code
    Student->>System: Enter Room Code
    System->>System: Validate Room Code
    System->>Student: Request PIN
    Student->>System: Enter PIN
    System->>System: Validate PIN + Room Code
    System-->>Student: Await Teacher Verification
    end
    
    rect rgb(200, 220, 255)
    Note over Teacher,System: Teacher Flow - Identity Verification
    Teacher->>System: View Verification Panel
    System-->>Teacher: Display pending students
    Teacher->>Teacher: Check Student ID in person
    Teacher->>System: Click "Verify" for Student
    System->>System: Mark student as verified
    end
    
    rect rgb(255, 220, 200)
    Note over Student,System: Student Flow - Exam Access
    System-->>Student: Verification Approved
    Student->>System: Access Exam
    Student->>System: Complete Exam
    end
    
    rect rgb(200, 255, 200)
    Note over System: Cleanup
    System->>System: Delete all hashes after exam
    end
```

## BPMN-Style Flowchart

```mermaid
flowchart TB
    Start([User Arrives]) --> SelectRole{Select Role}
    
    SelectRole -->|Teacher| TC[Create Exam]
    TC --> StoreExam[(Store Exam Details:<br/>Date, Location, Type)]
    StoreExam --> WaitStudent[Wait for Students]
    
    SelectRole -->|Student| SR[Register for Exam]
    SR --> Hash[System Generates Hash:<br/>Student Data + Exam Info]
    Hash --> GenPIN[Generate Unique PIN]
    GenPIN --> ShowSuccess[Show Registration Success]
    ShowSuccess --> RevealPIN[Student Reveals PIN]
    RevealPIN --> WaitTeacher[Wait for Exam Session]
    
    WaitStudent --> ActivateSession[Teacher Activates Session]
    ActivateSession --> GenRoom[Generate 4-Digit Room Code]
    GenRoom --> DisplayRoom[Display Room Code to Teacher]
    
    WaitTeacher --> StudentEnter[Student: Take Exam]
    DisplayRoom --> StudentEnter
    
    StudentEnter --> EnterRoom[Enter Room Code]
    EnterRoom --> ValidRoom{Valid Room<br/>Code?}
    ValidRoom -->|No| EnterRoom
    ValidRoom -->|Yes| EnterPIN[Enter PIN]
    EnterPIN --> ValidPIN{Valid PIN?}
    ValidPIN -->|No| EnterPIN
    ValidPIN -->|Yes| AwaitVerify[Await Teacher Verification]
    
    AwaitVerify --> TeacherPanel[Teacher Views Verification Panel]
    TeacherPanel --> CheckID[Teacher Checks ID in Person]
    CheckID --> ClickVerify[Teacher Clicks Verify]
    ClickVerify --> SystemVerify[System Marks Student Verified]
    
    SystemVerify --> GrantAccess[Grant Exam Access]
    GrantAccess --> TakeExam[Student Completes Exam]
    TakeExam --> Cleanup[Delete All Hashes]
    Cleanup --> End([End])
    
    style TC fill:#e1f5ff
    style ActivateSession fill:#e1f5ff
    style TeacherPanel fill:#e1f5ff
    style CheckID fill:#e1f5ff
    style ClickVerify fill:#e1f5ff
    
    style SR fill:#ffe1cc
    style Hash fill:#ffe1cc
    style GenPIN fill:#ffe1cc
    style RevealPIN fill:#ffe1cc
    style StudentEnter fill:#ffe1cc
    style EnterRoom fill:#ffe1cc
    style EnterPIN fill:#ffe1cc
    style TakeExam fill:#ffe1cc
    
    style Cleanup fill:#ccffcc
```

## Swimlane Diagram

```mermaid
flowchart TB
    subgraph Teacher_Lane["👨‍🏫 TEACHER"]
        T1[Create Exam]
        T2[Activate Exam Session]
        T3[Room Code: XXXX]
        T4[View Verification Panel]
        T5[Verify Student Identity<br/>in Person]
    end
    
    subgraph System_Lane["⚙️ SYSTEM"]
        S1[Store Exam Details]
        S2[Generate Hash from:<br/>Name + DOB + ID +<br/>Location + Date + Type]
        S3[Generate Unique PIN]
        S4[Generate 4-Digit Room Code]
        S5[Validate Room Code + PIN]
        S6[Mark Student Verified]
        S7[Delete Hashes]
    end
    
    subgraph Student_Lane["👨‍🎓 STUDENT"]
        ST1[Register for Exam]
        ST2[Reveal PIN]
        ST3[Take Exam]
        ST4[Enter Room Code]
        ST5[Enter PIN]
        ST6[Await Verification]
        ST7[Access & Complete Exam]
    end
    
    T1 --> S1
    S1 --> ST1
    ST1 --> S2
    S2 --> S3
    S3 --> ST2
    ST2 --> T2
    T2 --> S4
    S4 --> T3
    T3 --> ST3
    ST3 --> ST4
    ST4 --> ST5
    ST5 --> S5
    S5 --> ST6
    ST6 --> T4
    T4 --> T5
    T5 --> S6
    S6 --> ST7
    ST7 --> S7
```

## ASCII Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXAM LOGIN PROCESS FLOW                            │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │ User Arrives │
                              └──────┬───────┘
                                     │
                              ┌──────▼───────┐
                              │ Select Role  │
                              └──┬───────┬───┘
                   ┌─────────────┘       └─────────────┐
                   │                                   │
        ┌──────────▼───────────┐           ┌──────────▼──────────┐
        │    TEACHER FLOW      │           │   STUDENT FLOW      │
        └──────────────────────┘           └─────────────────────┘

   ╔════════════════════════╗         ╔═══════════════════════╗
   ║  1. CREATE EXAM        ║         ║  3. REGISTER FOR EXAM ║
   ╚═══════════╤════════════╝         ╚═══════════╤═══════════╝
               │                                  │
               │  • Set Date                      │  • Enter Name
               │  • Set Location                  │  • Enter DOB
               │  • Set Exam Type                 │  • Enter Student ID
               │                                  │
               ▼                                  ▼
   ┌───────────────────────┐         ┌──────────────────────────┐
   │ System Stores Exam    │         │ System Generates Hash:   │
   │ Details               │         │ Hash(Name + DOB + ID +   │
   └───────────┬───────────┘         │ Location + Date + Type)  │
               │                      └────────────┬─────────────┘
               │                                   │
               │  2. Exam Created ✓                │
               │                                   ▼
               │                      ┌──────────────────────────┐
               │                      │ Generate Unique PIN      │
               │                      └────────────┬─────────────┘
               │                                   │
               │                                   │  4. Show Success ✓
               │                                   │
               │                      ┌────────────▼─────────────┐
               │                      │ Student Reveals PIN      │
               │                      │ (with blur protection)   │
               │                      └────────────┬─────────────┘
               │                                   │
   ╔═══════════▼════════════╗                     │
   ║  5. ACTIVATE SESSION   ║                     │
   ╚═══════════╤════════════╝                     │
               │                                   │
               │  • Click Activate                 │
               │                                   │
               ▼                                   │
   ┌───────────────────────┐                     │
   │ Generate 4-Digit      │                     │
   │ Room Code             │                     │
   └───────────┬───────────┘                     │
               │                                   │
               │  Display: XXXX                    │
               │                                   │
               │                      ╔════════════▼═══════════╗
               │                      ║  6. TAKE EXAM          ║
               │                      ╚════════════╤═══════════╝
               │                                   │
               │                      ┌────────────▼─────────────┐
               │                      │ Enter Room Code: ____    │
               │                      └────────────┬─────────────┘
               │                                   │
               │                      ┌────────────▼─────────────┐
               │                      │ Validate Room Code       │
               │                      └────────────┬─────────────┘
               │                                   │ Valid? ✓
               │                                   │
               │                      ┌────────────▼─────────────┐
               │                      │ Enter PIN: ______        │
               │                      └────────────┬─────────────┘
               │                                   │
               │                      ┌────────────▼─────────────┐
               │                      │ Validate PIN             │
               │                      └────────────┬─────────────┘
               │                                   │ Valid? ✓
               │                                   │
               │                      ┌────────────▼─────────────┐
               │                      │ Status: Awaiting         │
               │                      │ Teacher Verification     │
               │                      └────────────┬─────────────┘
               │                                   │
   ╔═══════════▼════════════╗                     │
   ║  7. VERIFY IDENTITY    ║                     │
   ╚═══════════╤════════════╝                     │
               │                                   │
               │  • View Verification Panel        │
               │  • See Pending Students           │
               │  • Check ID in Person             │
               │  • Click "Verify"                 │
               │                                   │
               ▼                                   │
   ┌───────────────────────┐                     │
   │ System Marks Student  │                     │
   │ as Verified           │                     │
   └───────────┬───────────┘                     │
               │                                   │
               └──────────────┬────────────────────┘
                              │
                 ┌────────────▼─────────────┐
                 │ Grant Exam Access        │
                 └────────────┬─────────────┘
                              │
                 ╔════════════▼═════════════╗
                 ║  8. COMPLETE EXAM        ║
                 ╚════════════╤═════════════╝
                              │
                 ┌────────────▼─────────────┐
                 │ Student Completes Exam   │
                 └────────────┬─────────────┘
                              │
                 ┌────────────▼─────────────┐
                 │ System Deletes All       │
                 │ Hashes (Privacy)         │
                 └────────────┬─────────────┘
                              │
                         ┌────▼────┐
                         │   END   │
                         └─────────┘

╔════════════════════════════════════════════════════════════════════════╗
║  SECURITY LAYERS                                                       ║
╠════════════════════════════════════════════════════════════════════════╣
║  ✓ Room Code Validation - Prevents wrong classroom access             ║
║  ✓ PIN Authentication - Validates student identity via hash           ║
║  ✓ Teacher Verification - In-person ID check prevents impersonation   ║
║  ✓ Time Window (Production) - Access only during exam periods         ║
║  ✓ Privacy Protection - All hashes deleted after exam completion      ║
╚════════════════════════════════════════════════════════════════════════╝
```

## Key Process Points

### Security Hash Generation
```
PIN = Hash(
    Student.Name + 
    Student.DateOfBirth + 
    Student.ID + 
    Exam.Location + 
    Exam.Date + 
    Exam.Type
)
```

### Authentication Flow
1. **Room Code** → Validates correct physical location
2. **PIN** → Validates student identity
3. **Teacher Verification** → Confirms in-person identity
4. **Time Window** (Production) → Validates exam timing

### Role Switching (Demo Feature)
Users can switch between Teacher and Student roles to experience both workflows.

---

**Note**: This is a click prototype demonstrating the concept. In production:
- Time window validation would be enforced
- Additional security measures would be implemented
- Integration with existing student information systems
- Audit logging for all authentication events

