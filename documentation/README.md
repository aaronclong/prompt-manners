# Prompt Manners

## Prompt Security Framework

| Category                      | Defense                  | Source                                                                                                                          |
| ----------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **Prevention-based defenses** |                          |                                                                                                                                 |
|                               | Paraphrasing             | [Arxiv paper 2309.00614](https://arxiv.org/abs/2309.00614)                                                                      |
|                               | Retokenization           | [Arxiv paper 2309.00614](https://arxiv.org/abs/2309.00614)                                                                      |
|                               | Data prompt isolation    | [Online post](https://learnprompting.org/)                                                                                      |
|                               | Instructional prevention | [Online post](https://learnprompting.org/)                                                                                      |
|                               | Sandwich prevention      | [Online post](https://learnprompting.org/)                                                                                      |
| **Prevention-based defenses** |                          |                                                                                                                                 |
|                               | PPL detection            | Arxiv papers [2308.14132](https://arxiv.org/abs/2308.14132)[2309.00614](https://arxiv.org/abs/2309.00614)                       |
|                               | Windowed PPL detection   | [Arxiv paper 2309.00614](https://arxiv.org/abs/2309.00614)                                                                      |
|                               | LLM-based detection      | [Online Post](https://www.alignmentforum.org/posts/pNcFYZnPdXyL2RfgA)                                                           |
|                               | Response-based detection | Online Post [[1](https://learnprompting.org/)[2](https://research.nccgroup.com/2022/12/05/exploring-prompt-injection-attacks/)] |
|                               | Proactive detection      | [Online Post](https://research.nccgroup.com/2022/12/05/exploring-prompt-injection-attacks/)]                                    |

-- from [**"Prompt Injection Attacks and Defenses in LLM-Integrated Applications"**](https://arxiv.org/abs/2310.12815)

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
