## Cloud Development Kit (CDK)

- Write infrastructure using JavaScript, Python, Typescript ect.
- CDK transpiles to CloudFormation so you can use if, loops, variables.

### Core Concepts

- App -> It's a root of CDK project
- Stack -> Group of resources (1 CloudFormation stack)
- Construct -> Resource unit (EC2, S3, Lambda, ect)

Constructs:

- Level 1 - Low-level, named cfn*
- Level 2 - Curated, high abstraction, with helper methoda
- Level 3 - Patterns (e.g. full ECS task wuth scheduling)

## Serverless Application Model (SAM)

- Extension of CloudFormation with simplified syntax
- Define Lambda, API Gateway, ect. using `AWS:Serverless::Function`
- Simplified deployment: `sam build, sam deploy`

You can see an example [here](examples/sam-template.yaml).
