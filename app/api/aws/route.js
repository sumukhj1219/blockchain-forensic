import { DescribeSecurityGroupsCommand, EC2Client } from "@aws-sdk/client-ec2";
import { NextResponse } from "next/server";

// Call DescribeSecurityGroups and display the result.
export  async function GET() {
  const client = new EC2Client({
    region: process.env.AWS_REGION, // Add your AWS region
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Make sure these env vars are set
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  try {
    const { SecurityGroups } = await client.send(
      new DescribeSecurityGroupsCommand({})
    );

    const securityGroupList = SecurityGroups
      .map((sg) => ` • ${sg.GroupId}: ${sg.GroupName}`)
      .join("\n");

    console.log(
      "Hello, Amazon EC2! Let's list up to 10 of your security groups:"
    );
    
    return NextResponse.json({ message: securityGroupList }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch security groups" }, { status: 500 });
  }
}
