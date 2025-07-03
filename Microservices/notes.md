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
