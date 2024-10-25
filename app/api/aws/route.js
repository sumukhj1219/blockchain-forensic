import { DescribeSecurityGroupsCommand, EC2Client } from "@aws-sdk/client-ec2";
import { NextResponse } from "next/server";

// Call DescribeSecurityGroups and display the result.
export  async function GET() {
  const client = new EC2Client({
    region: "ap-south-1", // Add your AWS region
    credentials: {
      accessKeyId: 'AKIAW3MEBTQOFWOGJAJW', // Make sure these env vars are set
      secretAccessKey: 'sKCOp0rqta32zt3X8MAsgUjFIvmYPYBqXiFqBDEn',
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
