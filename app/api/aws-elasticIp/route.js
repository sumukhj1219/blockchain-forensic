import { AllocateAddressCommand, EC2Client } from "@aws-sdk/client-ec2";
import { NextResponse } from "next/server";

/**
 * Allocates an Elastic IP address to your AWS account.
 */
export async function POST() {
  const client = new EC2Client({
    region: process.env.AWS_REGION, 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const command = new AllocateAddressCommand({});

  try {
    const { AllocationId, PublicIp } = await client.send(command);
    console.log("A new IP address has been allocated to your account:");
    console.log(`ID: ${AllocationId} Public IP: ${PublicIp}`);
    console.log(
      "You can view your IP addresses in the AWS Management Console for Amazon EC2. Look under Network & Security > Elastic IPs"
    );

    return NextResponse.json({ message: { AllocationId, PublicIp } }, { status: 200 });
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MissingParameter") {
      console.warn(`${caught.message}. Did you provide these values?`);
      return NextResponse.json({ error: `${caught.message}. Did you provide these values?` }, { status: 400 });
    } else {
      console.error(caught);
      return NextResponse.json({ error: "Failed to allocate an Elastic IP" }, { status: 500 });
    }
  }
}
