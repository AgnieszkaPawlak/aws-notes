const { Stack } = require ('aws-cdk-lib')
const ec2 = require('aws-cdk-lib/aws-ec2');

class CdkJavascriptDemoStack extends Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        //Us an existing VPC by specifying the VPC ID
        const vpc = ec2.Vpc.fromLookup(this, 'MyVpc', {
            vpcId: 'vpc-0123456789abcdef0'
        });

        //Helper function select your public subnets -- very convenient
        const publicSubnets = vpc.selectSubnets({
            sybnetType: ec2.SubnetType.PUBLIC
        });

        //Create a security group that allows inbound traffic on port 80 from anywhere
        const sg = new ec2.SecurityGropu(this, 'MySecurityGroup', {
            vpc,
            description: 'Allow inbound traffic on port 80 from anywhere',
            allowAllOutbound: true // Allow all outbound traffic
        });
        sg.IngressRule(ec2.Peer.anyIP4(), ec2.Port.tcp(80),'Allow inbound HTTP');

        //Allow the instance sizes we want to create
        const instanceSizes = ['t3.micro','t3.small'];

        //Keep an array to hold the instance objects we're about to create
        const instances = [];

        //Loop over these instances with standard JavaScript

        instanceSizes.forEach((instanceSize, index) => {
            //create an instance for each with a dynamic instance Name Tag
            const instance  = new ec2.Instance(this, `MyInstance${index}`, {
                vpc,
                // instance type needs an object, so the next line instanties one with the size string
                instanceType: new ec2.instanceType(instanceSize),

                //helper function provides the latest Amazon Linux AMI ID
                machineImage : ec2.MachineImage.latestAmazonLinux2(),

                //attach our security group by referencing the object created above
                securityGroup: sg,

                // associate with subnet. You may specify one, as this code does,
                // but if pass in array, CDK will pick one.

                vpcSubnets: {
                    subnets: [publicSubnets.subnets[0]]
                },
                associatePublicIpAddress: true, //Explicitly associate a public IP
            });
            instances.push(instance)

            //Attach user data to each instance. This shows how you can manipulate
            // resource constructs after creating them. This works because CDK is transpiled
            // to CloudFormation, so all your code is read and understable before creating the stack.
            instances.forEach((instance) => {
                instance.addUserData('#!/bin/bash', 'yum install -y nginx', 'service nginx start')
            });
        });
    }
}

module.exports = { CdkJavascriptDemoStack }


//usage

#!/user/bin/env node
const cdk = require('aws-cdk-lib')
const { CdkJavascriptDemoStack } = require ('../lib/cdk-javascript-demo-stack');
const app = new cdk.App();
new CdkJavascriptDemoStack(app, ' CdkJavascriptDemoStack', env {
    account: '<your_account_id>', region: '<your_region>'
})