# 🏥 Master Data Layanan Klinis - Proposal & Design

## 📋 Overview

Sistem Master Data Layanan Klinis untuk superadmin yang mencakup seluruh alur pelayanan kesehatan dari registrasi pasien hingga evaluasi dokter.

---

## 🎯 Scope & Requirements

### **Functional Requirements:**

1. **Patient Management** (Manajemen Pasien)
   - Registrasi pasien baru
   - Data demografi pasien
   - Riwayat medis
   - Alergi dan kontraindikasi

2. **Therapy Planning** (Perencanaan Terapi)
   - Diagnosis awal
   - Treatment plan
   - Terapi yang direkomendasikan
   - Jadwal terapi

3. **Treatment Records** (Rekam Medis Terapi)
   - Session terapi
   - Vital signs
   - Treatment notes
   - Progress tracking

4. **Medical Evaluation** (Evaluasi Medis)
   - Evaluasi dokter
   - Assessment hasil terapi
   - Recommendations
   - Follow-up plans

5. **Reporting & Analytics** (Pelaporan)
   - Patient statistics
   - Treatment outcomes
   - Doctor performance
   - Location-based reports

---

## 📊 Database Schema Design

### **New Tables Required:**

```prisma
// ============================================================================
// PATIENT MANAGEMENT
// ============================================================================

model Patient {
  id                String    @id @default(uuid())
  registrationNo    String    @unique  // e.g., "REG-2026-001"
  
  // Personal Information
  fullName          String
  dateOfBirth       DateTime
  gender            String    // male, female, other
  identityNo        String?   // KTP/Passport
  phone             String
  email             String?
  address           String
  city              String
  
  // Medical Information
  bloodType         String?   // A+, B+, AB+, O+, etc
  allergies         String?   // JSON array or text
  chronicDiseases   String?   // JSON array or text
  emergencyContact  String?
  emergencyPhone    String?
  
  // Registration Info
  locationId        String
  location          Location  @relation(fields: [locationId], references: [id])
  registeredBy      String    // Admin who registered
  registrationDate  DateTime  @default(now())
  
  // Status
  isActive          Boolean   @default(true)
  notes             String?
  
  // Relations
  therapyPlans      TherapyPlan[]
  treatmentSessions TreatmentSession[]
  medicalRecords    MedicalRecord[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([registrationNo])
  @@index([locationId])
  @@index([phone])
}

// ============================================================================
// THERAPY PLANNING
// ============================================================================

model TherapyPlan {
  id                String    @id @default(uuid())
  planCode          String    @unique  // e.g., "TP-2026-001"
  
  // Patient & Doctor
  patientId         String
  patient           Patient   @relation(fields: [patientId], references: [id])
  doctorName        String
  doctorSpecialty   String?
  
  // Diagnosis
  primaryDiagnosis  String
  secondaryDiagnosis String?
  icdCode           String?   // International Classification of Diseases
  
  // Treatment Plan
  treatmentGoals    String    // Short-term and long-term goals
  recommendedTherapy String   // Types of therapy
  frequency         String    // e.g., "3x per week"
  duration          String    // e.g., "12 weeks"
  estimatedSessions Int?
  
  // Schedule
  startDate         DateTime
  endDate           DateTime?
  
  // Therapy Details
  therapyType       String    // nanobubble, gasotransmitter, etc
  therapyNotes      String?
  contraindications String?
  precautions       String?
  
  // Status
  status            String    @default("active")  // active, completed, cancelled
  
  // Location
  locationId        String
  location          Location  @relation(fields: [locationId], references: [id])
  
  // Relations
  treatmentSessions TreatmentSession[]
  evaluations       MedicalEvaluation[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  createdBy         String
  
  @@index([patientId])
  @@index([locationId])
  @@index([status])
  @@index([planCode])
}

// ============================================================================
// TREATMENT SESSIONS
// ============================================================================

model TreatmentSession {
  id                String    @id @default(uuid())
  sessionCode       String    @unique  // e.g., "TS-2026-001"
  sessionNumber     Int       // 1, 2, 3, etc.
  
  // Relations
  patientId         String
  patient           Patient   @relation(fields: [patientId], references: [id])
  therapyPlanId     String
  therapyPlan       TherapyPlan @relation(fields: [therapyPlanId], references: [id])
  
  // Session Info
  sessionDate       DateTime
  sessionTime       String    // e.g., "10:00-11:00"
  duration          Int       // minutes
  
  // Vital Signs (Before Treatment)
  vitalSigns        Json?     // { bloodPressure, heartRate, temperature, oxygenSaturation }
  
  // Treatment Details
  therapyType       String
  therapyParameters Json?     // Specific parameters for the therapy
  treatmentNotes    String?
  
  // Patient Condition
  patientCondition  String?   // Before treatment
  patientComplaint  String?   // Chief complaint
  
  // Staff
  therapistName     String
  supervisingDoctor String?
  
  // Outcomes
  immediateResponse String?   // Patient response during/after session
  adverseEvents     String?   // Any side effects or complications
  
  // Next Session
  nextSessionDate   DateTime?
  recommendations   String?
  
  // Status
  status            String    @default("scheduled")  // scheduled, completed, cancelled, no-show
  completedAt       DateTime?
  
  // Location
  locationId        String
  location          Location  @relation(fields: [locationId], references: [id])
  
  // Medical Records
  medicalRecords    MedicalRecord[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  createdBy         String
  
  @@index([patientId])
  @@index([therapyPlanId])
  @@index([sessionDate])
  @@index([locationId])
  @@index([status])
}

// ============================================================================
// MEDICAL RECORDS
// ============================================================================

model MedicalRecord {
  id                String    @id @default(uuid())
  recordCode        String    @unique  // e.g., "MR-2026-001"
  
  // Relations
  patientId         String
  patient           Patient   @relation(fields: [patientId], references: [id])
  sessionId         String?
  session           TreatmentSession? @relation(fields: [sessionId], references: [id])
  
  // Record Type
  recordType        String    // session-note, lab-result, imaging, prescription, etc
  recordDate        DateTime  @default(now())
  
  // Content
  title             String
  description       String
  findings          String?
  
  // Attachments
  attachments       Json?     // Array of file URLs
  
  // Doctor/Staff
  recordedBy        String
  doctorName        String?
  
  // Status
  isConfirmed       Boolean   @default(false)
  confirmedBy       String?
  confirmedAt       DateTime?
  
  // Location
  locationId        String
  location          Location  @relation(fields: [locationId], references: [id])
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([patientId])
  @@index([recordDate])
  @@index([locationId])
  @@index([recordType])
}

// ============================================================================
// MEDICAL EVALUATION
// ============================================================================

model MedicalEvaluation {
  id                String    @id @default(uuid())
  evaluationCode    String    @unique  // e.g., "EVAL-2026-001"
  
  // Relations
  therapyPlanId     String
  therapyPlan       TherapyPlan @relation(fields: [therapyPlanId], references: [id])
  patientId         String
  
  // Evaluation Info
  evaluationType    String    // initial, progress, final
  evaluationDate    DateTime
  sessionsCovered   String    // e.g., "Sessions 1-10"
  
  // Clinical Assessment
  clinicalFindings  String    // Doctor's observations
  objectiveData     String?   // Measurable outcomes
  subjectiveData    String?   // Patient-reported outcomes
  
  // Progress Evaluation
  treatmentResponse String    // excellent, good, moderate, poor
  goalsAchieved     String?   // Which goals were met
  complications     String?   // Any issues encountered
  
  // Assessment & Plan
  assessment        String    // Doctor's assessment
  recommendations   String    // Continue, modify, terminate
  nextSteps         String?   // Future plan
  
  // Outcome Metrics (JSON for flexibility)
  outcomeMetrics    Json?     // { pain: 2, mobility: 8, satisfaction: 9 }
  
  // Doctor Info
  doctorName        String
  doctorSpecialty   String?
  doctorSignature   String?   // Digital signature or initials
  
  // Status
  status            String    @default("draft")  // draft, final
  approvedAt        DateTime?
  
  // Location
  locationId        String
  location          Location  @relation(fields: [locationId], references: [id])
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  createdBy         String
  
  @@index([therapyPlanId])
  @@index([evaluationDate])
  @@index([locationId])
  @@index([evaluationType])
}

// ============================================================================
// THERAPY TYPES (MASTER DATA)
// ============================================================================

model TherapyType {
  id                String    @id @default(uuid())
  code              String    @unique
  name              String
  category          String    // nanobubble, gasotransmitter, combination
  description       String
  duration          Int       // typical duration in minutes
  price             Decimal?  @db.Decimal(10, 2)
  isActive          Boolean   @default(true)
  contraindications String?
  sideEffects       String?
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([category])
  @@index([isActive])
}
```

---

## 🔗 Updated Relations

### **Location Model (Add Relations)**

```prisma
model Location {
  // ... existing fields ...
  
  // New Relations
  patients          Patient[]
  therapyPlans      TherapyPlan[]
  treatmentSessions TreatmentSession[]
  medicalRecords    MedicalRecord[]
  medicalEvaluations MedicalEvaluation[]
}
```

---

## 🎨 Frontend Structure

### **Admin Dashboard Routes:**

```
/admin
├── /dashboard              # Overview & Statistics
├── /master-data           # Master Data Management
│   ├── /patients          # Patient List & Management
│   │   ├── /create        # Register New Patient
│   │   ├── /[id]          # Patient Detail
│   │   └── /[id]/edit     # Edit Patient
│   │
│   ├── /therapy-plans     # Therapy Planning
│   │   ├── /create        # Create Therapy Plan
│   │   ├── /[id]          # View Plan
│   │   └── /[id]/edit     # Edit Plan
│   │
│   ├── /sessions          # Treatment Sessions
│   │   ├── /create        # Schedule Session
│   │   ├── /[id]          # Session Detail
│   │   └── /[id]/edit     # Edit Session
│   │
│   ├── /medical-records   # Medical Records
│   │   ├── /create        # Add Record
│   │   └── /[id]          # View Record
│   │
│   ├── /evaluations       # Medical Evaluations
│   │   ├── /create        # Create Evaluation
│   │   ├── /[id]          # View Evaluation
│   │   └── /[id]/edit     # Edit Evaluation
│   │
│   └── /therapy-types     # Therapy Master Data
│       ├── /create        # Add Therapy Type
│       └── /[id]/edit     # Edit Therapy Type
│
└── /reports               # Reports & Analytics
    ├── /patients          # Patient Reports
    ├── /treatments        # Treatment Reports
    ├── /outcomes          # Outcome Analysis
    └── /financial         # Financial Reports
```

---

## 🔍 Search & Filter Features

### **Patient Search & Filter:**
- Name (fuzzy search)
- Registration number
- Phone number
- Date range (registration date)
- Location
- Status (active/inactive)
- Gender
- Age range

### **Therapy Plan Filter:**
- Patient name
- Plan code
- Doctor name
- Therapy type
- Status (active/completed/cancelled)
- Date range
- Location

### **Treatment Session Filter:**
- Patient name
- Session date range
- Status (scheduled/completed/cancelled/no-show)
- Therapist name
- Location
- Therapy type

### **Medical Evaluation Filter:**
- Evaluation type (initial/progress/final)
- Doctor name
- Date range
- Treatment response (excellent/good/moderate/poor)
- Location

---

## 📱 UI Components

### **1. Master Data Dashboard**
```tsx
┌─────────────────────────────────────────────────────────┐
│  Master Data Layanan Klinis                             │
├─────────────────────────────────────────────────────────┤
│  [Patients: 156] [Plans: 89] [Sessions: 432] [Eval: 67]│
├─────────────────────────────────────────────────────────┤
│  Tabs: [Patients] [Therapy Plans] [Sessions]           │
│        [Medical Records] [Evaluations]                  │
├─────────────────────────────────────────────────────────┤
│  🔍 Search: [________________]  🎛️ Filters [▼]         │
├─────────────────────────────────────────────────────────┤
│  📊 Table with data...                                  │
│  ┌──────┬────────┬──────────┬────────┬─────────┐      │
│  │ ID   │ Name   │ Type     │ Status │ Actions │      │
│  ├──────┼────────┼──────────┼────────┼─────────┤      │
│  │ ...  │ ...    │ ...      │ ...    │ [View]  │      │
│  └──────┴────────┴──────────┴────────┴─────────┘      │
├─────────────────────────────────────────────────────────┤
│  [← Prev]  Page 1 of 10  [Next →]                      │
└─────────────────────────────────────────────────────────┘
```

### **2. Patient Detail View**
```tsx
┌─────────────────────────────────────────────────────────┐
│  Patient Detail: John Doe (REG-2026-001)                │
├─────────────────────────────────────────────────────────┤
│  Tabs: [Overview] [Therapy Plans] [Sessions] [Records]  │
├─────────────────────────────────────────────────────────┤
│  Personal Info    │  Medical History                    │
│  • Name: ...      │  • Blood Type: A+                   │
│  • DOB: ...       │  • Allergies: None                  │
│  • Phone: ...     │  • Chronic: Diabetes                │
├───────────────────┴─────────────────────────────────────┤
│  Active Therapy Plans:                                  │
│  1. Nano Bubble Therapy - 12 sessions (Active)          │
│  2. Gasotransmitter - 8 sessions (Completed)            │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Key Features

### **1. Comprehensive Search**
- Global search across all data types
- Advanced filters (multi-select)
- Date range picker
- Location-based filtering
- Export results to Excel/PDF

### **2. Data Grouping**
- Group by patient
- Group by therapy type
- Group by doctor
- Group by location
- Group by status

### **3. Quick Actions**
- Quick view (modal)
- Quick edit (inline/modal)
- Quick schedule (next session)
- Quick evaluation (create)
- Print/Export

### **4. Analytics Dashboard**
- Total patients by location
- Active therapy plans
- Completed sessions this month
- Upcoming evaluations
- Treatment outcome statistics

---

## 🔐 Access Control

```typescript
// Only Superadmin can access all clinical data
// Regular admin can only see their location's data

const accessRules = {
  superadmin: {
    patients: 'all',
    therapyPlans: 'all',
    sessions: 'all',
    evaluations: 'all',
    reports: 'all'
  },
  admin: {
    patients: 'own-location',
    therapyPlans: 'own-location',
    sessions: 'own-location',
    evaluations: 'own-location',
    reports: 'own-location'
  },
  editor: {
    patients: 'view-only',
    therapyPlans: 'view-only',
    sessions: 'view-only',
    evaluations: 'no-access',
    reports: 'no-access'
  }
};
```

---

## 📊 Reports & Analytics

### **Available Reports:**

1. **Patient Report**
   - Total patients by location
   - New patients per month
   - Patient demographics
   - Active vs inactive patients

2. **Treatment Report**
   - Therapy types usage
   - Sessions completed
   - Average sessions per plan
   - No-show rate

3. **Outcome Report**
   - Treatment success rate
   - Patient satisfaction scores
   - Goal achievement rate
   - Complication rate

4. **Doctor Performance**
   - Evaluations completed
   - Patients handled
   - Average treatment duration
   - Outcome quality

5. **Financial Report**
   - Revenue by therapy type
   - Revenue by location
   - Cost per patient
   - Profitability analysis

---

## 🔄 Workflow Example

```
1. Patient Registration
   ↓
2. Initial Assessment (Create Therapy Plan)
   ↓
3. Schedule Treatment Sessions
   ↓
4. Conduct Sessions (Record vital signs, notes)
   ↓
5. Mid-treatment Evaluation (Progress evaluation)
   ↓
6. Continue/Adjust Treatment
   ↓
7. Final Evaluation (Outcome assessment)
   ↓
8. Treatment Completion / Follow-up Plan
```

---

## 🎨 Color Coding & Status

### **Therapy Plan Status:**
- 🟢 Active - Green
- 🔵 Completed - Blue
- 🔴 Cancelled - Red
- 🟡 On Hold - Yellow

### **Session Status:**
- 🟢 Completed - Green
- 🔵 Scheduled - Blue
- 🔴 Cancelled - Red
- 🟠 No-show - Orange

### **Evaluation Status:**
- 📝 Draft - Gray
- ✅ Final - Green

---

## 📈 Implementation Priority

### **Phase 1: Core Functionality** (High Priority)
1. Patient Management
2. Therapy Planning
3. Treatment Sessions
4. Basic Search & Filter

### **Phase 2: Medical Records** (Medium Priority)
5. Medical Records
6. Medical Evaluations
7. Advanced Filtering

### **Phase 3: Analytics** (Nice to Have)
8. Reports & Dashboard
9. Analytics & Insights
10. Export Features

---

## 💾 Data Migration

### **Sample Data for Testing:**
```typescript
// 20 Sample Patients
// 50 Therapy Plans
// 200 Treatment Sessions
// 30 Medical Evaluations
```

---

## 🎯 Success Metrics

- ✅ Complete patient lifecycle management
- ✅ Seamless therapy planning and tracking
- ✅ Comprehensive medical records
- ✅ Efficient search and filtering
- ✅ Data grouped by relevant categories
- ✅ Location-based access control
- ✅ Insightful reports and analytics

---

## 📅 Estimated Timeline

| Phase | Duration | Effort |
|-------|----------|--------|
| Database Design | 1 day | 4 hours |
| Backend API | 3 days | 18 hours |
| Frontend UI | 5 days | 30 hours |
| Testing | 2 days | 12 hours |
| **Total** | **11 days** | **64 hours** |

---

## 📞 Questions to Clarify

1. **Integration with existing systems?**
   - EMR/EHR integration?
   - Payment gateway?
   - Appointment system?

2. **Data retention policy?**
   - How long to keep patient data?
   - GDPR/HIPAA compliance needed?

3. **Reporting requirements?**
   - What specific metrics are most important?
   - Export format preferences?

4. **User roles?**
   - Just superadmin, or also doctors, nurses?
   - Different permission levels?

---

**Status**: 📋 Proposal - Awaiting Approval  
**Priority**: 🔴 High - Core business feature  
**Effort**: 🔴 High - 11 days implementation  
**Complexity**: 🔴 High - Multiple interconnected entities
