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
