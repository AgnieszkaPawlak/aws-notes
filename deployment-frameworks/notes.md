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
