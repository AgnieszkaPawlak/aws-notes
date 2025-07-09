## Serverless Compute and AWS Lambda

`Serverless compute` (FaaS) means you run function without managing server - AWS handles provisioning, scaling and maintance.

`AWS Lambda` runs code in many languages (Java, Go, Phyton ect.) and triggers by SDK, API or other AWS services.

Pricing is pay-as-you-go - you-re billed only for compute time and invocations.

`Cold vs Warm Starts` - A new container launch is a `cold start`. If reused shortly, it's a warm start.

Scaling: Lambda auto-scales by running many containers in parellal, often pre-provisioned to match demand.

VPC: by default, Lambda runs outside your VPC but can be configured to run inside.

Use Case: Good for microservices, event-driven actions and asynchronous systems.

Architecture: Microservices (vs Monolithic) allows small, independent services with well defined APIs - easier to scale and update with less risk of system-wide failures.

AWS services like Lambda, SNS and SQS help build flexibel microservice architectures.

## Lambda Architecture

Function runs in containers.

- Cold Start: First container start.
- Warm Start: Reuse existing containers for speed.

You can run inside or outside a VPC. To run inside a VPC there is neded additional configuration.

## Monolith vs. Microservices

Monolith: thightly copuled, hard to scale.

Microservices: small, independent services with clear APIs.

Lambda works well for microservices + event-driven architectues (applications are designed around events, which are significants coourrences or changes in state).

## Supported Languages

Node.js, Phyton, Java, C#, PowerShell, Go, Ruby.

## Ways to create a Lambda

1. Console: for quick demo
2. CLI: for repeatable deployments
3. SDKs: integrate in your code
4. CloudFormation (`AWS:Lambda:Function`)
5. AWS SAM: simplifies serverless stacks

You can find an example of the lambda flow [here](diagrams/lambda-flow.svg).

## Invocation Models


| Model               | Description              | Example            |
| ------------------- | ------------------------ | ------------------ |
| Synchronous         | Wait for response        | API Gateway        |
| Asynchronous (Push) | Fire and forget, retries | S3 event          |
| Asynchronous (Pull) | Lambda polls source      | Kinesies, DynamoDB |

You can see:

- **The Amazon S3 push model example [here](diagrams/push-model.svg).**

How it works:

1. User creates an object in a buket.
2. S3 detects the `object created` event.
3. S3 invokes the Lambda function according to the event source mapping in the bucket configuration.
4. AWS verifies if Lambda has Execution Role and Access Policy.
5. AWS executes the Lambda, passing in the event as parameter.

- **The sequence for a pull mpdel [here](diagrams/pull-model.svg).**

How it works:

1. An application writes records to an Amazon Kinesis stream.
2. Lambda continuusly pools the stream or streams specified in your event source mapping confuguration. Lambda invocates your funcyion when new records on the stream has been detected.
3. After veryfying Kinesies has permisssion, Lambda executes the function.

## Performance

You can reuse setup logic putside the handler for warm containers. For example DB connetions pooling.


## Layers and Containers

You can reuse shared code/libs across functions.

Use Docker images for large or custom runtimes (up to 10 GB)


## Concurrency and Throttling

There are account-level concurrency limits.

Use per-function limits to protect other services.

Use Dead-Letter Queues (DQL) or Lambda Destinations for failed events.


## Config: Memory, Timeoutm Networking

Memory: 128 MB -10 GB. CPU scales with memory.

Timeout: 0 - 15 min (900 seconds). The default value is 3 seconds.

VPC access: use EINs, NAT if outbounding internet needed.


## Versioning and Aliases

Numbered versions are immutable apart from `$LATEST` version.

Aliases: labels for versions.

Weighted Aliases: canary or A/B deployments.


## Automate Deployments

Use CodeDeployment:

- Canary: e.g. 10% for 5 min.
- Linear: e.g. 10% every 10 min.
- AllAtOnce

Use CodePipeline for CI/CD:

- Source: Git
- Build; CodeBuild
- Deploy: CodeDeploy


## Monitoring and Debug

CloudWatch: for logs, metrics. Metrics include invocations, errors, DLQ errors.

X-Ray: visualize traces, identify bottlenecks.
