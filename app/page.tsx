import Image from "next/image";
import React from 'react';

const TemuReferralSharing: React.FC<{ session: any }> = ({ session }) => {
  // Your component logic here
  return (
    <div>
      <h1>Temu Referral Sharing</h1>
      {/* Add your component UI here */}
    </div>
  );
};

import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
export default async function Home() {
  const session = await getServerSession(authOptions as any);

  return (
    <main className="container mx-auto p-4">
      <TemuReferralSharing session={session} />
    </main>
  );
}