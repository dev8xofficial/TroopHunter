---
title: 003 Partners Spec
description: Service provider entities, geographical coverage mappings, and rating mechanisms.
schema_version: 1.0.0
---

# 1. Module Overview
The Service Partners module handles external contractors (plumbers, roofers, etc.) serving the platform's clients. It encompasses geographical matching through zip codes, dynamic rating aggregation, and complex verification state logic.

# 2. Core Data Models

### 2.1 Partner Entity (`ServicePartner`)
* **id**: `uuid` (Primary Key)
* **company_name**: `string`
* **category**: `enum` [ `plumbing`, `roofing`, `electrical`, `hvac`, `credit_repair`, `painting`, `landscaping`, `flooring`, `other` ]
* **business_license**: `string`
* **tax_id**: `string`
* **years_in_business**: `int`
* **insurance_verified**: `enum` [ `pending`, `yes`, `no` ]
* **rating**: `decimal` (Calculated field based on user reviews)
* **status**: `enum` [ `pending`, `active`, `suspended`, `inactive` ]
* **internal_notes**: `string`

### 2.2 Coverage Area Entity (`PartnerCoverage`)
Maps a partner to geolocations.
* **partner_id**: `uuid` (Foreign Key -> ServicePartner.id)
* **zip_code**: `string` (Indexed for search)
* **service_radius_miles**: `int`
* **service_type**: `enum` [ `on-site`, `virtual`, `both` ]

### 2.3 Pricing & SLAs (`PartnerSLA`)
* **partner_id**: `uuid`
* **hourly_rate_range**: `string`
* **minimum_charge**: `string`
* **free_estimates**: `enum` [ `yes`, `no`, `conditional` ]
* **emergency_services**: `enum` [ `no`, `yes`, `limited` ]
* **typical_response_time**: `enum` [ `same-day`, `24-hours`, `48-hours`, `week` ]

# 3. API Design & Endpoints

### 3.1 List Partners
#### `GET /api/v1/partners`
Retrieves partners, heavily utilizing geolocation filtering via coverage areas.
* **Query Parameters**:
  * `category`: `enum`
  * `zip_code`: `string` (Performs join against Coverage Entity)
  * `status`: `enum`
  * `search`: `string` (Searches `company_name`)
* **Response**: Paginated array of `ServicePartner` DTOs.

### 3.2 Add Partner
#### `POST /api/v1/partners`
Creates a partner record, including coverage geometries and initial states.
* **Validation Schema Requirements**:
  * `company_name`, `category`, `business_license` are mandatory.
  * `zip_codes` must be an array of valid 5-digit strings.

### 3.3 Partner Verification & Approval
#### `PATCH /api/v1/partners/:partner_id/status`
Admins verify uploaded insurance certs/licenses and alter the status.
* **State Machine**: 
  * `pending` ➔ `active` (Creates the "Verified Partner" internal flag).

# 4. Payload Validations
* `zip_codes` array must conform to regex `^\d{5}$` or the special `"00000"` for global/virtual.
* Service Category enum validation strictly against supported platform tiers.

# 5. Document Attachments
* Partners possess `1:N` Relationships to Documents: `business_license.pdf`, `insurance_certificate.pdf`, `logo.png`.
