** Serverless applications extend Lambda to full-stack experience.

Uses pay-as-you-go serivces (Lambda, S3, API Gateway, Cognito ect.)

There are a few benefits of it:

- No server management
- Automatic scaling
- Hight avalibility

Application Layers in serverless

| Layer           | AWS Service                         |
| --------------- | ----------------------------------- |
| Presentation    | S3 (Static Web Hosting), CloudFront |
| Application/API | Lambda, API Gateway, AppSync        |
| Data            | DynamoDB, RDS, S3                   |
| Auth            | Cognito                             |

Use S3 bucket (e.g `examplebucket`) for hoisting `index.html`, `error.html`.
Here is an example of setup:

```bash
aws s3 website s3://examplebucket/
--index-document index.html
--error-document error.html
```

**Avoid periods (.) in bucket names** if using SSL.

### Logging

- Confugure separate bucket (e.g.`logs-examplebucket.com`) with prefix (`examplebucket-logs/`).
- Avoid recursive logging into same bucket

## CloundFront (CDN for Static Hoisting)

- Use **lazy loading** (cashes only after firsty request)
- Improves latency and caching efficieny
- TTL can be set with metadata:

```bash
aws s3 cp s3://mybucket/style.css s3://mybucket/style.css \
  --metadata-directive REPLACE --cache-control "max-age=3600"
```

- Invalid cache manually:

```bash
aws cloudfront create-invalidation \
  --distribution-id <ID> --paths "/index.html"
```

## Custom Domains via ROute 53

- You can buy a domain or import one
- Use Route 53 to map to S3/CloudFront
- Use Traffic Flow for routing by:
- Failover
- Geo-location
- Latency

## API Gateway

- Supports REST, HTTP and WebSocket APIs

### Endpoint Types

- **Regional** - for same-region access
- **Edge-Optimized** - uses CloudFront edge
- **Private** - VPC-only

### Authorization Options

- **IAM** - uses SigV4 headers
- **Lambda Authorizer** - full control (JWT parsing, 3rd party IdPs) You can see an example [here](diagrams/jwt-validation-via-api-gateway-auth.svg).
- **Cognito Authorizer**  - native JWT-based
- **Resources Policies** - restrict by IP, VPC, account

### API Keys

- Not for auth - use for **quotas and throttling** via UsagePlans

### Integration Types

- Lambda Function
- HTTP/EC2/Benstalk Backend
- AWS Service (e.g. S3 PUT)
- Mock Integration
- VPC Link (via NLB)

## Deployment: Stages & Canary Releases

- Stage = dev/test/prod version of the API
- Use **stage variables** to dynamically reference:
  ```
  arn:aws:lambda:us-east-1:123456789012:function:my-func:${stageVariables.version}
  ```
- Canary: Gradual rollout of new config/function (5-10% traffic)

## WebSocket APIs (via API Gateway)

- Persistent two-way communication (e.g chat apps)
- Uses single URL with multiple routes (like "postMessage")
- Client sends JSON with "action" field to specify route
- API gateway supports:
  
  - `$connect`: on client connection
  - `$disconnect`: on disconnect
  - `$default`: fallback or unmatched routes
- Routes map to AWS backends: Lambda, HTTP endpoints, or mocks.

## Monitoring with CloudWatch

- Key metrics:
  - `4XXError, 5XXError, Latnecy, IntegrationLatency`
  - `Count, CacheHitCount, CacheMissCount`
- Metrics help track performance, errors and cache usage
- Can filter by API name, stage, method, etx.

## OpenAPI Integration

- Use OpenAPI 3.0 (Swagger) to describe REST APIs.
- APIs defined in YAML or JSON with auto-generated docs and UI testing
- API Gateway can import OpenAPI specs to auto configure endpoints
- Supports AWS extensions for caching, CORS, integrations, etc.

## GraphQL APIs (via AWS AppSync)

- Flexible querying and mutation of data
- Resolvers process and fetch data. Can be split by field or type
- AppSync supports:
  - Resolvers in AppSync.js or VTL
  - Data source: DynamoDB, Lambda, Aurora, REST
  - Caching: full-request or per-resolver
  - Access control: Lambda, IAM, Cognito, OIDC
  - Real-time via subscriptions
  - Merged APIs for modularity

## Serverless vs. Traditional 3-Tier Architecture

### Traditional (EC2-based):

- Uses EC2, ALB, RDS, S3, Route 53, CloudFront
- You manage servers and scaling

You can see standard three-tier web infrastructure architecture [here](diagrams/tree-tier-web-infrastructure-architecture.svg)
System Overview:

1. The user's DNS requests are served by Amazon Route 53, a highly available Domain Name System (DNS) service. Network traffic is routed to infrastructure running in Aamazon Web Services.
2. Static, streaming and dynamic content is delivered by Amazon CloudFront, a global network of edge locations. Requests are automatically routed to the nearest edge location, so content is delivered with the best possible performance.
3. Resources and static content used by the web application are stored on Amazon Simple Storage Service (S3), a hightly durable storage infrastructure designed for mission-critical and primary data storage.
4. HTTP requests are first handled by Elastic Load Balancing, which automatically distributes incoming application traffic among multiple Amazon Eleastic Compute Cloud (EC2) instances across Avalibility ZOnes (AZs). It enables even greater fault tolerance in your applications, seamlessly providing the amount of load balancing capacity needed in response to incoming application traffic.
5. Web servers and application servers are deployed on Amazon EC2 instances. Most organizations will select an Amazon Machine Image (AMI) and then become the starting point for future web development.
6. Web servers and application servers are deployed in Auto Scaling group. Auto Scaling automatically adjusts your capacity up or down according to conditions you define. With Auto Scaling, you can ensure that the number of Amazon EC2 instances you-re using increases seamlessly during demand spikes to maintain performance and decreases autamoatically during demand to minimize costs.
7. To provide high availability, the relational database that contains application's data is hosted redundantly on a multi-AZ (multiple Avalibility Zones A and B here) deployment of Amazon Relational Database Service (Amazon RDS)

### Serverless:

- Services:
  - S3 for static hoisting
  - API Gateway + Lambda or AppSync
  - DynamoDB (or Aurora Serverless) for data
  - Cognito for auth
  - CloudFront + Route 53 for distribution
- Benefits: no server maintenance, scalable, cost-effective

You can see serverless web application architecture [here](diagrams/serverless-web-application-architecture.svg).


## Amazon Aurora Serverless

- On-demand autoscaling RDS (PostgresSQL/MySQL-compatible)
- Best for:
  - Infrequent/variable workloads
  - Dev/test environments
- Benefits: no server provisioning, multi A-Z replication

## Amazon ElasticCache

- In-memory cache for performance
- Engines: Redis (feature-rich) and Memcached (simple, scalable)

### Redis supports:

- Replication, failover, resistance, pub/sub

### Memcached:

- Simpler, no replication, great for large-scale caching

### Key Concepts:

- Node: Basics unit (RAM + engine)
- Cluster: Collection of nodes
- Replication Group: Redis only. Includes primaries and read replicas
- Endpoints: Used to connect to clusters/nodes

### Caching Strategies:

- Lazy Loading: Data cached only on demand
- Write-Through Cache updated witch each DB write

### Scaling:

- Horizontal: Add more nodes (both Redis/Memcached)
- Vertical: Replace cluster with larger instance types
- Use ElasticCache Serverless for automatic scaling

### Backups:

- Snapshots available for Redis (not Memcached)
- Can restore from snapshots stored in S3

### Security

- Network control via VPC, Security Groups, NACLs
- IAM policies for configuration access

