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
- **Lambda Authorizer** - full control (JWT parsing, 3rd party IdPs)
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


