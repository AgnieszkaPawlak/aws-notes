## Choice State

The **Choice State** enables conditional branching. It checks input value and router exacution based on **Choice Rules**. Only the **first matching condition** is taken.

**Key points:**

- `Choices` -> Required. Array of conditions.
- `Default` -> Fallback if no `Choices` match.
- `Next` -> Defined inside each rule only.
- `End` -> Not used in `Choice`.
- Must have `$.type in input or exacution fails.

You can find an example below and its description.

See the JSON file here :  [Choice state example](examples/choice-state-example.json)

How it works:

1. Starts at`CheckInput`
2. Checks:

- `$.foo` equals 1 -> run `NumberIsOne`
- `$.bar` equals `MyString` -> run `StringIsMyString`
- if `$.type` is NOT "Private" -> run `TypeIsPublic`
- if `$.value` is between 20 - 29 -> run  `ValueInTwenties`
- otherwise -> `NoMatchFail`

List of support operators: [ `And`, `Or`, `BooleanEquals`, `Not`, `NumericEqual`, `NumericGreaterThan`, `NumericGreaterThanEquals`, `NumericLessThan`, `NumericLessThanEquals`, `StringEquals`, `StringGreaterThan`, `StringGreaterThanEquals`, `StringLessThan`, `StringLessThanEquals`, `TimestampEquals`, `TimestampEquals`, `TimestampGreatherThan`, `TimestampGreatherThanEquals`, `TimestampLessThan`, `TimestampLessThanEquals` ]

## Parallel State

The Parallel state allows you to run multiple branches of work at the smame time, which is useful when tasks don't depends on each other and can run faster in parellal.

**Key points**

- `Type: "parellal"` executes branches concurently.
- Each branch is its own mini state machine (`States + StartAt`).
- A Parellal state waits for all branches to finish before moving on.
- Output is an array - one result for each branch.
- There are additional fields that may be use -> `ResultPath, Retry, Catch`.
- Branches cannot jump outside their branch (no `Next`to outside state).

You can find an example [here](examples/parallel-state-example.json) and its diagram [here](diagrams/parallel-state.svg).

## Error Handling

- If one branch fails, then whole Parellal state fails.
- Other branchech stop, but the Lambda function keep running - it can't be cancelled.
- For long-running activities use heartbeats to detect failure and stop workers safetely.
- Use a Wait state to cleanup work if needed.

## End State

- Each state must defines either `End (true)` or `Next` state.
- A state machine finishes when it reaches an `End` state - this terminates the entire execution.

## Input and Output

- Each execution starts with input JSON, passed to the first state.
- Each state receives JSON, processed it and output JSON to the next state.
- The final state's output is the state machine's result.
- `InputPath, OutputPath and ResultPath` use path to manipulate JSON.
- `ResultPath` use reference path - it can identify a single node in JSON.

You can find an example of input and output processing [here](diagrams/input-output-processing.svg).

**Paths**

- Starts with `$` and use JsonPath syntax to select parts of JSON data.
- Can select multiple nodes.

**Reference Paths**

- A strict version of path - always select only one node in the JSON.
- Use dot `.` and square brackets `[]`.
- Not support for operators like ` @, .., :, ?, *` or functions like `length()`.

**Fields Using Paths**

1. Input Path
2. ResultPath
3. OutputPath
