/**
 * TestDataRepository – Single Responsibility: static test data.
 * Open/Closed: add new stages/suites by extending `stages` only.
 */
class TestDataRepository {
  // ==================== DETECT STAGE ====================
  static #detectStage = {
    name: "Detect – Hardware Data Capture",
    suites: [
      {
        id: "det-suite1", title: "ANPR Camera – Plate Recognition",
        desc: "Validate ANPR captures plates correctly under all conditions. Per ACC-ANPR-01, PM-ALPHA-CMP-001.",
        testCases: [
          { id: "TC-D01", title: "Clean UAE plate, daylight, 30 km/h", expected: "Plate captured; OCR accuracy ≥95%; confidence ≥95%" },
          { id: "TC-D02", title: "Clean plate at night with IR illuminators", expected: "OCR accuracy ≥90%; confidence ≥90%" },
          { id: "TC-D03", title: "Dirty/obscured plate (mud/dust covering 30%)", expected: "Low confidence flag triggered; plate still attempted; confidence <80%" },
          { id: "TC-D04", title: "Damaged plate (bent, scratched)", expected: "Partial read logged; manual validation flag set" },
          { id: "TC-D05", title: "High speed vehicle >100 km/h", expected: "High Speed Capture flag; data integrity maintained; plate captured" },
          { id: "TC-D06", title: "Vehicle with no front plate (missing)", expected: "ANPR returns null; transaction flagged for manual validation" },
          { id: "TC-D07", title: "Foreign plate (non-UAE format)", expected: "OCR attempts read; confidence may be lower; still stored" },
          { id: "TC-D08", title: "Plate at extreme angle (30° from camera axis)", expected: "Still captured if within camera FOV; confidence may drop" }
        ]
      },
      {
        id: "det-suite2", title: "RFID Reader – Tag Detection & Range",
        desc: "Validate RFID read accuracy at various distances. Per ACC-RFID-01, ACC-RFID-02, PM-ALPHA-CMP-002.",
        testCases: [
          { id: "TC-D09", title: "Valid tag at 5m distance", expected: "100% read success" },
          { id: "TC-D10", title: "Valid tag at 10m distance", expected: "100% read success" },
          { id: "TC-D11", title: "Valid tag at 15m distance", expected: "≥98% read success" },
          { id: "TC-D12", title: "Tag mounted on windshield vs. bumper", expected: "Both positions read successfully at 10m" },
          { id: "TC-D13", title: "Vehicle without RFID tag", expected: "Missing Tag flag set; ANPR becomes primary identifier" },
          { id: "TC-D14", title: "Damaged/expired RFID tag", expected: "Read attempted; flagged as invalid; transaction escalated" },
          { id: "TC-D15", title: "Multiple tags in same vehicle (interference)", expected: "Strongest signal selected; conflict logged" },
          { id: "TC-D16", title: "RFID reader antenna misaligned by 15°", expected: "Still reads within 10m; range may reduce; alert if below threshold" }
        ]
      },
      {
        id: "det-suite3", title: "WIM – Weigh-In-Motion Accuracy",
        desc: "Validate weight measurements within ±2% tolerance. Per ACC-WIM-01, ACC-WIM-02, PM-ALPHA-CMP-003.",
        testCases: [
          { id: "TC-D17", title: "Certified truck at 5 km/h – static comparison", expected: "All axle weights and GVW within ±2% of certified reference" },
          { id: "TC-D18", title: "Certified truck at 10 km/h", expected: "GVW within ±2% tolerance" },
          { id: "TC-D19", title: "Certified truck at 20 km/h", expected: "GVW within ±2% tolerance" },
          { id: "TC-D20", title: "Balanced load across all axles", expected: "Sum of axle weights = GVW; each axle within tolerance" },
          { id: "TC-D21", title: "Imbalanced load (heavy left, light right)", expected: "Individual wheel weights aggregated; total GVW accurate" },
          { id: "TC-D22", title: "Abrupt braking while on WIM sensors", expected: "Dynamic shift filtered; corrected static-equivalent weight reported" },
          { id: "TC-D23", title: "Overload vehicle >60 tons", expected: "Immediate Overweight Violation flag sent to Back Office" },
          { id: "TC-D24", title: "Multi-trailer vehicle (double trailer)", expected: "All axle groups measured; total GVW accurate" }
        ]
      },
      {
        id: "det-suite4", title: "AVC – Vehicle Dimension & Classification",
        desc: "Validate dimension measurements within ±5%. Per ACC-AVC-01, PM-ALPHA-CMP-005.",
        testCases: [
          { id: "TC-D25", title: "Calibration vehicle – length measurement", expected: "Within ±5% of certified length" },
          { id: "TC-D26", title: "Calibration vehicle – height measurement", expected: "Within ±5% of certified height" },
          { id: "TC-D27", title: "Calibration vehicle – width measurement", expected: "Within ±5% of certified width" },
          { id: "TC-D28", title: "Standard 2-axle truck classification", expected: "Classified as Medium Truck / Class C1" },
          { id: "TC-D29", title: "Semi-truck (5 axles) classification", expected: "Classified as Trailer (5 Axles) / Class C4" },
          { id: "TC-D30", title: "Motorcycle / small courier van and (Length less than 6 m & Weight less than 7 Ton", expected: "Classified as Light Vehicle or ignored if below gate limits" },
          { id: "TC-D31", title: "AVC laser curtain misalignment by 5cm", expected: "Detection still works; may reduce accuracy; alert generated" }
        ]
      },
      {
        id: "det-suite5", title: "Axle Counter – Count Accuracy",
        desc: "Validate 100% axle count accuracy. Per ACC-AXL-01, PM-ALPHA-CMP-004.",
        testCases: [
          { id: "TC-D32", title: "2-axle vehicle", expected: "Count = 2; 100% accuracy" },
          { id: "TC-D33", title: "3-axle vehicle", expected: "Count = 3; 100% accuracy" },
          { id: "TC-D34", title: "5-axle semi-truck with trailer", expected: "Count = 5; 100% accuracy" },
          { id: "TC-D35", title: "Vehicle enters then reverses out", expected: "Axle counter decrements/resets; no ghost transaction created" },
          { id: "TC-D36", title: "Two vehicles in quick succession (tailgating)", expected: "Axle counts for two separate vehicles; no merging" },
          { id: "TC-D37", title: "Vehicle with lifted axles", expected: "All axles counted including lifted ones" }
        ]
      },
      {
        id: "det-suite6", title: "Laser Curtain – Vehicle Detection & Separation",
        desc: "Validate vehicle presence detection and separation. Per PM-ALPHA-CMP-006.",
        testCases: [
          { id: "TC-D38", title: "Single vehicle passes normally", expected: "Single break event; one transaction created" },
          { id: "TC-D39", title: "Two vehicles with <0.5m gap (tailgating)", expected: "Two distinct break events; two separate IDs generated" },
          { id: "TC-D40", title: "Lane straddling – vehicle between two lanes", expected: "Both lane controllers sync; single vehicle identified; no double billing" },
          { id: "TC-D41", title: "Motorcycle passing at edge of lane", expected: "Still detected; classified appropriately" },
          { id: "TC-D42", title: "Laser curtain blockage (debris)", expected: "Alert generated; lane may enter safe state" }
        ]
      },
      {
        id: "det-suite7", title: "Device Health, Connectivity & SNMP",
        desc: "Validate device monitoring and alerting. Per PM-ALPHA-INT-003, PM-DEV requirements.",
        testCases: [
          { id: "TC-D43", title: "Device heartbeat within 2 seconds (normal)", expected: "All devices respond to poll within 2s" },
          { id: "TC-D44", title: "Ethernet cable disconnected (ANPR)", expected: "Device Offline alert via SNMP within 30 seconds" },
          { id: "TC-D45", title: "RFID reader power failure", expected: "Offline status in UI; alert sent to Back Office" },
          { id: "TC-D46", title: "All devices report health status every 5 minutes", expected: "Central receives health status payload on schedule" },
          { id: "TC-D47", title: "Device reconnection after outage", expected: "Status returns to Online; heartbeat resumes; logged" }
        ]
      },
      {
        id: "det-suite8", title: "Environmental & Technical Resilience",
        desc: "Validate system under stress conditions. Per TC-PLZ-7.11-E, PM risk mitigations.",
        testCases: [
          { id: "TC-D48", title: "Total power loss at lane", expected: "Hardware enters Safe State; UPS activates; data saved" },
          { id: "TC-D49", title: "High temperature >50°C operation", expected: "Sensors continue operating within thermal limits; no data drift" },
          { id: "TC-D50", title: "Heavy rain / water spray on ANPR lens", expected: "ANPR may trigger low confidence; RFID remains primary" },
          { id: "TC-D51", title: "Signal light synchronization", expected: "Red light triggers immediately on Stop command from Plaza Manager" },
          { id: "TC-D52", title: "Dust storm – reduced visibility", expected: "ANPR confidence drops; system relies on RFID/Axle Count; no false transactions" }
        ]
      },
      {
        id: "det-suite9", title: "Calibration Verification (All Devices)",
        desc: "Validate calibration procedures and logs. Per Advanced Test Plan §8.1.",
        testCases: [
          { id: "TC-D53", title: "WIM calibration – monthly verification", expected: "All readings within ±2%; calibration log stored in DB" },
          { id: "TC-D54", title: "AVC calibration – monthly verification", expected: "All dimensions within ±5%; certificate logged" },
          { id: "TC-D55", title: "Axle counter calibration – weekly check", expected: "100% accuracy across 100 test vehicles" },
          { id: "TC-D56", title: "ANPR calibration – weekly test plate set", expected: "≥95% day recognition; calibration timestamp recorded" },
          { id: "TC-D57", title: "RFID calibration – weekly range test", expected: "100% at 10m; ≥98% at 15m; calibration log updated" }
        ]
      }
    ]
  };

  // ==================== FUSE STAGE ====================
  static #fuseStage = {
    name: "Fuse – Plaza Manager Transaction Creation",
    suites: [
      {
        id: "fuse-suite1", title: "Fusion Rule Validation – Data Merging",
        desc: "Verify sensor data correctly merged into unified record. Per TC-PLZ-1.1-E.",
        testCases: [
          { id: "TC-F01", title: "All sensors report data with matching timestamps", expected: "Single unified transaction created; all sensor outputs linked" },
          { id: "TC-F02", title: "Axle counter + laser mapping to ANPR timestamp", expected: "All data mapped to same transaction timestamp; no orphan records" },
          { id: "TC-F03", title: "Weight captured without corresponding plate (orphan)", expected: "No orphan data stored; transaction flagged for review" },
          { id: "TC-F04", title: "Multiple sensors produce consistent vehicle record", expected: "Single transaction contains all sensor outputs; no fragmentation" },
          { id: "TC-F05", title: "Mandatory field missing (no weight data)", expected: "Transaction sent to manual validation; not auto-approved" },
          { id: "TC-F06", title: "All mandatory fields present and valid", expected: "Transaction created with all required fields: Plaza ID, Lane ID, unique Passage ID, timestamp, device status flags" }
        ]
      },
      {
        id: "fuse-suite2", title: "RFID & ANPR Correlation – Confidence Scores",
        desc: "Validate dual-identification logic. Per TC-PLZ-2.1-E, PM-ALPHA-SYS-002.",
        testCases: [
          { id: "TC-F07", title: "RFID and ANPR match – high confidence", expected: "Confidence score ≥95%; both identifiers stored; auto-ready" },
          { id: "TC-F08", title: "RFID valid but ANPR low confidence (dirty plate)", expected: "RFID primary; confidence adjusted; transaction may auto-approve if RFID ≥95%" },
          { id: "TC-F09", title: "ANPR valid but RFID missing", expected: "ANPR primary; Missing Tag flag; confidence may be lower; manual review possible" },
          { id: "TC-F10", title: "Both ANPR and RFID fail/absent", expected: "Transaction created with origin = Manual; all available data logged" }
        ]
      },
      {
        id: "fuse-suite3", title: "Axle Count & WIM Integration – Cross-Check",
        desc: "Validate cross-check between axle counter and WIM. Per TC-PLZ-3.2-E.",
        testCases: [
          { id: "TC-F11", title: "Axle count matches across Axle Counter, AVC, and WIM", expected: "No discrepancy; transaction auto-validated" },
          { id: "TC-F12", title: "Axle Counter reports 5, AVC reports 4 (discrepancy = 1)", expected: "Discrepancy = 1 triggers manual validation; all values logged" },
          { id: "TC-F13", title: "Axle Counter reports 3, AVC reports 6 (discrepancy > 1)", expected: "Major discrepancy; transaction escalated; system flags inconsistency" },
          { id: "TC-F14", title: "WIM axle count differs from Axle Counter", expected: "Cross-check fails; manual validation required; both counts stored" }
        ]
      },
      {
        id: "fuse-suite4", title: "Transaction Object – Complete Record Creation",
        desc: "Validate transaction object structure and mandatory fields. Per TC-PLZ-1.1-E.",
        testCases: [
          { id: "TC-F15", title: "Unique Passage ID generated per transaction", expected: "No duplicate IDs; UUID or sequential unique" },
          { id: "TC-F16", title: "Timestamp recorded with millisecond precision", expected: "Transaction timestamp matches laser curtain trigger time" },
          { id: "TC-F17", title: "Device status flags populated for all sensors", expected: "Each sensor has Online/Offline/Degraded status in transaction record" },
          { id: "TC-F18", title: "Plaza ID and Lane ID correctly assigned", expected: "Transaction linked to correct plaza and lane" }
        ]
      },
      {
        id: "fuse-suite5", title: "Automatic Validation – Master Transaction",
        desc: "Validate auto-approval when confidence ≥95%. Per TC-PLZ-5.1-E, PM-ALPHA-SYS-004.",
        testCases: [
          { id: "TC-F19", title: "All sensors green; confidence ≥95%", expected: "Origin = Master; no manual intervention; synced to Central" },
          { id: "TC-F20", title: "Confidence exactly 95% (boundary)", expected: "Origin = Master (≥95% threshold met)" },
          { id: "TC-F21", title: "Confidence 94% (just below threshold)", expected: "Origin = Manual; transaction routed to manual validation queue" },
          { id: "TC-F22", title: "One sensor offline but others provide sufficient data", expected: "Confidence recalculated; fallback rules applied; may still auto-approve if threshold met" }
        ]
      },
      {
        id: "fuse-suite6", title: "Manual Validation Flagging – Low Confidence",
        desc: "Validate transactions correctly flagged for manual review. Per PM-ALPHA-SYS-005.",
        testCases: [
          { id: "TC-F23", title: "ANPR confidence <60% (obscured plate)", expected: "Status = Review Required; routed to Manual Validation queue" },
          { id: "TC-F24", title: "RFID missing + ANPR low confidence", expected: "Escalation alert sent; transaction requires manual intervention" },
          { id: "TC-F25", title: "Multiple discrepancies (ANPR/RFID mismatch + axle count mismatch)", expected: "Immediate Escalation; all discrepancies logged; alert to Supervisor" },
          { id: "TC-F26", title: "Manual validation timeout (5 minutes without action)", expected: "Transaction escalates automatically; status = Escalation; synced to Central" }
        ]
      },
      {
        id: "fuse-suite7", title: "Duplicate Transaction Prevention",
        desc: "Validate idempotency. Per TC-PLZ-15-NEW, PM-R06.",
        testCases: [
          { id: "TC-F27", title: "Same vehicle passes twice within 2 seconds", expected: "Only one transaction created; second trigger ignored" },
          { id: "TC-F28", title: "Duplicate transaction ID generation attempt", expected: "Database unique constraint enforced; duplicate rejected" },
          { id: "TC-F29", title: "Network retry after successful sync causes duplicate", expected: "Idempotency key prevents duplicate in Central; acknowledgment matched" }
        ]
      },
      {
        id: "fuse-suite8", title: "Store-and-Forward – Offline Resilience",
        desc: "Validate offline queue and recovery. Per TC-PLZ-11.1-E, PM-ALPHA-INT-002.",
        testCases: [
          { id: "TC-F30", title: "Network disconnect during transaction (30 min outage)", expected: "Transaction stored locally; forwarded upon reconnect; no data loss" },
          { id: "TC-F31", title: "500 pending transactions in offline queue", expected: "FIFO order maintained; all synced after recovery; no duplicates" },
          { id: "TC-F32", title: "Plaza Manager restart while offline queue has unsent data", expected: "Queue persisted; transactions survive restart; synced after reboot" },
          { id: "TC-F33", title: "Data integrity after reconnection", expected: "All timestamps and sensor values identical to original capture" }
        ]
      },
      {
        id: "fuse-suite9", title: "Decision Tree – Auto-Ready vs. Escalation",
        desc: "Validate complete decision tree logic. Per PM-ALPHA-SYS-004/005.",
        testCases: [
          { id: "TC-F34", title: "All sensors green + confidence ≥95% → Auto-Ready", expected: "Transaction auto-approved; synced as Master" },
          { id: "TC-F35", title: "RFID high + ANPR low → Review Required", expected: "Since One High Confidence Identificaion then confidence may still meet threshold" },
          { id: "TC-F36", title: "RFID low + ANPR high → Auto-Ready if plate reliable", expected: "ANPR primary; confidence may still meet threshold" },
          { id: "TC-F37", title: "All sensors report but fusion confidence = 0%", expected: "Escalation; transaction sent to Back Office for investigation" }
        ]
      },
      {
        id: "fuse-suite10", title: "Concurrency & Load – Peak Traffic",
        desc: "Validate system under load. Per PM-BETA-PERF-001/002.",
        testCases: [
          { id: "TC-F38", title: "50 trucks per minute steady load for 1 hour", expected: "No dropped transactions; response <500ms; memory stable" },
          { id: "TC-F39", title: "4 lanes simultaneously processing 10 vehicles/min each", expected: "All lanes independent; no cross-lane interference; UI updates <2s" }
        ]
      }
    ]
  };

  // ==================== VALIDATE STAGE ====================
  static #validateStage = {
    name: "Validate – Back Office Rules Engine",
    suites: [
      {
        id: "val-suite1", title: "Business Rules – Tolling & Exemption (Rules 1-6)",
        desc: "Validate toll deduction and exemption scenarios. Per C-BR-001 to C-BR-006.",
        testCases: [
          { id: "TC-V001", title: "Rule 1: ANPR OK, RFID OK, class OK, wallet linked, no permit → Toll deducted", expected: "Toll deducted from wallet; transaction marked Master; positive ID (C-BR-001)" },
          { id: "TC-V002", title: "Rule 2: ANPR OK, RFID fail, class OK, wallet linked, no permit → Toll deducted (plate-only)", expected: "Toll deducted; plate-only flow logged; positive ID (C-BR-002)" },
          { id: "TC-V003", title: "Rule 3: ANPR fail, RFID OK, class OK, wallet linked, no permit → Toll deducted (tag-only)", expected: "Toll deducted; tag-only flow logged; positive ID (C-BR-003)" },
          { id: "TC-V004", title: "Rule 4: ANPR OK, RFID OK, class OK, wallet linked, active permit/exemption → Fee = 0", expected: "Fee = 0; exemption applied; no deduction; exemption logged (C-BR-004)" },
          { id: "TC-V005", title: "Rule 5: ANPR OK, RFID fail, class OK, wallet linked, active exemption → Fee = 0", expected: "Fee = 0; exemption applied despite RFID failure (C-BR-005)" },
          { id: "TC-V006", title: "Rule 6: ANPR fail, RFID OK, class OK, wallet linked, active exemption → Fee = 0", expected: "Fee = 0; exemption applied despite ANPR failure (C-BR-006)" },
          { id: "TC-V007", title: "Exemption with specific date condition (single date match)", expected: "Exemption applied only on matching date; toll deducted on non-matching dates" },
          { id: "TC-V008", title: "Exemption with date range condition", expected: "Exemption applied for all dates within range; expired exemption → toll deducted" },
          { id: "TC-V009", title: "Exemption for specific plaza only", expected: "Exemption applied only at specified plaza; toll deducted at other plazas" }
        ]
      },
      {
        id: "val-suite2", title: "Business Rules – Manual Review (Rules 7-9)",
        desc: "Validate manual review routing for low-confidence transactions. Per C-BR-007 to C-BR-009.",
        testCases: [
          { id: "TC-V010", title: "Rule 7: ANPR OK, RFID OK, class low confidence, wallet linked, no permit → Manual Review", expected: "Transaction held for manual review; images/sensor data attached (C-BR-007)" },
          { id: "TC-V011", title: "Rule 8: ANPR OK, RFID fail, class low confidence, wallet linked, no permit → Manual Review", expected: "Held for manual review; plate image available (C-BR-008)" },
          { id: "TC-V012", title: "Rule 9: ANPR fail, RFID OK, class low confidence, wallet linked, no permit → Manual Review", expected: "Held for manual review; RFID data available (C-BR-009)" },
          { id: "TC-V013", title: "Manual review completed by Operator – approved", expected: "Transaction promoted to Master; toll deducted; audit trail updated" },
          { id: "TC-V014", title: "Manual review completed by Operator – rejected", expected: "Transaction flagged; violation may be generated; reason logged" },
          { id: "TC-V015", title: "Manual review timeout – no action within 5 minutes", expected: "Transaction escalates; status = Escalation; alert sent to Supervisor" }
        ]
      },
      {
        id: "val-suite3", title: "Business Rules – Violations (Rules 10-14)",
        desc: "Validate violation generation for unregistered vehicles, no-ID, and blacklist. Per C-BR-010 to C-BR-014.",
        testCases: [
          { id: "TC-V016", title: "Rule 10: ANPR OK, RFID OK, class OK, wallet NOT linked, no permit → Violation", expected: "Violation generated: 'Unregistered Wallet'; fine requested from SRTA (C-BR-010)" },
          { id: "TC-V017", title: "Rule 11: ANPR OK, RFID fail, class OK, wallet NOT linked, no permit → Violation", expected: "Violation generated: 'Unregistered Wallet' (C-BR-011)" },
          { id: "TC-V018", title: "Rule 12: ANPR fail, RFID OK, class OK, wallet NOT linked, no permit → Violation", expected: "Violation generated: 'Unregistered Wallet' (C-BR-012)" },
          { id: "TC-V019", title: "Rule 13: ANPR fail, RFID fail (no identification) → No ID; Manual Review", expected: "Transaction flagged 'No ID'; sent to manual review with full imagery (C-BR-013)" },
          { id: "TC-V020", title: "Rule 14: Vehicle on SRTA blacklist (stolen plate) → Alert + Violation", expected: "Alert triggered; violation generated; enforcement notified (C-BR-014)" },
          { id: "TC-V021", title: "Blacklisted vehicle with unpaid fines → enhanced penalty", expected: "Higher fine tier applied; all unpaid fines referenced in violation" },
          { id: "TC-V022", title: "Blacklist match but vehicle has active permit", expected: "Alert still generated; permit may be overridden; transaction escalated to Supervisor" }
        ]
      },
      {
        id: "val-suite4", title: "Negative & Edge Cases – Business Rules",
        desc: "Validate edge conditions and error paths. Per C-BR-015 to C-BR-018.",
        testCases: [
          { id: "TC-V023", title: "ANPR OK, RFID OK, class OK, wallet linked but insufficient balance", expected: "Payment failure; pass moved to SRTA queue for fine (C-BR-015)" },
          { id: "TC-V024", title: "ANPR OK, RFID OK, class OK, wallet linked but permit expired", expected: "No exemption; toll attempted; violation generated for expired permit (C-BR-016)" },
          { id: "TC-V025", title: "Vehicle with multiple active violations passes again", expected: "No impact on current transaction; violation history recorded; toll still deducted (C-BR-017)" },
          { id: "TC-V026", title: "Permit suspended due to non-payment", expected: "Treat as no permit; deduct toll; generate violation (C-BR-018)" },
          { id: "TC-V027", title: "Transaction with corrupted confidence data (null)", expected: "System handles gracefully; defaults to manual review; no crash" },
          { id: "TC-V028", title: "Transaction received with future timestamp", expected: "Flagged for review; not processed until time catches up or manual override" },
          { id: "TC-V029", title: "Transaction with missing Plaza ID", expected: "Rejected; error logged; Plaza Manager notified" },
          { id: "TC-V030", title: "Mismatch – Plate A with RFID Tag B", expected: "Fraud/Tamper alert; transaction escalated to Back Office; confidence = 0%" },
        ]
      },
      {
        id: "val-suite5", title: "Permit Validation – Lifecycle & Expiry",
        desc: "Validate permit push, storage, expiry, renewal grace periods, and revocation. Per C-PM-001 to C-PM-016.",
        testCases: [
          { id: "TC-V031", title: "SRTA pushes new permit – stored correctly with all fields", expected: "Permit stored; acknowledgment sent; all fields match payload (C-E2E-001)" },
          { id: "TC-V032", title: "SRTA pushes permit update (extension) – existing permit updated", expected: "Expiry date updated; old values archived in audit log (C-E2E-006)" },
          { id: "TC-V033", title: "SRTA pushes permit revocation – permit marked revoked", expected: "Permit status = Revoked; subsequent transaction triggers violation (C-E2E-007)" },
          { id: "TC-V034", title: "Permit expires at midnight – next transaction triggers violation", expected: "System marks permit expired; violation generated for next transaction" },
          { id: "TC-V035", title: "Renewal within grace period (Day 13 of 14-day grace)", expected: "Warning alert; no late fee; permit renewed (C-PM-015)" },
          { id: "TC-V036", title: "Renewal after grace period (Day 15) – late fee applied", expected: "Late fee calculated; user notified; permit renewed with penalty (C-PM-016)" },
          { id: "TC-V037", title: "Duplicate permit push – ignored with acknowledgment", expected: "Duplicate detected; ignored; acknowledgment sent; no duplicate record" },
          { id: "TC-V038", title: "Invalid permit data format – validation error returned", expected: "Validation error returned to SRTA; permit not stored" },
          { id: "TC-V039", title: "Permit with missing mandatory fields (no plate number)", expected: "Rejected; error logged; SRTA notified" }
        ]
      },
      {
        id: "val-suite6", title: "NOC Validation – Approval & Dependency",
        desc: "Validate NOC storage, approval workflow, expiry, and permit dependency. Per C-NOC-001 to C-NOC-007.",
        testCases: [
          { id: "TC-V040", title: "SRTA pushes NOC data – stored correctly", expected: "NOC stored; all fields validated; acknowledgment sent (C-E2E-009)" },
          { id: "TC-V041", title: "Permit requires NOC reference – valid NOC exists", expected: "Permit accepted; linked to NOC; both visible in UI" },
          { id: "TC-V042", title: "Permit requires NOC but NOC is expired", expected: "Permit rejected; error returned: 'NOC expired'; no permit stored" },
          { id: "TC-V043", title: "Permit requires NOC but NOC not found", expected: "Permit rejected; error: 'Referenced NOC not found'" },
          { id: "TC-V044", title: "NOC expiry – permits referencing it are blocked", expected: "Expired NOC blocks new permit applications; existing permits flagged" },
          { id: "TC-V045", title: "Multi-step NOC approval (3 approvers) – all approve", expected: "NOC approved after all 3 approvals; audit trail maintained (C-NOC-003)" },
          { id: "TC-V046", title: "Multi-step NOC – one approver rejects", expected: "NOC rejected; rejection reason stored; applicant notified (C-NOC-004)" }
        ]
      },
      {
        id: "val-suite7", title: "Violation Detection & Fine Calculation Accuracy",
        desc: "Validate all violation types and fine amounts. Per C-VM-001 to C-VM-018.",
        testCases: [
          { id: "TC-V047", title: "No permit violation – fine requested from SRTA", expected: "SRTA returns fine amount (e.g., 500 AED); violation created with correct amount (C-VM-001)" },
          { id: "TC-V048", title: "Expired permit – 1 day overdue", expected: "Late fee = daily rate × 1 day; violation generated (C-VM-002)" },
          { id: "TC-V049", title: "Overweight violation – 10% over limit", expected: "Fine = weight excess × rate; violation with evidence (C-VM-003)" },
          { id: "TC-V050", title: "Overweight violation – 30% over limit (higher tier)", expected: "Higher penalty tier applied; fine escalated (C-VM-016)" },
          { id: "TC-V051", title: "Single axle overweight", expected: "Axle violation recorded separately; fine calculated per axle (C-VM-004)" },
          { id: "TC-V052", title: "Route violation (wrong gate)", expected: "Route violation generated (C-VM-005)" },
          { id: "TC-V053", title: "Time restriction violation (outside operating hours)", expected: "Time violation generated (C-VM-006)" },
          { id: "TC-V054", title: "Multiple violations in one transaction", expected: "All violations recorded separately; cumulative fine calculated correctly (C-VM-007)" },
          { id: "TC-V055", title: "Grace period – first offense warning", expected: "Warning issued; fine waived if paid within grace period (C-VM-008)" },
          { id: "TC-V056", title: "Repeat offender – 3 violations in 30 days", expected: "Enhanced fine applied; notification sent (C-VM-009)" },
          { id: "TC-V057", title: "Appeal submitted with evidence – fine under review", expected: "Violation status = Under Review; fine frozen (C-VM-010)" },
          { id: "TC-V058", title: "Appeal approved – fine waived", expected: "Fine cancelled; Tahseel reversal requested (C-VM-011)" },
          { id: "TC-V059", title: "Appeal rejected – violation remains", expected: "Violation remains; user notified with reason (C-VM-012)" },
          { id: "TC-V060", title: "Appeal decision within SLA (5 working days)", expected: "Decision communicated within SLA (C-VM-013)" }
        ]
      },
      {
        id: "val-suite8", title: "Wallet & Payment Validation – Tahseel Integration",
        desc: "Validate wallet linking, balance checks, payment posting, idempotency, and retry logic. Per C-INT-TAH-001 to C-INT-TAH-015.",
        testCases: [
          { id: "TC-V061", title: "Post permit fee – success path", expected: "Payment processed; reference returned; permit activated (C-INT-TAH-001)" },
          { id: "TC-V062", title: "Post fine – success path", expected: "Fine posted; reference returned; violation status updated (C-INT-TAH-002)" },
          { id: "TC-V063", title: "Business error – insufficient balance", expected: "Payment failed; pass moved to SRTA queue for fine (C-INT-TAH-003)" },
          { id: "TC-V064", title: "Business error – no registered account", expected: "Payment failed; user notified; pass queued (C-INT-TAH-004)" },
          { id: "TC-V065", title: "System error (timeout) – retry logic (up to 10 times)", expected: "Retry with backoff; after 10 failures, queue paused; IT alert sent (C-INT-TAH-005)" },
          { id: "TC-V066", title: "Duplicate payment prevention (idempotency)", expected: "Second request with same ID rejected; no double charge (C-INT-TAH-006)" },
          { id: "TC-V067", title: "Payment reversal (refund)", expected: "Refund initiated; wallet credited (C-INT-TAH-007)" },
          { id: "TC-V068", title: "Bulk payment posting (100 transactions)", expected: "All processed; success rate ≥99% (C-INT-TAH-008)" },
          { id: "TC-V069", title: "Link Tahseel wallet to Masar account – success", expected: "Link successful; wallet details visible (C-INT-TAH-010)" },
          { id: "TC-V070", title: "Link with invalid credentials – error returned", expected: "Error returned; link failed; no account compromised (C-INT-TAH-011)" },
          { id: "TC-V071", title: "Link non-corporate account – error returned", expected: "Error returned per Tahseel BRD (C-INT-TAH-012)" },
          { id: "TC-V072", title: "View wallet balance", expected: "Balance displayed correctly (C-INT-TAH-013)" },
          { id: "TC-V073", title: "Top-up wallet via credit card", expected: "Payment processed; balance updated (C-INT-TAH-014)" },
          { id: "TC-V074", title: "Top-up wallet via Apple Pay", expected: "Payment processed; balance updated (C-INT-TAH-015)" }
        ]
      },
      {
        id: "val-suite9", title: "Daily Reconciliation – Financial Integrity",
        desc: "Validate end-of-day reconciliation between Central fines and Tahseel settlement. Per C-INT-TAH-009, C-E2E-011, C-E2E-012.",
        testCases: [
          { id: "TC-V075", title: "Daily reconciliation – all fines matched", expected: "100% match; reconciliation report shows zero discrepancies (C-E2E-011)" },
          { id: "TC-V076", title: "Reconciliation – one missing fine in Tahseel settlement", expected: "Discrepancy identified; missing fine listed in report (C-E2E-012)" },
          { id: "TC-V077", title: "Reconciliation – amount mismatch (expected 500, got 450)", expected: "Amount mismatch flagged; both values shown; alert sent" },
          { id: "TC-V078", title: "Reconciliation – fine in Tahseel not in Central", expected: "Unmatched item flagged; investigation required" },
          { id: "TC-V079", title: "Reconciliation report export (Excel/CSV/PDF)", expected: "Export generated; content matches UI (C-INT-TAH-009)" },
          { id: "TC-V080", title: "Discrepancy ≤0.1% for financial data (acceptance threshold)", expected: "Within tolerance; auto-approved; report archived" }
        ]
      },
      {
        id: "val-suite10", title: "RBAC & Security – Access Control & Audit",
        desc: "Validate role-based access, audit trails, and security controls. Per C-UR-001 to C-UR-007, C-SEC-001 to C-SEC-010.",
        testCases: [
          { id: "TC-V081", title: "SRTA Operator – can view transactions (read-only)", expected: "Dashboard accessible; transactions visible; no edit capabilities (C-E2E-013)" },
          { id: "TC-V082", title: "SRTA Operator – cannot access Reconciliation Reports", expected: "Menu item hidden or 403 Forbidden; access blocked" },
          { id: "TC-V083", title: "SRTA Operator – cannot access User Management", expected: "Menu item hidden or 403 Forbidden" },
          { id: "TC-V084", title: "Tahseel Finance User – can access reconciliation reports", expected: "Finance modules accessible; reports viewable" },
          { id: "TC-V085", title: "Tahseel Finance User – cannot access User Management", expected: "Blocked; 403 Forbidden" },
          { id: "TC-V086", title: "SRTA Supervisor – can view audit logs", expected: "Audit logs visible; all entries searchable" },
          { id: "TC-V087", title: "SRTA Supervisor – can create new users", expected: "User creation form accessible; new user saved with correct role" },
          { id: "TC-V088", title: "Audit trail completeness – all user actions logged", expected: "Login, permit view, transaction view, exports all logged with timestamp, user ID, IP, action type (C-E2E-014)" },
          { id: "TC-V089", title: "Audit logs are append-only (immutable)", expected: "No deletion or modification of log entries possible" },
          { id: "TC-V090", title: "Session timeout after 15 minutes of inactivity", expected: "Auto-logout; redirect to login page (C-UR-006)" },
          { id: "TC-V091", title: "Brute force protection – 5 failed login attempts", expected: "Account locked; CAPTCHA triggered (C-SEC-003)" },
          { id: "TC-V092", title: "SQL injection attempt on transaction filter", expected: "Blocked; input sanitized; no data exposed (C-SEC-009)" },
          { id: "TC-V093", title: "XSS attempt in permit notes field", expected: "Blocked; output encoded; script not executed (C-SEC-010)" },
          { id: "TC-V094", title: "TLS 1.2+ enforced for all external communications", expected: "Verified via penetration test; no downgrade possible (C-SEC-006)" }
        ]
      },
      {
        id: "val-suite11", title: "Integration Validation – SRTA, Tahseel, Plaza Sync",
        desc: "Validate all integration points function correctly. Per C-INT-PM-*, C-INT-SRTA-*, C-INT-TAH-*.",
        testCases: [
          { id: "TC-V095", title: "SRTA permit push API – single permit received", expected: "Permit stored; 200 OK; acknowledgment sent (C-INT-SRTA-001)" },
          { id: "TC-V096", title: "SRTA permit push API – batch of 100 permits", expected: "All stored; no data loss; acknowledgment for each" },
          { id: "TC-V097", title: "SRTA fine calculation API – success", expected: "Fine amount returned; violation created (C-E2E-002)" },
          { id: "TC-V098", title: "SRTA fine calculation API – temporary failure + retry success", expected: "Retries up to 10 times; eventual success; violation created (C-E2E-004)" },
          { id: "TC-V099", title: "SRTA fine calculation API – max retries exceeded", expected: "Queue paused after 10 failures; IT alert sent; no partial data (C-E2E-005)" },
          { id: "TC-V100", title: "Plaza Manager sends single Master transaction", expected: "Transaction stored; acknowledgment sent (C-INT-PM-001)" },
          { id: "TC-V101", title: "Plaza Manager sends batch of 100 transactions", expected: "All processed; order preserved (C-INT-PM-002)" },
          { id: "TC-V102", title: "Duplicate transaction from Plaza (same TrnxCode)", expected: "Duplicate detected; rejected with error (C-INT-PM-004)" },
          { id: "TC-V103", title: "Plaza offline for 2 hours – replay queued transactions", expected: "All received; no duplicates; timestamps preserved (C-INT-PM-005)" },
          { id: "TC-V104", title: "Tahseel fine posting – success with reference", expected: "Fine posted; reference stored; violation updated (C-INT-TAH-002)" },
          { id: "TC-V105", title: "Integration health dashboard shows all systems green", expected: "Plaza, SRTA, Tahseel all showing OK status (CS-INT-01)" },
          { id: "TC-V106", title: "Integration failure >15 minutes – alert generated", expected: "Alert visible in dashboard; email sent to admin (CS-INT-03)" }
        ]
      },
      {
        id: "val-suite12", title: "Data Integrity – Duplicate Prevention & Mandatory Fields",
        desc: "Validate data integrity across all modules. Per Daily QA Checklist §3, C-DATA-001 to C-DATA-005.",
        testCases: [
          { id: "TC-V107", title: "No orphaned transactions (without linked vehicle/permit)", expected: "Zero orphaned records in database" },
          { id: "TC-V108", title: "No duplicate transaction codes in last 24 hours", expected: "Zero duplicates; unique constraint enforced" },
          { id: "TC-V109", title: "All violations have corresponding transactions", expected: "100% linkage; no violation without source transaction" },
          { id: "TC-V110", title: "No violations with NULL fine amounts", expected: "All violations have valid fine amounts; NULL not permitted" },
          { id: "TC-V111", title: "All violations have evidence attached (plate image, timestamp)", expected: "Evidence present for every violation; no missing images" },
          { id: "TC-V112", title: "Timestamp consistency across Plaza, Central, Tahseel", expected: "UTC timestamps; millisecond precision; no drift >1 second" },
          { id: "TC-V113", title: "Data integrity across full chain (Plaza → Central → Tahseel)", expected: "All fields match; no corruption; hash verified (C-DATA-004)" },
          { id: "TC-V114", title: "Historical data retrieval (7 years) – performance within SLA", expected: "Data accessible; query returns within SLA (C-DATA-005)" }
        ]
      },
      {
        id: "val-suite13", title: "Fee & Exemption Configuration – System Parameters",
        desc: "Validate fee structures, exemption rules, working hours, and system parameters. Per CS-FEE-*, CS-EXEMPT-*, CS-HOURS-*, CS-PARAM-*.",
        testCases: [
          { id: "TC-V115", title: "Fee structure visibility – view fee names, prices, validity periods", expected: "Fee structures displayed correctly; data sourced from SRTA (CS-FEE-004)" },
          { id: "TC-V116", title: "Fee validity – End Date ≥ Start Date enforced", expected: "Validation error if End Date < Start Date; clear inline message (CS-FEE-005)" },
          { id: "TC-V117", title: "Create exemption rule with date range condition", expected: "Rule saved; dynamic form fields appear based on selections (CS-EXEMPT-01)" },
          { id: "TC-V118", title: "Search and export exemption rules", expected: "Filter works; export to Excel/CSV/PDF functional (CS-EXEMPT-03)" },
          { id: "TC-V119", title: "Define working hours per plaza/lane – logical validation", expected: "Begin Time ≤ End Time enforced; clear error on invalid input (CS-HOURS-01)" },
          { id: "TC-V120", title: "System parameter assignment to scope (Global/Plaza/Lane)", expected: "Parameter overrides applied correctly at each scope level (CS-PARAM-01)" },
          { id: "TC-V121", title: "Truck classification rules – class name, axle count, dimensions, GVW", expected: "Classification rules saved; applied to incoming transactions (CS-FEE-002)" },
          { id: "TC-V122", title: "Link truck classification to tollable class", expected: "Correct enforcement rules applied per vehicle type (CS-FEE-003)" }
        ]
      }
    ]
  };

  // ==================== ACTION STAGE ====================
  static #actionStage = {
    name: "Action – Financial Deduction & Fine Issuance",
    suites: [
      {
        id: "act-suite1", title: "Financial Accuracy (Tahseel)",
        desc: "Deduction precision, wallet checks, duplicate handling.",
        testCases: [
          { id: "TC-A01", title: "Standard fee deduction for Semi-truck", expected: "Amount matches tariff table exactly" },
          { id: "TC-A02", title: "Insufficient wallet balance", expected: "Transaction gracefully rejected; user notified" },
          { id: "TC-A03", title: "Deduction precision to last cent", expected: "No rounding errors (e.g., 10.55 not 10.6)" },
          { id: "TC-A04", title: "Duplicate transaction within same minute", expected: "Idempotency check; only one deduction processed" }
        ]
      },
      {
        id: "act-suite2", title: "Enforcement Workflow (Fines)",
        desc: "Violation data transmission to Government API.",
        testCases: [
          { id: "TC-A05", title: "Violation with ANPR images (correct JSON payload)", expected: "All required fields present; base64 image attached" },
          { id: "TC-A06", title: "Double jeopardy prevention (single pass)", expected: "Only one fine per unique transaction ID" },
          { id: "TC-A07", title: "Unregistered vehicle + no Tahseel account", expected: "Fine issued with maximum penalty" },
          { id: "TC-A08", title: "Overweight vehicle (>60t) fine calculation", expected: "Overweight surcharge added to fine" }
        ]
      },
      {
        id: "act-suite3", title: "Notification & Channel Testing",
        desc: "SMS/Email alerts via Masar identifiers.",
        testCases: [
          { id: "TC-A09", title: "SMS warning triggered for expiring permit", expected: "SMS delivered within 2 minutes" },
          { id: "TC-A10", title: "Email notification for fine issuance", expected: "Email contains violation details and payment link" },
          { id: "TC-A11", title: "Bulk upload fleet registration (Excel)", expected: "All 50 vehicles mapped; welcome emails sent" },
          { id: "TC-A12", title: "Insufficient funds notification", expected: "User receives top-up prompt" }
        ]
      },
      {
        id: "act-suite4", title: "End-to-End Performance",
        desc: "Latency measurement under various conditions.",
        testCases: [
          { id: "TC-A13", title: "Vehicle pass to balance deduction (normal load)", expected: "< 2 seconds" },
          { id: "TC-A14", title: "Pass to fine issuance notification (under load)", expected: "< 10 seconds" },
          { id: "TC-A15", title: "Latency during peak hour (50 TPM)", expected: "No degradation beyond 3 seconds for deduction" }
        ]
      }
    ]
  };

  // ==================== PUBLIC API ====================

  /** Assembled stages map – single source of truth */
  static get stages() {
    return {
      detect: this.#detectStage,
      fuse: this.#fuseStage,
      validate: this.#validateStage,
      action: this.#actionStage
    };
  }

  // ==================== HELP CONTENT ====================
  static helpContent = {
    "det-suite1": { title: "ANPR – Plate Recognition", steps: "1. Position test vehicle with clean/dirty/damaged plate. 2. Drive at specified speeds. 3. Test day/night with IR. 4. Check Plaza Manager logs for plate data and confidence scores.", testData: "UAE plates, foreign plates, damaged plates, obscured plates.", instructions: "Clean lens before day tests; use IR illuminators at night.", environment: "SIT lane with calibrated ANPR camera." },
    "det-suite2": { title: "RFID – Tag Detection", steps: "1. Position vehicle at 5m, 10m, 15m from reader. 2. Test with valid, damaged, and missing tags. 3. Verify read success rate.", testData: "Valid RFID tags, expired tags, vehicles without tags.", instructions: "Ensure antenna alignment; avoid metal obstructions.", environment: "SIT lane with RFID reader." },
    "det-suite3": { title: "WIM Accuracy", steps: "1. Drive certified calibration truck at 5, 10, 20 km/h. 2. Compare recorded weights to certified reference. 3. Test imbalanced load, abrupt braking, overload.", testData: "Certified truck with known axle and gross weights.", instructions: "Allow sensor stabilization between runs; ensure smooth pavement.", environment: "SIT lane with calibrated WIM sensors." },
    "det-suite4": { title: "AVC Dimensions", steps: "1. Pass calibration vehicle with certified dimensions. 2. Compare recorded length, height, width to reference. 3. Test various vehicle classes.", testData: "Calibration vehicle, 2-axle truck, 5-axle semi, motorcycle.", instructions: "Verify laser curtain alignment weekly; clean sensors.", environment: "SIT lane with calibrated AVC." },
    "det-suite5": { title: "Axle Counter", steps: "1. Pass vehicles with known axle counts (2, 3, 5 axles). 2. Test reverse movement. 3. Verify no ghost transactions.", testData: "2-axle, 3-axle, 5-axle vehicles.", instructions: "Check sensor sensitivity; adjust for vehicle speed.", environment: "SIT lane with Axle Counter." },
    "det-suite6": { title: "Laser Curtain", steps: "1. Pass single vehicle. 2. Pass two vehicles in close succession. 3. Test lane straddling. 4. Test with debris/blockage.", testData: "Single vehicle, two vehicles tailgating, motorcycle.", instructions: "Ensure laser curtain aligned; no obstructions.", environment: "SIT lane with Laser Curtain." },
    "det-suite7": { title: "Device Health", steps: "1. Monitor device heartbeats. 2. Disconnect Ethernet/power to devices. 3. Verify SNMP alerts and UI status updates.", testData: "All lane devices operational.", instructions: "Use network emulator; monitor alert timing.", environment: "SIT environment with SNMP monitoring." },
    "det-suite8": { title: "Environmental Resilience", steps: "1. Simulate power loss, high temperature, rain, dust. 2. Verify sensor behavior and alerting.", testData: "Climate chamber, water spray, dust simulation.", instructions: "Record ambient conditions; verify data integrity.", environment: "SIT lane with environmental controls." },
    "det-suite9": { title: "Calibration Verification", steps: "1. Execute calibration procedures for each device. 2. Verify readings within tolerance. 3. Check calibration logs in database.", testData: "Certified test vehicles and weights.", instructions: "Document all calibration events; sign off.", environment: "SIT lane." },
    "fuse-suite1": { title: "Fusion Rules", steps: "Use MockServer to inject sensor data. Verify unified record creation; test missing field scenarios.", testData: "Mock sensor payloads with various combinations.", instructions: "Ensure timestamps synchronized.", environment: "Plaza Manager sandbox with MockServer." },
    "fuse-suite2": { title: "RFID & ANPR Correlation", steps: "Present vehicles with various RFID/plate combinations. Check confidence scores and fallback logic.", testData: "Matching and mismatched RFID tags and plates.", instructions: "Monitor confidence calculation in real-time.", environment: "SIT lane." },
    "fuse-suite3": { title: "Axle & WIM Cross-Check", steps: "Pass vehicles with known axle counts. Introduce discrepancies via sensor simulation.", testData: "Vehicles with 2-6 axles.", instructions: "Verify manual validation flag on discrepancy.", environment: "SIT lane with all sensors." },
    "fuse-suite4": { title: "Transaction Object", steps: "Trigger passage. Verify all mandatory fields populated in database.", testData: "Standard test vehicle.", instructions: "Check DB directly after passage.", environment: "SIT lane." },
    "fuse-suite5": { title: "Auto-Validation", steps: "Trigger passages with varying confidence levels. Verify Master vs Manual routing.", testData: "Vehicles with high and low confidence scenarios.", instructions: "Set confidence threshold to 95%.", environment: "SIT lane." },
    "fuse-suite6": { title: "Manual Validation Flagging", steps: "Trigger low-confidence transactions. Verify they appear in Manual Validation queue.", testData: "Vehicles with obscured plates, missing RFID.", instructions: "Monitor queue and escalation timer.", environment: "SIT lane + Web App." },
    "fuse-suite7": { title: "Duplicate Prevention", steps: "Trigger same vehicle twice within 2 seconds. Check for single transaction.", testData: "Standard test vehicle.", instructions: "Verify database unique constraint.", environment: "SIT lane." },
    "fuse-suite8": { title: "Store-and-Forward", steps: "Disconnect network during transaction. Verify local storage and sync after reconnect.", testData: "Multiple test vehicles.", instructions: "Wait for full reconnect before verification.", environment: "SIT lane with simulated WAN outage." },
    "fuse-suite9": { title: "Decision Tree", steps: "Configure confidence thresholds. Simulate various sensor combinations.", testData: "Confidence values from 0% to 100%.", instructions: "Document each decision path.", environment: "Plaza Manager UI." },
    "fuse-suite10": { title: "Concurrency & Load", steps: "Use JMeter to simulate 50 TPM load. Monitor CPU, memory, dropped packets.", testData: "50 vehicles/minute payload.", instructions: "Run for minimum 1 hour.", environment: "JMeter on separate host; Plaza Manager on target." },
    "val-suite1": { title: "Business Rules – Tolling & Exemption", steps: "1. Prepare vehicles with various ANPR/RFID/class/wallet/permit combinations. 2. Send transactions from Plaza Manager. 3. Verify toll deduction or exemption applied per Rules 1-6.", testData: "Vehicles with valid/invalid ANPR, RFID, class confidence; wallets with/without balance; active/expired permits.", instructions: "Reference Business Rules matrix (Rules 1-6).", environment: "Central System SIT with Plaza Manager simulator and mock Tahseel." },
    "val-suite2": { title: "Business Rules – Manual Review", steps: "1. Send transactions with low classification confidence. 2. Verify they appear in manual validation queue. 3. Test operator approval/rejection and escalation timeout.", testData: "Transactions with class confidence <95%.", instructions: "Set confidence threshold per Central configuration.", environment: "Central System SIT with Plaza Manager simulator." },
    "val-suite3": { title: "Business Rules – Violations", steps: "1. Send transactions for unregistered vehicles, no-ID cases, and blacklisted vehicles. 2. Verify violation generation per Rules 10-14.", testData: "Vehicles without wallet links; blacklisted plates; vehicles with no identification.", instructions: "Ensure SRTA fine calculation API is mocked.", environment: "Central System SIT with mock SRTA API." },
    "val-suite4": { title: "Negative & Edge Cases", steps: "1. Test insufficient balance, expired permits, suspended permits, corrupted data, future timestamps. 2. Verify graceful handling.", testData: "Wallets with low balance; expired/suspended permits; null confidence values.", instructions: "Test each edge case independently.", environment: "Central System SIT." },
    "val-suite5": { title: "Permit Validation", steps: "1. Push permits via SRTA API (create, update, revoke). 2. Verify storage and subsequent transaction behavior. 3. Test grace period logic.", testData: "New permits, extension updates, revocations; expired permits at Day 13, 14, 15.", instructions: "Verify audit logs after each SRTA push.", environment: "Central System SIT with mock SRTA permit API." },
    "val-suite6": { title: "NOC Validation", steps: "1. Push NOC data via SRTA API. 2. Push permits requiring NOC references. 3. Test with valid, expired, and missing NOCs.", testData: "Valid NOC, expired NOC, non-existent NOC reference.", instructions: "Test multi-step approval workflow.", environment: "Central System SIT with mock SRTA API." },
    "val-suite7": { title: "Violation Detection & Fine Calculation", steps: "1. Trigger each violation type. 2. Verify fine amounts returned by SRTA. 3. Test appeal workflow end-to-end.", testData: "Vehicles with no permit, expired permit, overweight (10%, 30%), wrong route, time violation.", instructions: "Verify fine accuracy matches SRTA tariff table.", environment: "Central System SIT with mock SRTA fine API and Tahseel sandbox." },
    "val-suite8": { title: "Wallet & Payment Validation", steps: "1. Test fee/fine posting to Tahseel. 2. Test success, business errors, system errors, retry logic, idempotency. 3. Test wallet linking and top-up.", testData: "Valid wallets, insufficient balance accounts, invalid credentials.", instructions: "Monitor retry queue; verify max 10 retries with backoff.", environment: "Central System SIT with Tahseel test environment." },
    "val-suite9": { title: "Daily Reconciliation", steps: "1. Run reconciliation job. 2. Verify matching, missing, and mismatched fines. 3. Test discrepancy thresholds (≤0.1%).", testData: "Full day of posted fines; Tahseel settlement file with injected discrepancies.", instructions: "Run reconciliation manually and verify scheduled job execution.", environment: "Central System SIT with Tahseel test settlement files." },
    "val-suite10": { title: "RBAC & Security", steps: "1. Login as each role. 2. Verify access permissions. 3. Test audit trail completeness. 4. Test security controls.", testData: "User accounts for each role; login attempts (valid, invalid, brute force).", instructions: "Verify 403 responses for unauthorized API calls.", environment: "Central System SIT with all roles configured." },
    "val-suite11": { title: "Integration Validation", steps: "1. Test all integration points: Plaza→Central, Central↔SRTA, Central↔Tahseel. 2. Test retry logic, duplicate prevention, offline recovery.", testData: "Transactions, permits, fine requests, payment postings.", instructions: "Monitor integration logs for errors; verify health dashboard.", environment: "Full SIT environment with all external endpoints." },
    "val-suite12": { title: "Data Integrity", steps: "1. Query database for orphans, duplicates, NULLs. 2. Verify cross-system data consistency. 3. Test historical data retrieval.", testData: "Production-like data volume across all tables.", instructions: "Run Daily QA Checklist queries.", environment: "Central System SIT database." },
    "val-suite13": { title: "Fee & Exemption Configuration", steps: "1. View and verify fee structures. 2. Create exemption rules with various conditions. 3. Set working hours and system parameters.", testData: "Fee structures, exemption rules, plaza working hours, parameter scopes.", instructions: "Test date validation, dynamic form fields, and scope inheritance.", environment: "Central System SIT with full configuration access." },
    "act-suite1": { title: "Financial Accuracy", steps: "Use test wallets. Execute deductions. Verify precision.", testData: "10 AED balance, fee 5.50 AED.", instructions: "Check Tahseel transaction log.", environment: "Tahseel sandbox." },
    "act-suite2": { title: "Enforcement Workflow", steps: "Trigger violation. Inspect JSON payload to Gov API.", testData: "Violation vehicle data.", instructions: "Verify all required fields present.", environment: "Government API mock." },
    "act-suite3": { title: "Notification", steps: "Upload Excel fleet file. Verify SMS/email received.", testData: "Excel with 50 vehicles.", instructions: "Check spam folder.", environment: "Notification gateway test." },
    "act-suite4": { title: "E2E Performance", steps: "Measure latency from lane trigger to deduction log.", testData: "Standard test vehicle.", instructions: "Warm up system before measurement.", environment: "Integrated test environment." }
  };
}

window.TestDataRepository = TestDataRepository;
