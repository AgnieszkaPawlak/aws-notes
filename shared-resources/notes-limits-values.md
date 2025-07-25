# Lambda

| Attribute| Limity/Default| 
| ---- | ---- |
|  Min. memory allocation    |128 MB      |
|  Max. uncompressed code size|250 MB      |
| Max. zip/JAR deployment size | 50 MB|
| Timeout default| 3 seconds|
| Max. timeout| 15 minutes|
| Default concurency limit| 1000|
| Invocation payload limit| 6 MB (synchronus) / 265 KB (async)|

# Amazon S3

| Attribute| Limity/Default|
| ---- | ---- |
| Max. object size| 5TB|
| Standard-Infrequent Access (IA) transition| After 30 days (with lifecycle rules)|
|Versioning| Disabled by default|
|MFA Delete| Optional|

# Amazon SQS

| Attribute| Limity/Default|
| ---- | ---- |
| Max. message size| 256 KB|
| Default visibility timeout| 30 seconds|
| Max. retention| 14 days|
| Default retention| 4 days|

# Amazon DynamoDB

| Attribute| Limity/Default|
| ---- | ---- |
|Strongly consistent read| Disable by default|
|Max. item size| 400 KB|
|Default read consistency| Eventually consistent|
|Global Secondary Indexes| 20 per table|
|Local Secondary Indexes| 5 per table|

# Amazon EC2/EBS

| Attribute| Limity/Default|
| ---- | ---- |
| Instance storage| Ephemeral- deleted on stop|
| Max. IOPS (SSD io1/io2)| >20,000 IOPS|
|Default security group| All outbound allowed|
|Network ACL defaults| Deny all inbound, alllow all outbound|

# CloudWatch Metrics

| Attribute| Limity/Default|
| ---- | ---- |
| Metric retention| 15 months|
| Data resolution| Standard: 60s, High: 1s|
| Alarm states| OK, ALARM, INSUFFICIENT_DATA|
| Retention | 1 s -> 3h, 1min -> 15d(default), 5min -> 63d, 1h -> 445 days(15 month)

# Secrets Manager & Parameter Store

| Attribute| Limity/Default|
| ---- | ---- |
| Secret rotation| Optional, custom schedule|
| Parameter types| String, SecureString|
| Max. parameter size| 4096 characters|







