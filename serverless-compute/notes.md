`Serverless compute` (FaaS) means you run function without managing server - AWS handles provisioning, scaling and maintance.

`AWS Lambda` runs code in many languages (Java, Go, Phyton ect.) and triggers by SDK, API or other AWS services.

Pricing is pay-as-you-go - you-re billed only for compute time and invocations.

`Cold vs Warm Starts` - A new container launch is a `cold start`. If reused shortly, it's a warm start.

Scaling: Lambda auto-scales by running many containers in parellal, often pre-provisioned to match demand.

VPC: by default, Lambda runs outside your VPC but can be configured to run inside.

Use Case: Good for microservices, event-driven actions and asynchronous systems.

Architecture: Microservices (vs Monolithic) allows small, independent services with well defined APIs - easier to scale and update with less risk of system-wide failures.

AWS services like Lambda, SNS and SQS help build flexibel microservice architectures.
