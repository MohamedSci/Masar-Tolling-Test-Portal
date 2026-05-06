## Enhanced Test Data – Testing Type, Level, Tools & Systems

Based on the provided `TestDataRepository`, the following mapping assigns **testing type**, **testing level**, **target system**, and **recommended tools** to each test suite. This ensures comprehensive coverage across **Database**, **API**, and **Web Application** layers.

---

### 🔍 DETECT Stage – Hardware Data Capture

| Suite ID | Title | Testing Type | Testing Level | Target System | Tools |
|----------|-------|--------------|---------------|---------------|-------|
| det-suite1 | ANPR Camera – Plate Recognition | Functional (Manual) + Performance (Stress) | Component | API + Device | Postman, Playwright (for UI verification), SQL (DB logs) |
| det-suite2 | RFID Reader – Tag Detection & Range | Functional (Manual) + Performance (Load) | Component | API + Device | Postman, SQL (event logs) |
| det-suite3 | WIM – Weigh-In-Motion Accuracy | Database Testing + Functional (E2E) | Integration | Database + API | SQL (weight tables), Postman (API validation) |
| det-suite4 | AVC – Vehicle Dimension & Classification | Database Testing + Functional (Manual) | Component | Database + API | SQL, Postman |
| det-suite5 | Axle Counter – Count Accuracy | Database Testing | Component | Database + API | SQL, Postman |
| det-suite6 | Laser Curtain – Detection & Separation | Functional (Manual) + Integration | Component | Device + API | Postman, SQL |
| det-suite7 | Device Health, Connectivity & SNMP | Integration + Performance (Endurance) | Integration | All systems | SQL (heartbeat tables), Postman, Grafana K6 |
| det-suite8 | Environmental & Technical Resilience | Functional (Manual) + Performance (Stress) | System | All systems | Postman, SQL (anomaly logs) |
| det-suite9 | Calibration Verification | Database Testing + Functional (Manual) | Component | Database | SQL (calibration logs), manual checks |

---

### ⚙️ FUSE Stage – Plaza Manager Transaction Creation

| Suite ID | Title | Testing Type | Testing Level | Target System | Tools |
|----------|-------|--------------|---------------|---------------|-------|
| fuse-suite1 | Fusion Rule Validation – Data Merging | Integration + Database Testing | Integration | API + Database | Postman, SQL, Playwright (UI verification) |
| fuse-suite2 | RFID & ANPR Correlation – Confidence Scores | Functional (E2E BDD) | Integration | API + Web App | Playwright, Postman, SQL |
| fuse-suite3 | Axle Count & WIM Integration – Cross-Check | Integration + Database Testing | Integration | API + Database | Postman, SQL |
| fuse-suite4 | Transaction Object – Complete Record Creation | Database Testing | Component | Database | SQL |
| fuse-suite5 | Automatic Validation – Master Transaction | Functional (E2E BDD) | System | API + Web App | Playwright, Postman |
| fuse-suite6 | Manual Validation Flagging – Low Confidence | Functional (E2E BDD) + UAT | System | Web App + API | Playwright, Postman |
| fuse-suite7 | Duplicate Transaction Prevention | Database Testing + Integration | Component | Database + API | SQL, Postman |
| fuse-suite8 | Store-and-Forward – Offline Resilience | Performance (Endurance) + Integration | Integration | API + Database | Postman (simulate outage), SQL |
| fuse-suite9 | Decision Tree – Auto-Ready vs. Escalation | Functional (E2E BDD) | System | Web App + API | Playwright, Postman |
| fuse-suite10 | Concurrency & Load – Peak Traffic | Performance (Load, Stress, Spike) | System | API + Database | Grafana K6, JMeter, SQL |

---

### ✅ VALIDATE Stage – Back Office Rules Engine

| Suite ID | Title | Testing Type | Testing Level | Target System | Tools |
|----------|-------|--------------|---------------|---------------|-------|
| val-suite1 | Business Rules – Tolling & Exemption | Functional (E2E BDD) + Integration | System | API + Web App | Playwright, Postman, SQL |
| val-suite2 | Business Rules – Manual Review | Functional (E2E BDD) | System | Web App + API | Playwright, Postman |
| val-suite3 | Business Rules – Violations | Integration + Database Testing | Integration | API + Database | Postman, SQL |
| val-suite4 | Negative & Edge Cases | Functional (Manual) + Security | Component | API | Postman, OWASP ZAP |
| val-suite5 | Permit Validation – Lifecycle & Expiry | Integration + Database Testing | Integration | API + Database | Postman, SQL |
| val-suite6 | NOC Validation – Approval & Dependency | Integration | Integration | API | Postman |
| val-suite7 | Violation Detection & Fine Calculation | Functional (E2E BDD) + Integration | System | API + Web App | Playwright, Postman |
| val-suite8 | Wallet & Payment Validation – Tahseel | Integration + Performance (Load) | Integration | API + Database | Postman, Grafana K6, SQL |
| val-suite9 | Daily Reconciliation – Financial Integrity | Database Testing + Integration | System | Database + API | SQL, Postman |
| val-suite10 | RBAC & Security – Access Control & Audit | Security (Passive & Active) + UAT | System | Web App + API | OWASP ZAP, Playwright, SQL (audit logs) |
| val-suite11 | Integration Validation – SRTA, Tahseel, Plaza Sync | Integration + Performance (Endurance) | System | API + Database | Postman, SQL, Grafana K6 |
| val-suite12 | Data Integrity – Duplicate Prevention & Mandatory Fields | Database Testing | Component | Database | SQL |
| val-suite13 | Fee & Exemption Configuration – System Parameters | Functional (Manual) + UAT | System | Web App + API | Playwright, Postman |

---

### ⚡ ACTION Stage – Financial Deduction & Fine Issuance

| Suite ID | Title | Testing Type | Testing Level | Target System | Tools |
|----------|-------|--------------|---------------|---------------|-------|
| act-suite1 | Financial Accuracy (Tahseel) | Integration + Performance (Load) | Integration | API + Database | Postman, SQL |
| act-suite2 | Enforcement Workflow (Fines) | Integration + Security | Integration | API | Postman, OWASP ZAP |
| act-suite3 | Notification & Channel Testing | Functional (E2E BDD) | System | Web App + API | Playwright, Postman |
| act-suite4 | End-to-End Performance | Performance (Load, Stress, Spike) | System | All systems | Grafana K6, JMeter, Postman |

---

## Legend

| Term | Meaning |
|------|---------|
| **Functional (Manual)** | Manual execution by QA engineer using UI or API client |
| **Functional (E2E BDD)** | Automated end‑to‑end behaviour‑driven tests (Cucumber + Playwright) |
| **Integration** | Validating interactions between two or more modules/systems |
| **System** | Full system validation (end‑to‑end) |
| **Component** | Isolated testing of a single unit (device, database table, API endpoint) |
| **UAT** | User acceptance testing with real business scenarios |
| **Database Testing** | SQL queries to validate schema, data integrity, stored procedures, performance |
| **API Testing** | Sending requests via Postman or automated scripts; validating responses |
| **Web Application Testing** | Browser automation (Playwright) to verify UI, UX, RTL, interactions |
| **Performance (Load/Stress/Spike/Endurance)** | Conducted with Grafana K6 to simulate concurrent users, traffic spikes, and prolonged load |
| **Security (Passive/Active)** | OWASP ZAP passive scan (intercept & analyse) and active scan (attack simulation) |

---

This mapping ensures that every test case is executed with the appropriate methodology, toolset, and depth, covering all layers of the Masar system.