# ADR 003: Partner Zip Code Allocation

## Status
Accepted

## Context
Service partners (Plumbers, Roofers, etc.) are suggested to clients by agents. We must ensure that the partners recommended are actually capable of servicing the client's geographic real estate location.

## Decision
In the Admin Portal "Partners" screen, TCs will map each partner to an array of valid Zip Codes. An agent attempting to refer a partner a property outside that zip code coverage will receive a warning. This validation is maintained exclusively by the Admin Portal to avoid agent bias.

## Consequences
- **Positive**: Accurate referrals ensure high partner retention and client satisfaction.
- **Negative**: Data entry overhead for TCs when onboarding new partners.
