# Candidate Documents - State Machines

> **Module ID**: `203-candidate-documents`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Candidate Document Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| pending | Document assigned or requested and awaiting candidate action. | No |
| viewed | Candidate opened the document. | No |
| signed | Candidate completed a signature step. | No |
| uploaded | Candidate uploaded a file and awaits review. | No |
| accepted | Document is complete and accepted. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| pending | viewed | view() | Document is accessible to candidate | Emit candidate.document.viewed |
| viewed | signed | sign() | Document requires signature | Emit candidate.document.signed |
| pending | uploaded | upload() | Upload request allowed | Emit candidate.document.uploaded |
| signed | accepted | accept() | Admin review confirms completion | Unlock downstream requirements |
| uploaded | accepted | accept() | Admin review confirms completion | Unlock downstream requirements |

### State Diagram

```
[pending] -- view() --> [viewed]
[viewed] -- sign() --> [signed]
[pending] -- upload() --> [uploaded]
[signed] -- accept() --> [accepted]
[uploaded] -- accept() --> [accepted]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-203-01 | Accepted documents are complete for the current workflow. |
| INV-203-02 | Signed documents remain signed permanently. |
