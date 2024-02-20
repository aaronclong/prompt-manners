# Prompt Manners

## Prompt Security Framework

| Category                      | Defense                  | Source |
| ----------------------------- | ------------------------ | ------ |
| **Prevention-based defenses** |                          |        |
|                               | Paraphrasing             |        |
|                               | Retokenization           |        |
|                               | Data prompt isolation    |        |
|                               | Instructional prevention |        |
|                               | Sandwich prevention      |        |
| **Prevention-based defenses** |                          |        |
|                               | PPL detection            |        |
|                               | Windowed PPL detection   |        |
|                               | LLM-based detection      |        |
|                               | Response-based detection |        |
|                               | Proactive detection      |        |

### Paraphrasing

Paraphrase the data prompt to break the order of the special character/task-ignoring text/fake response, injected instruction, and injected data.

### Retokenization

Retokenize the data prompt to disrupt the the special character/task-ignoring text/fake response, and injected instruction/data.

### Data prompt isolation

Isolate the data prompt and the instruction prompt to force the LLM to treat the data prompt as data

### Instructional prevention

Design the instruction prompt to make the LLM ignore any instructions in the data prompt.

### Sandwich prevention

Append another instruction prompt at the end of the data prompt.
