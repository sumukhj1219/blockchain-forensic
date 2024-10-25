import { EC2Client, RunInstancesCommand, CreateTagsCommand } from "@aws-sdk/client-ec2";
import { NextResponse } from 'next/server';

export async function POST(req) {
  // Initialize EC2 client with credentials from environment variables
  const ec2Client = new EC2Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  // Define EC2 instance parameters
  const instanceParams = {
    ImageId: process.env.AWS_AMI_ID, // Replace with your AMI ID
    InstanceType: 't2.micro',
    KeyName: 'test', // Replace with your Key Pair Name
    MinCount: 1,
    MaxCount: 1,
  };

  try {
    // Create the EC2 instance
    const runInstancesCommand = new RunInstancesCommand(instanceParams);
    const data = await ec2Client.send(runInstancesCommand);
    const instanceId = data.Instances[0].InstanceId;
    console.log('Created instance', instanceId);

    // Define tagging parameters
    const tagParams = {
      Resources: [instanceId],
      Tags: [{ Key: 'Name', Value: 'SDK Sample' }],
    };

    // Tag the instance
    const createTagsCommand = new CreateTagsCommand(tagParams);
    await ec2Client.send(createTagsCommand);
    console.log('Instance tagged');

    // Respond with success using NextResponse
    return NextResponse.json({ message: 'Instance created and tagged', instanceId });
  } catch (err) {
    console.error('Error creating instance', err);
    return NextResponse.json({ error: 'Failed to create instance', details: err }, { status: 500 });
  }
}
