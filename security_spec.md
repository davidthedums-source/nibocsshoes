# Security Specification: NIBOCS SHOE Firestore

## 1. Data Invariants
1. Orders must have non-empty `fullName`, `phone`, `productName`, and `size`.
2. Initial status for orders created by customers must always be `'received'`.
3. Appointments must have valid `fullName`, `phone`, `date`, and `purpose`.
4. Initial status for appointments created by clients must always be `'scheduled'`.
5. PII (phone numbers, full names, locations) stored in orders and appointments must NOT be readable by anonymous or unauthenticated public visitors.
6. Only the verified workshop administrator (`davidthedums@gmail.com`) can read, list, update, and manage orders and appointments.
7. Orders and appointments cannot have unexpected ghost fields injected during creation.
8. Document IDs must match standard identifier constraints (`^[a-zA-Z0-9_\\-]+$`).

## 2. Dirty Dozen Payloads & Negative Tests
1. **Ghost Field Injection**: Attempt to create order with `{ isVip: true, freeOfCharge: true }` -> REJECTED.
2. **Status Escalation on Create**: Customer creates order directly with `status: 'completed'` -> REJECTED.
3. **Huge String Injection**: Payload with 1MB `fullName` string -> REJECTED.
4. **Missing Mandatory Fields**: Order missing `phone` or `size` -> REJECTED.
5. **PII Query Scraping**: Anonymous client queries `db.collection('orders').get()` -> PERMISSION_DENIED.
6. **Appointment PII Scraping**: Non-admin user queries `db.collection('appointments').get()` -> PERMISSION_DENIED.
7. **Invalid Status Transition**: Customer attempts to delete an order -> PERMISSION_DENIED.
8. **Malicious ID Path**: Accessing `/orders/../../../etc/passwd` or oversized ID -> REJECTED.
9. **Email Spoofing**: User signs in with spoofed unverified email -> REJECTED.
10. **Arbitrary Field Update**: Non-admin attempts to update order `deliveryLocation` -> PERMISSION_DENIED.
11. **Type Poisoning**: `phone` supplied as a number or boolean instead of a string -> REJECTED.
12. **Catch-All Default Deny**: Direct read/write to unmanaged collections (`/admins/{id}`, `/secret/{id}`) -> PERMISSION_DENIED.
