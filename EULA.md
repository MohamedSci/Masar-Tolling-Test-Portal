# End User License Agreement (EULA)

## Masar Tolling Testing Portal

**Version:** 1.1  
**Effective Date:** 2026  
**Author & Licensor:** Mohamed Said Ibrahim  
**Software:** QA-PaaS — Quality Engineering Platform

---

> **IMPORTANT — READ CAREFULLY BEFORE INSTALLING OR USING THIS SOFTWARE.**
>
> By installing, copying, activating, or otherwise using QA-PaaS, you ("Licensee")
> agree to be legally bound by the terms of this End User License Agreement ("EULA").
> If you do not agree to these terms, do not install or use the Software.
> If you are accepting on behalf of a company or organization, you represent that
> you have the authority to bind that entity to these terms.

---

## 1. Definitions

| Term | Meaning |
|------|---------|
| **Software** | QA-PaaS application, including all source code, binaries, Docker images, documentation, and associated files |
| **Licensor** | Mohamed Said Ibrahim, the sole author and owner of the Software |
| **Licensee** | The individual or legal entity that has purchased a valid subscription and accepted this EULA |
| **License Key** | A cryptographically signed token issued by the Licensor that activates and governs the Licensee's usage rights |
| **Subscription** | A time-limited, tier-based usage entitlement purchased from the Licensor |
| **Authorized Machine** | The single server or workstation on which the Software is installed under a given License Key |

---

## 2. Grant of License

Subject to the Licensee's compliance with this EULA and payment of applicable
subscription fees, the Licensor grants the Licensee a:

- **Limited** — only for the purposes and scope described herein
- **Non-exclusive** — the Licensor may grant identical rights to others
- **Non-transferable** — the license may not be assigned or transferred
- **Non-sublicensable** — the Licensee may not grant rights to third parties
- **Revocable** — the Licensor may terminate this license for breach

license to install and use the Software on the Authorized Machine(s) permitted
by the purchased subscription tier, solely for the Licensee's internal
quality engineering and software testing purposes.

---

## 3. Subscription Tiers and Usage Limits

The Software enforces usage limits locally on the Licensee's machine.
The following tiers are available:

| Tier | Monthly Runs | Performance Minutes | AI Remediation | Intended For |
|------|-------------|---------------------|----------------|--------------|
| **Starter** | 50 | 500 | — | Independent consultants |
| **Pro** | 500 | 5,000 | Included | Development teams |
| **Enterprise** | Unlimited | Unlimited | Included | Banks, Government, Healthcare |

Usage counters (runs consumed, minutes used) are tracked in a local SQLite
database on the Authorized Machine. The Licensee acknowledges that:

- Attempting to reset, manipulate, or circumvent these counters constitutes
  a material breach of this EULA.
- License Keys expire on the date encoded within them. Continued use after
  expiry requires renewal.
- The Licensor reserves the right to modify tier limits upon subscription renewal.

---

## 4. Restrictions

The Licensee shall **NOT**:

1. **Copy or reproduce** the Software beyond what is necessary for a single
   authorized installation and one backup copy.

2. **Reverse engineer, decompile, or disassemble** the Software, or attempt
   to derive the source code from any compiled component.

3. **Modify or create derivative works** based on the Software, in whole or
   in part.

4. **Distribute, sell, rent, lease, lend, or sublicense** the Software or
   any rights therein to any third party.

5. **Remove or alter** any copyright notices, proprietary legends, trademarks,
   or other legal notices embedded in the Software.

6. **Use the Software to build a competing product** or service that replicates
   its core functionality.

7. **Circumvent license enforcement** mechanisms, including but not limited to:
   tampering with the local SQLite database, forging License Keys, modifying
   the license validation logic, or bypassing the subscription gate.

8. **Share the Software** (source code, binaries, Docker images, or
   documentation) with any person or entity that has not purchased a valid
   subscription.

9. **Use the Software in a manner that violates** any applicable law or
   regulation, including data protection laws (GDPR, CCPA, HIPAA).

---

## 5. Intellectual Property

The Software, including all source code, algorithms, user interface designs,
documentation, Docker configurations, and associated materials, is and shall
remain the exclusive intellectual property of the Licensor.

This EULA does not transfer any ownership rights to the Licensee. The Licensee
acquires only the limited usage rights expressly granted herein.

All trademarks, service marks, and trade names associated with QA-PaaS are
the property of the Licensor.

---

## 6. Data Privacy and Security

The Software is designed as an **on-premise solution**. The Licensor affirms:

- The Software does **not** transmit the Licensee's test inputs (Swagger files,
  Postman collections, target URLs, credentials) to any external server.
- All test results, reports, and configuration data are stored exclusively in
  the local SQLite database at `~/.QA-PaaS/qepaas.db` on the Authorized Machine.
- The AI Remediation feature uses a locally running Ollama instance. No test
  data is sent to public AI services unless the Licensee explicitly configures
  an external AI endpoint.
- License Key validation occurs locally after initial activation. Periodic
  re-validation may require a brief internet connection only to retrieve a
  renewed License Key from the Licensor's portal.

The Licensee is solely responsible for securing the Authorized Machine and
the data stored thereon.

---

## 7. Updates and Support

- The Licensor may, at its discretion, provide updates, patches, or new
  versions of the Software. Such updates are subject to this EULA unless
  accompanied by a new agreement.
- Support is provided according to the terms of the purchased subscription tier.
- The Licensor is not obligated to provide updates or support beyond what is
  specified in the subscription agreement.

---

## 8. Disclaimer of Warranties

**THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF
ANY KIND.** THE LICENSOR EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS,
IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WITHOUT LIMITATION:

- WARRANTIES OF MERCHANTABILITY
- FITNESS FOR A PARTICULAR PURPOSE
- NON-INFRINGEMENT
- ACCURACY OR COMPLETENESS OF RESULTS
- THAT THE SOFTWARE WILL BE ERROR-FREE OR UNINTERRUPTED

The Licensee assumes all risk associated with the use of the Software,
including but not limited to the risk of hardware damage, data loss, or
security vulnerabilities discovered during penetration testing activities.

---

## 9. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE
LICENSOR BE LIABLE FOR ANY:

- Indirect, incidental, special, punitive, or consequential damages
- Loss of profits, revenue, data, business, or goodwill
- Cost of substitute goods or services
- Damages arising from unauthorized access to or alteration of the
  Licensee's data

WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER
LEGAL THEORY, EVEN IF THE LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

THE LICENSOR'S TOTAL CUMULATIVE LIABILITY TO THE LICENSEE SHALL NOT EXCEED
THE TOTAL SUBSCRIPTION FEES PAID BY THE LICENSEE IN THE TWELVE (12) MONTHS
IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.

---

## 10. Indemnification

The Licensee agrees to indemnify, defend, and hold harmless the Licensor from
and against any claims, liabilities, damages, losses, and expenses (including
reasonable legal fees) arising out of or in connection with:

- The Licensee's use of the Software in violation of this EULA
- The Licensee's use of the Software to conduct security testing on systems
  for which the Licensee does not have explicit written authorization
- Any breach of applicable law by the Licensee in connection with the Software

---

## 11. Ethical Use and Legal Compliance

The Software includes automated penetration testing capabilities (OWASP ZAP
engine). The Licensee agrees to:

- Use the security testing features **only** on systems and applications for
  which the Licensee has explicit written authorization from the system owner.
- Comply with all applicable laws and regulations regarding computer security
  testing, including but not limited to the Computer Fraud and Abuse Act (CFAA),
  the UK Computer Misuse Act, and equivalent legislation in the Licensee's
  jurisdiction.
- Not use the Software for any malicious, illegal, or unauthorized purpose.

The Licensor accepts no liability for unauthorized or illegal use of the
Software's security testing capabilities.

---

## 12. Term and Termination

**Term:** This EULA is effective from the date of installation or activation
and continues until the subscription expires or is terminated.

**Termination by Licensor:** The Licensor may terminate this EULA immediately
upon written notice if the Licensee:
- Breaches any material term of this EULA
- Fails to pay applicable subscription fees
- Becomes insolvent or subject to bankruptcy proceedings

**Effect of Termination:** Upon termination, the Licensee must:
- Immediately cease all use of the Software
- Uninstall and delete all copies of the Software from all machines
- Destroy any backup copies in their possession

Sections 5 (Intellectual Property), 8 (Disclaimer), 9 (Limitation of
Liability), 10 (Indemnification), and 13 (Governing Law) survive termination.

---

## 13. Governing Law and Dispute Resolution

This EULA shall be governed by and construed in accordance with applicable
international intellectual property and software licensing law.

Any dispute arising out of or in connection with this EULA shall be resolved
through binding arbitration. The arbitration shall be conducted in English.
The arbitrator's decision shall be final and binding on both parties.

Nothing in this section prevents either party from seeking injunctive or other
equitable relief in a court of competent jurisdiction to prevent irreparable
harm pending arbitration.

---

## 14. Entire Agreement

This EULA, together with the Proprietary License file (`LICENSE`) and any
applicable subscription agreement, constitutes the entire agreement between
the Licensor and the Licensee with respect to the Software and supersedes all
prior or contemporaneous understandings, agreements, representations, and
warranties.

---

## 15. Severability

If any provision of this EULA is held to be invalid, illegal, or unenforceable,
the remaining provisions shall continue in full force and effect.

---

## 16. Amendments

The Licensor reserves the right to amend this EULA at any time. Continued use
of the Software after notification of amendments constitutes acceptance of the
revised terms.

---

## Contact and Licensing Inquiries

For licensing questions, permissions, enterprise agreements, or to report
violations:

**Author:** Mohamed Said Ibrahim  
**Product:** QA-PaaS — Quality Engineering Platform  

---

*By installing or using QA-PaaS, you acknowledge that you have read,
understood, and agree to be bound by the terms of this End User License
Agreement.*

---

**Copyright © 2026 Mohamed Said Ibrahim. All Rights Reserved.**  
*Unauthorized copying, distribution, or use of this Software is strictly
prohibited and may result in severe civil and criminal penalties.*
