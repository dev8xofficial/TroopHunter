/**
 * mock-data.js — Shared Demo Fixtures (Auth Domain 001–005)
 *
 * Provides structured fixture data consumed by MockAPI implementations
 * across all auth-domain component modules. Keeps mock responses
 * consistent with the spec contracts without duplicating configuration.
 *
 * Spec coverage:
 *   contracts/access-control.yaml — all 6 role definitions
 *   contracts/api.yaml            — endpoint response shapes
 *   contracts/events.yaml         — audit envelope template
 *   001-authentication            — users, sessions, lockout
 *   002-portal-routing            — portal configs, route resolution
 *   003-mfa                       — challenge settings
 *   004-password-reset            — token settings
 *   005-sso                       — provider eligibility
 *   ADR-010                       — portal-specific auth policies
 */

(function MockData() {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // DEMO USERS (001-authentication)
  // One user per platform role — covers all RBAC paths.
  // Constitution §3: six canonical roles
  // ═══════════════════════════════════════════════════════════

  var USERS = [
    {
      id: 'usr-cand-001',
      email: 'sarah.johnson@example.com',
      first_name: 'Sarah',
      last_name: 'Johnson',
      role: 'candidate',
      status: 'active',
      portal: 'candidate',
      failed_login_attempts: 0,
    },
    {
      id: 'usr-client-001',
      email: 'mike.chen@clientco.com',
      first_name: 'Mike',
      last_name: 'Chen',
      role: 'client',
      status: 'active',
      portal: 'client',
      failed_login_attempts: 0,
    },
    {
      id: 'usr-hradmin-001',
      email: 'priya.patel@dev8x.com',
      first_name: 'Priya',
      last_name: 'Patel',
      role: 'hr_admin',
      status: 'active',
      portal: 'admin',
      failed_login_attempts: 0,
    },
    {
      id: 'usr-super-001',
      email: 'david.kim@dev8x.com',
      first_name: 'David',
      last_name: 'Kim',
      role: 'super_admin',
      status: 'active',
      portal: 'admin',
      failed_login_attempts: 0,
    },
    {
      id: 'usr-sales-001',
      email: 'alex.rivera@dev8x.com',
      first_name: 'Alex',
      last_name: 'Rivera',
      role: 'sales_rep',
      status: 'active',
      portal: 'crm',
      failed_login_attempts: 0,
    },
    {
      id: 'usr-mgr-001',
      email: 'rachel.moore@dev8x.com',
      first_name: 'Rachel',
      last_name: 'Moore',
      role: 'manager',
      status: 'active',
      portal: 'crm',
      failed_login_attempts: 0,
    },
  ];

  // ═══════════════════════════════════════════════════════════
  // PORTAL ROUTE REGISTRY (002-portal-routing)
  // FR-002-01: enabled portals + default landing routes
  // FR-002-02: role-to-portal match
  // Data model: PortalConfig
  // ═══════════════════════════════════════════════════════════

  var PORTAL_ROUTES = {
    candidate: {
      portal_key: 'candidate',
      portal_label: 'Candidate Portal',
      default_route: '/candidate/dashboard',
      allowed_roles: ['candidate'],
      enabled: true,
    },
    client: {
      portal_key: 'client',
      portal_label: 'Client Portal',
      default_route: '/client/dashboard',
      allowed_roles: ['client'],
      enabled: true,
    },
    admin: {
      portal_key: 'admin',
      portal_label: 'HR Admin Panel',
      default_route: '/admin/dashboard',
      allowed_roles: ['hr_admin', 'super_admin', 'manager'],
      enabled: true,
    },
    crm: {
      portal_key: 'crm',
      portal_label: 'CRM Platform',
      default_route: '/crm/dashboard',
      allowed_roles: ['sales_rep', 'manager'],
      enabled: true,
    },
  };

  // ═══════════════════════════════════════════════════════════
  // SESSION POLICIES (001-authentication, ADR-010)
  // Per-portal auth requirements and lockout configuration.
  // ═══════════════════════════════════════════════════════════

  var SESSION_POLICIES = {
    candidate: {
      ttl_hours: 24,
      remember_me_days: 30,
      max_attempts: 5,
      lockout_minutes: 30,
      mfa_required: false,
      sso_enabled: true,
      self_registration: true,
      session_label: '24 h',
    },
    client: {
      ttl_hours: 24,
      remember_me_days: 30,
      max_attempts: 5,
      lockout_minutes: 30,
      mfa_required: false,
      sso_enabled: true,
      self_registration: false,
      session_label: '24 h',
    },
    admin: {
      ttl_hours: 4,
      remember_me_days: 0, // No "remember me" (ADR-010)
      max_attempts: 3,
      lockout_minutes: 60,
      mfa_required: true, // Constitution G-09
      sso_enabled: false, // ADR-010
      self_registration: false,
      session_label: '4 h',
    },
    crm: {
      ttl_hours: 8,
      remember_me_days: 0,
      max_attempts: 5,
      lockout_minutes: 30,
      mfa_required: false,
      sso_enabled: false, // ADR-010
      self_registration: false,
      session_label: '8 h',
    },
  };

  // ═══════════════════════════════════════════════════════════
  // MFA FIXTURES (003-mfa, ADR-010)
  // ═══════════════════════════════════════════════════════════

  var MFA_FIXTURES = {
    // FR-003-02: any 6-digit code is valid in demo
    valid_totp_pattern: /^\d{6}$/,
    // BR-003-02: recovery code minimum length
    valid_recovery_min_len: 8,
    // FR-003-02: 3 failed attempts → terminal failed state
    max_attempts: 3,
    // ADR-010: 30-second TOTP window
    totp_window_secs: 30,
    // BR-003-02: warn when fewer than 2 codes remain
    recovery_low_threshold: 2,
    // INV-003-01 terminal states
    terminal_states: ['verified', 'failed', 'expired'],
  };

  // ═══════════════════════════════════════════════════════════
  // PASSWORD RESET FIXTURES (004-password-reset)
  // ═══════════════════════════════════════════════════════════

  var RESET_FIXTURES = {
    // FR-004-01: 24-hour token TTL
    token_ttl_hours: 24,
    // Demo: 6-digit numeric code
    token_code_length: 6,
    valid_token_pattern: /^\d{6}$/,
    // ADR-010 / access-control password policy
    password_min_length: 8,
    password_complexity: {
      uppercase: true,
      lowercase: true,
      digit: true,
    },
    // BR-004-02: simulated session count revoked on reset
    sessions_revoked_on_reset: 2,
    // INV-004-01 terminal states
    terminal_states: ['consumed', 'expired'],
  };

  // ═══════════════════════════════════════════════════════════
  // SSO FIXTURES (005-sso, ADR-010)
  // ═══════════════════════════════════════════════════════════

  var SSO_FIXTURES = {
    // BR-005-01: only candidate and client portals support SSO
    eligible_portals: ['candidate', 'client'],
    // FR-005-01: Google OAuth 2.0 only for Phase 1
    providers: ['google'],
    // Simulated network delays (ms)
    processing_delay_ms: 1800,
    success_hold_ms: 1200,
    // INV-005-02: provider subject must be unique per account
    enforce_unique_binding: true,
  };

  // ═══════════════════════════════════════════════════════════
  // ROUTE RESOLUTION HELPER (002-portal-routing)
  // FR-002-02: Resolve post-auth destination
  // BR-002-01: Role-to-portal match enforcement
  // BR-002-02: Last-route safety
  // Data model: RouteDecision
  // ═══════════════════════════════════════════════════════════

  /**
   * Resolve the destination route for a given portal and role.
   *
   * @param {string}  portalKey  - Requested portal identifier
   * @param {string}  role       - Authenticated platform role
   * @param {string}  [lastRoute] - Previously stored destination
   * @returns {{ decision: string, resolved_route: string|null, portal_label: string|null }}
   */
  function resolveRoute(portalKey, role, lastRoute) {
    var config = PORTAL_ROUTES[portalKey];

    // FR-002-01: disabled or unknown portals are rejected
    if (!config || !config.enabled) {
      return { decision: 'deny', resolved_route: null, portal_label: null };
    }

    // BR-002-01: role must be in allowed_roles
    if (!role || config.allowed_roles.indexOf(role) === -1) {
      return {
        decision: 'deny',
        resolved_route: null,
        portal_label: config.portal_label,
      };
    }

    // BR-002-02: verify lastRoute is still within the permitted portal scope
    var resolvedRoute = lastRoute && lastRoute.indexOf('/' + portalKey) === 0 ? lastRoute : config.default_route;

    return {
      decision: 'allow',
      resolved_route: resolvedRoute,
      portal_label: config.portal_label,
    };
  }

  // ═══════════════════════════════════════════════════════════
  // AUDIT ENVELOPE FACTORY (contracts/events.yaml)
  // All events use this canonical wrapper structure.
  // ═══════════════════════════════════════════════════════════

  /**
   * Build a canonical audit envelope.
   *
   * @param {string}  eventId    - e.g. 'EVT-001-01'
   * @param {string}  eventName  - dot-notation name e.g. 'auth.session.login'
   * @param {string}  actorRole  - platform role id
   * @param {string}  entityType - entity class name e.g. 'user'
   * @param {string}  [entityId] - UUID of affected entity
   * @param {object}  [payload]  - event-specific details
   * @returns {object} Canonical audit envelope
   */
  function createAuditEnvelope(eventId, eventName, actorRole, entityType, entityId, payload) {
    return {
      event_id: eventId,
      event_name: eventName,
      timestamp: new Date().toISOString(),
      actor: {
        user_id: entityId || 'anonymous',
        role: actorRole || 'system',
      },
      entity: {
        type: entityType || 'unknown',
        id: entityId || null,
      },
      payload: {
        details: payload || {},
      },
    };
  }

  // ═══════════════════════════════════════════════════════════
  // SESSION TOKEN GENERATOR
  // ═══════════════════════════════════════════════════════════

  /**
   * Generate a lightweight random token string for demo sessions.
   * Production uses server-issued RS256 JWTs (ADR-010).
   *
   * @param {string} [prefix='tok'] - Token type prefix
   * @returns {string}
   */
  function generateToken(prefix) {
    prefix = prefix || 'tok';
    return prefix + '-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  // ═══════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════

  window.MockData = {
    // Fixture data sets (read-only in usage)
    USERS: USERS,
    PORTAL_ROUTES: PORTAL_ROUTES,
    SESSION_POLICIES: SESSION_POLICIES,
    MFA_FIXTURES: MFA_FIXTURES,
    RESET_FIXTURES: RESET_FIXTURES,
    SSO_FIXTURES: SSO_FIXTURES,

    // Helpers
    resolveRoute: resolveRoute,
    createAuditEnvelope: createAuditEnvelope,
    generateToken: generateToken,

    /**
     * Look up a demo user by email address (case-insensitive).
     * Returns null if no matching user exists.
     * @param {string} email
     * @returns {object|null}
     */
    findUser: function (email) {
      var normalized = String(email || '')
        .toLowerCase()
        .trim();
      for (var i = 0; i < USERS.length; i++) {
        if (USERS[i].email.toLowerCase() === normalized) return USERS[i];
      }
      return null;
    },

    /**
     * Get PortalConfig for a given portal key.
     * @param {string} portalKey
     * @returns {object|null}
     */
    getPortalRoute: function (portalKey) {
      return PORTAL_ROUTES[portalKey] || null;
    },

    /**
     * Get SessionPolicy for a given portal key.
     * Falls back to candidate policy for unknown portals.
     * @param {string} portalKey
     * @returns {object}
     */
    getSessionPolicy: function (portalKey) {
      return SESSION_POLICIES[portalKey] || SESSION_POLICIES.candidate;
    },
  };
})();
